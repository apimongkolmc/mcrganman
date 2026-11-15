<?php
/**
 * MCrganMan - Database Configuration & PDO Connector
 * Target Environment: InfinityFree MySQL Hosting
 * 
 * Host: sql301.infinityfree.com
 * Port: 3306
 * Database: if0_43065551_users
 * Username: if0_43065551
 */

define('DB_HOST', 'sql301.infinityfree.com');
define('DB_PORT', 3306);
define('DB_NAME', 'if0_43065551_users');
define('DB_USER', 'if0_43065551');
define('DB_PASS', 'MCrganMan');

function getDbConnection(): ?PDO {
    static $pdo = null;
    if ($pdo !== null) {
        return $pdo;
    }

    $dsn = "mysql:host=" . DB_HOST . ";port=" . DB_PORT . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci"
    ];

    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        return $pdo;
    } catch (PDOException $e) {
        // Return null or log securely; do not leak database credentials to public output
        error_log("Database Connection Failed: " . $e->getMessage());
        return null;
    }
}
