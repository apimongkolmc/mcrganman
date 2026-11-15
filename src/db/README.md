# MCrganMan Web Portal Database Schema

This database schema is dedicated exclusively to the **MCrganMan Web Portal** for user registration, authentication, sessions, profiles, and preferences.

> **Note**: ServerTools is a client/world **Minecraft Bedrock Add-on**, **not a game server**. Therefore, this database contains zero game-server tables and zero Xbox Live dependencies. It is purely designed for web user registration, login, and portal management.

## Schema Files

- **`schema.sql` (Root)** & **`src/db/schema.sql`**: MariaDB / MySQL 5.7+ / 8.0+ DDL script (phpMyAdmin / InfinityFree compatible).
- **`src/db/schema.ts`**: TypeScript interface models for web backend APIs and auth handlers.

## Database Tables

1. **`users`**: User registration credentials (username, email, password hash, role, active status, last login).
2. **`user_sessions`**: Session tokens and expiration for persistent web logins.
3. **`password_resets`**: Secure recovery tokens.
4. **`user_preferences`**: Portal visual settings (Liquid Glass mode, dark/light theme, English/Thai language, bio).
5. **`portal_configs`**: Website feature flags and configuration key-values.
6. **`audit_logs`**: Security logs for authentication events (login, register, password changes).
