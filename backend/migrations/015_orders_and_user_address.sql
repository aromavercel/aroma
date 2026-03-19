ALTER TABLE users ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS address_complement VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS zipcode VARCHAR(20);

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
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders (user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_phone ON orders (user_phone);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at);

CREATE TABLE IF NOT EXISTS order_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id   UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  perfume_id UUID NOT NULL REFERENCES perfumes(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  quantity   INT NOT NULL DEFAULT 1 CHECK (quantity >= 1),
  unit_price DECIMAL(12,2) NOT NULL DEFAULT 0,
  total_price DECIMAL(12,2) NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items (order_id);
