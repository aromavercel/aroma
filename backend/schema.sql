CREATE TABLE IF NOT EXISTS users (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email        VARCHAR(255),
  password_hash VARCHAR(255),
  name         VARCHAR(255),
  avatar_url   TEXT,
  birth_date   DATE,
  city         VARCHAR(255),
  state        VARCHAR(255),
  country      VARCHAR(255),
  phone        VARCHAR(50),
  address      TEXT,
  address_complement VARCHAR(255),
  zipcode      VARCHAR(20),
  role         VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users (email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone_unique ON users (phone) WHERE phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_last_activity_at ON users (last_activity_at);

CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_key TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_brands_name_key_unique ON brands (name_key);

CREATE TABLE IF NOT EXISTS perfumes (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id       UUID NOT NULL REFERENCES brands(id) ON DELETE RESTRICT,
  external_url   TEXT UNIQUE,
  title          TEXT NOT NULL,
  description    TEXT,
  catalog_source VARCHAR(50) NOT NULL,
  notes          JSONB,
  variants       JSONB,
  image_2_url    TEXT,
  image_3_url    TEXT,
  image_4_url    TEXT,
  image_5_url    TEXT,
  image_6_url    TEXT,
  image_7_url    TEXT,
  image_8_url    TEXT,
  image_9_url    TEXT,
  image_10_url   TEXT,
  ativo          BOOLEAN NOT NULL DEFAULT true,
  esgotado       BOOLEAN NOT NULL DEFAULT false,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_perfumes_brand_id ON perfumes (brand_id);
CREATE INDEX IF NOT EXISTS idx_perfumes_catalog_source ON perfumes (catalog_source);
CREATE INDEX IF NOT EXISTS idx_perfumes_title ON perfumes (title);

CREATE TABLE IF NOT EXISTS perfume_images (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  perfume_id UUID NOT NULL REFERENCES perfumes(id) ON DELETE CASCADE,
  url        TEXT NOT NULL,
  position   INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_perfume_images_perfume_id ON perfume_images (perfume_id);

CREATE TABLE IF NOT EXISTS carts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_phone VARCHAR(50) NOT NULL UNIQUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id    UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
  perfume_id UUID NOT NULL REFERENCES perfumes(id) ON DELETE CASCADE,
  quantity   INT NOT NULL DEFAULT 1 CHECK (quantity >= 1),
  UNIQUE(cart_id, perfume_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items (cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_perfume_id ON cart_items (perfume_id);

CREATE TABLE IF NOT EXISTS wishlists (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_phone VARCHAR(50) NOT NULL UNIQUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS wishlist_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wishlist_id UUID NOT NULL REFERENCES wishlists(id) ON DELETE CASCADE,
  perfume_id  UUID NOT NULL REFERENCES perfumes(id) ON DELETE CASCADE,
  UNIQUE(wishlist_id, perfume_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_items_wishlist_id ON wishlist_items (wishlist_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_items_perfume_id ON wishlist_items (perfume_id);

CREATE TABLE IF NOT EXISTS promo_alerts (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_phone VARCHAR(50) NOT NULL,
  user_id    UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_phone)
);

CREATE INDEX IF NOT EXISTS idx_promo_alerts_user_id ON promo_alerts (user_id);

CREATE TABLE IF NOT EXISTS orders (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID REFERENCES users(id) ON DELETE SET NULL,
  user_phone        VARCHAR(50) NOT NULL,
  status            VARCHAR(30) NOT NULL DEFAULT 'pending',
  subtotal          DECIMAL(12,2) NOT NULL DEFAULT 0,
  discount          DECIMAL(12,2) NOT NULL DEFAULT 0,
  shipping          DECIMAL(12,2) NOT NULL DEFAULT 0,
  tax               DECIMAL(12,2) NOT NULL DEFAULT 0,
  total             DECIMAL(12,2) NOT NULL DEFAULT 0,
  shipping_name     VARCHAR(255),
  shipping_address  TEXT,
  shipping_complement VARCHAR(255),
  shipping_city     VARCHAR(255),
  shipping_state    VARCHAR(100),
  shipping_zipcode  VARCHAR(20),
  shipping_country  VARCHAR(100),
  shipping_phone    VARCHAR(50),
  payment_method   VARCHAR(50),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_phone ON orders (user_phone);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at);

CREATE TABLE IF NOT EXISTS order_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  perfume_id  UUID NOT NULL REFERENCES perfumes(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  quantity    INT NOT NULL DEFAULT 1 CHECK (quantity >= 1),
  unit_price  DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_price DECIMAL(12,2) NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);

-- Tokens para redefinição de senha por telefone (SMS OTP)
-- Segurança: armazenamos apenas o hash do código, nunca o OTP em texto puro.
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_phone VARCHAR(50),
  user_email VARCHAR(255),
  user_id UUID,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at TIMESTAMPTZ,
  attempts INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_phone_expires
  ON password_reset_tokens (user_phone, expires_at);

CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_email_expires
  ON password_reset_tokens (user_email, expires_at);
