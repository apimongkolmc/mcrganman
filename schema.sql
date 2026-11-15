-- ============================================================================
-- MCrganMan Platform — Web Portal & Authentication Database Schema
-- Architecture: Standard User Authentication (Login & Registration)
-- Target: MariaDB 10.3+ / MySQL 5.7+ / MySQL 8.0+ (phpMyAdmin / InfinityFree)
-- Description: Clean web portal schema for user accounts, credentials,
--              sessions, profiles, preferences, and security audits.
--              (Zero game server tables, Zero Xbox dependencies)
-- ============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- 1. USERS (Core Login, Registration & Credentials)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(120) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `display_name` VARCHAR(80) DEFAULT NULL,
    `role` VARCHAR(20) DEFAULT 'user',           -- 'admin', 'creator', 'moderator', 'user'
    `is_active` TINYINT(1) DEFAULT 1,
    `email_verified` TINYINT(1) DEFAULT 0,
    `avatar_url` VARCHAR(255) DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `last_login_at` TIMESTAMP NULL DEFAULT NULL,
    UNIQUE KEY `uq_username` (`username`),
    UNIQUE KEY `uq_email` (`email`),
    KEY `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. USER SESSIONS & AUTH TOKENS (Persistent Logins / JWT / Cookies)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_sessions` (
    `id` VARCHAR(128) PRIMARY KEY,
    `user_id` INT NOT NULL,
    `token_hash` VARCHAR(128) NOT NULL,
    `ip_address` VARCHAR(45) DEFAULT NULL,
    `user_agent` TEXT DEFAULT NULL,
    `expires_at` TIMESTAMP NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY `idx_session_user` (`user_id`),
    KEY `idx_session_expires` (`expires_at`),
    CONSTRAINT `fk_session_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. PASSWORD RESETS
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `password_resets` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `token` VARCHAR(100) NOT NULL,
    `expires_at` TIMESTAMP NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY `idx_reset_token` (`token`),
    CONSTRAINT `fk_reset_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. USER PROFILES & SITE PREFERENCES (Liquid Glass, Theme, Language)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_preferences` (
    `user_id` INT PRIMARY KEY,
    `theme` VARCHAR(10) DEFAULT 'dark',         -- 'dark' or 'light'
    `language` VARCHAR(5) DEFAULT 'en',         -- 'en' or 'th'
    `liquid_glass` TINYINT(1) DEFAULT 1,
    `animations` TINYINT(1) DEFAULT 1,
    `bio` TEXT DEFAULT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `fk_pref_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. PORTAL CONFIGURATION (Website Settings & Feature Flags)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `portal_configs` (
    `config_key` VARCHAR(64) PRIMARY KEY,
    `config_value` TEXT NOT NULL,
    `category` VARCHAR(32) DEFAULT 'general',
    `description` VARCHAR(255) DEFAULT NULL,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. AUDIT LOGS (Security & Authentication Events)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `audit_logs` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT DEFAULT NULL,
    `action` VARCHAR(64) NOT NULL,              -- 'login', 'register', 'password_change', 'profile_update'
    `ip_address` VARCHAR(45) DEFAULT NULL,
    `metadata` TEXT DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    KEY `idx_audit_user` (`user_id`),
    KEY `idx_audit_created` (`created_at`),
    CONSTRAINT `fk_audit_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 7. DEFAULT SEEDS (INITIAL ADMIN USER & PORTAL SETTINGS)
-- ----------------------------------------------------------------------------
INSERT IGNORE INTO `users` (`id`, `username`, `email`, `password_hash`, `display_name`, `role`, `is_active`, `email_verified`)
VALUES 
    (1, 'MCrganMan', 'mc.organman@gmail.com', '$2y$10$YourHashedPasswordHereOrRegisterDirectly', 'MCrganMan', 'admin', 1, 1);

INSERT IGNORE INTO `user_preferences` (`user_id`, `theme`, `language`, `liquid_glass`, `animations`, `bio`)
VALUES
    (1, 'dark', 'en', 1, 1, 'Creator of ServerTools Minecraft Bedrock Add-on & Minimalist AI Coder.');

INSERT IGNORE INTO `portal_configs` (`config_key`, `config_value`, `category`, `description`)
VALUES 
    ('site_name', 'MCrganMan Portal', 'general', 'Portal site branding title'),
    ('allow_registrations', 'true', 'auth', 'Allow public user registrations'),
    ('default_theme', 'dark', 'ui', 'Default appearance theme for guests');

SET FOREIGN_KEY_CHECKS = 1;
