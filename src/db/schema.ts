/**
 * MCrganMan Web Portal SQL Schema Definitions
 * TypeScript models for User Registration, Login, Sessions, Profiles & Preferences.
 * (Pure Web Accounts — Zero Xbox / Game Server Tables)
 */

export interface DbUser {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  display_name?: string | null;
  role: 'admin' | 'creator' | 'moderator' | 'user';
  is_active: boolean;
  email_verified: boolean;
  avatar_url?: string | null;
  created_at: Date | string;
  updated_at: Date | string;
  last_login_at?: Date | string | null;
}

export interface DbUserSession {
  id: string;
  user_id: number;
  token_hash: string;
  ip_address?: string | null;
  user_agent?: string | null;
  expires_at: Date | string;
  created_at: Date | string;
}

export interface DbPasswordReset {
  id: number;
  user_id: number;
  token: string;
  expires_at: Date | string;
  created_at: Date | string;
}

export interface DbUserPreferences {
  user_id: number;
  theme: 'dark' | 'light';
  language: 'en' | 'th';
  liquid_glass: boolean;
  animations: boolean;
  bio?: string | null;
  updated_at: Date | string;
}

export interface DbPortalConfig {
  config_key: string;
  config_value: string;
  category: string;
  description?: string | null;
  updated_at: Date | string;
}

export interface DbAuditLog {
  id: number;
  user_id?: number | null;
  action: string;
  ip_address?: string | null;
  metadata?: string | null;
  created_at: Date | string;
}
