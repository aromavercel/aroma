ALTER TABLE password_reset_tokens
  ADD COLUMN IF NOT EXISTS user_email VARCHAR(255),
  ADD COLUMN IF NOT EXISTS user_id UUID;

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_email_expires
  ON password_reset_tokens (user_email, expires_at);

