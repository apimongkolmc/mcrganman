<?php
/**
 * MCrganMan - Authentication & Login API Endpoint
 * File: /public/api/login.php
 * 
 * Separated backend handler for user authentication.
 * Connects to InfinityFree MySQL database: if0_43065551_users
 */

require_once __DIR__ . '/db.php';

// Set Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: DENY");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    echo json_encode(["status" => "ok"]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed. Use POST."]);
    exit;
}

// Read JSON input
$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!$data || !is_array($data)) {
    $data = $_POST;
}

$username = isset($data['username']) ? trim($data['username']) : '';
$password = isset($data['password']) ? trim($data['password']) : '';

if (empty($username) || empty($password)) {
    http_response_code(422);
    echo json_encode([
        "status" => "validation_error",
        "message" => "Both username/email and password are required."
    ]);
    exit;
}

$pdo = getDbConnection();

if (!$pdo) {
    // If running in development without direct InfinityFree external MySQL access:
    // Fallback simulation for creator credential check
    if (($username === 'MCrganMan' || strtolower($username) === 'mc.organman@gmail.com') && $password === 'MCrganMan') {
        $token = bin2hex(random_bytes(32));
        http_response_code(200);
        echo json_encode([
            "status" => "success",
            "message" => "Welcome back, MCrganMan.",
            "data" => [
                "username" => "MCrganMan",
                "email" => "mc.organman@gmail.com",
                "role" => "creator",
                "token" => $token,
                "loginAt" => date("c")
            ]
        ]);
        exit;
    }

    http_response_code(503);
    echo json_encode([
        "status" => "db_error",
        "message" => "Database connection unavailable. Please check InfinityFree MySQL service status."
    ]);
    exit;
}

try {
    // Find user by username or email
    $stmt = $pdo->prepare("SELECT id, username, email, password_hash, role, status FROM users WHERE username = :u OR email = :e LIMIT 1");
    $stmt->execute(['u' => $username, 'e' => $username]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(401);
        echo json_encode(["status" => "unauthorized", "message" => "Invalid username or password."]);
        exit;
    }

    // Verify Password (supports standard password_hash or bootstrap fallback)
    $passwordValid = password_verify($password, $user['password_hash']);
    
    // Developer bootstrap check for initial seed
    if (!$passwordValid && $user['username'] === 'MCrganMan' && $password === 'MCrganMan') {
        $passwordValid = true;
        // Automatically upgrade to secure hash
        $newHash = password_hash('MCrganMan', PASSWORD_BCRYPT);
        $upStmt = $pdo->prepare("UPDATE users SET password_hash = :hash WHERE id = :id");
        $upStmt->execute(['hash' => $newHash, 'id' => $user['id']]);
    }

    if (!$passwordValid) {
        http_response_code(401);
        echo json_encode(["status" => "unauthorized", "message" => "Invalid username or password."]);
        exit;
    }

    if ($user['status'] !== 'active') {
        http_response_code(403);
        echo json_encode(["status" => "forbidden", "message" => "Account is not active."]);
        exit;
    }

    // Generate Session Token
    $token = bin2hex(random_bytes(32));
    $expires = date("Y-m-d H:i:s", strtotime("+7 days"));

    // Update last login
    $updateStmt = $pdo->prepare("UPDATE users SET last_login = NOW() WHERE id = :id");
    $updateStmt->execute(['id' => $user['id']]);

    // Record session
    $sessStmt = $pdo->prepare("INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (:uid, :token, :exp)");
    $sessStmt->execute(['uid' => $user['id'], 'token' => $token, 'exp' => $expires]);

    http_response_code(200);
    echo json_encode([
        "status" => "success",
        "message" => "Login successful. Welcome back, " . htmlspecialchars($user['username']),
        "data" => [
            "id" => $user['id'],
            "username" => $user['username'],
            "email" => $user['email'],
            "role" => $user['role'],
            "token" => $token,
            "loginAt" => date("c")
        ]
    ]);
    exit;

} catch (PDOException $e) {
    error_log("Login error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "status" => "server_error",
        "message" => "An error occurred during authentication."
    ]);
    exit;
}
