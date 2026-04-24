-- Número do imóvel e instruções de entrega no pedido; número e notas no perfil do usuário.

ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS shipping_street_number VARCHAR(30),
  ADD COLUMN IF NOT EXISTS shipping_delivery_instructions TEXT;

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS address_number VARCHAR(30),
  ADD COLUMN IF NOT EXISTS delivery_instructions TEXT;
