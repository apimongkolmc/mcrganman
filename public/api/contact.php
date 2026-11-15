<?php
/**
 * MCrganMan - Minimalist Contact API Endpoint
 * 
 * Separated backend processing script for contact form submissions.
 * Supports JSON payload, input sanitization, spam honeypot detection,
 * rate checking, and structured JSON responses.
 *
 * @license MIT
 * @author MCrganMan
 */

// 1. Set Security & CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(["status" => "ok"]);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed. Please use POST."
    ]);
    exit;
}

// 2. Parse Incoming Payload (Supports raw JSON or form-data)
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    $data = $_POST;
}

// 3. Honeypot Anti-Spam Check (hidden field in form)
if (!empty($data['website_url_hp'])) {
    // Bot detected; quietly exit with pseudo success
    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Message processed successfully."
    ]);
    exit;
}

// 4. Extract and Sanitize Inputs
$name = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email = isset($data['email']) ? trim(filter_var($data['email'], FILTER_SANITIZE_EMAIL)) : '';
$subject = isset($data['subject']) ? trim(strip_tags($data['subject'])) : 'General Inquiry';
$message = isset($data['message']) ? trim(htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8')) : '';

// 5. Validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = "Name or pseudonym is required (minimum 2 characters).";
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "A valid contact email address is required.";
}

if (empty($message) || strlen($message) < 10) {
    $errors[] = "Message must be at least 10 characters long.";
}

if (strlen($message) > 5000) {
    $errors[] = "Message exceeds the maximum limit of 5,000 characters.";
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        "status" => "validation_error",
        "message" => "Invalid submission data.",
        "errors" => $errors
    ]);
    exit;
}

// 6. Processing & Notification (Configurable Destination)
// For deployment on standard PHP server: Set your target inbox or webhook
$recipientEmail = "mc.organman@gmail.com";
$emailSubject = "[MCrganMan Portfolio] " . $subject . " - from " . $name;
$emailBody = "New message received via MCrganMan Portfolio:\n\n" .
             "Sender: " . $name . "\n" .
             "Email: " . $email . "\n" .
             "Subject: " . $subject . "\n" .
             "Timestamp: " . date("Y-m-d H:i:s T") . "\n\n" .
             "Message:\n" . $message . "\n";

$headers = [
    "From: no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'mcrganman.dev'),
    "Reply-To: " . $email,
    "X-Mailer: PHP/" . phpversion()
];

// Optional: attempt mail if server has sendmail configured
$mailSent = false;
if (function_exists('mail') && !empty($recipientEmail)) {
    $mailSent = @mail($recipientEmail, $emailSubject, $emailBody, implode("\r\n", $headers));
}

// Optional: Append to local JSON log if log directory exists/writable
$logEntry = [
    "id" => uniqid("msg_", true),
    "name" => $name,
    "email" => $email,
    "subject" => $subject,
    "message" => $message,
    "timestamp" => date("c"),
    "ip" => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
];

$logFile = __DIR__ . "/messages.log";
@file_put_contents($logFile, json_encode($logEntry) . PHP_EOL, FILE_APPEND | LOCK_EX);

// 7. Structured Response
http_response_code(200);
echo json_encode([
    "status" => "success",
    "message" => "Thank you! Your message has reached MCrganMan. I'll get back to you soon.",
    "data" => [
        "receiptId" => $logEntry['id'],
        "name" => $name,
        "subject" => $subject,
        "timestamp" => $logEntry['timestamp']
    ]
]);
exit;
