ALTER TABLE cart_items
  ADD COLUMN IF NOT EXISTS variant_option TEXT NOT NULL DEFAULT '';

ALTER TABLE cart_items
  ADD COLUMN IF NOT EXISTS unit_price DECIMAL(12,2) NOT NULL DEFAULT 0;

ALTER TABLE cart_items
  DROP CONSTRAINT IF EXISTS cart_items_cart_id_perfume_id_key;

ALTER TABLE cart_items
  DROP CONSTRAINT IF EXISTS cart_items_cart_id_perfume_id_unique;

CREATE UNIQUE INDEX IF NOT EXISTS idx_cart_items_unique_perfume_variant
  ON cart_items (cart_id, perfume_id, variant_option);

ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS variant_option TEXT;

CREATE INDEX IF NOT EXISTS idx_order_items_variant_option
  ON order_items (variant_option);

