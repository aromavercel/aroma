CREATE TABLE IF NOT EXISTS promo_alerts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_phone VARCHAR(50) NOT NULL,
  user_id    UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_phone)
);

CREATE INDEX IF NOT EXISTS idx_promo_alerts_user_id ON promo_alerts (user_id);
