-- =============================================================================
-- RESET MANUAL DO BANCO (Neon / psql)
--
-- MANTÉM:
--   • brands, perfumes, perfume_images (catálogo completo)
--   • usuários cuja role é "admin" (comparação case-insensitive)
--
-- APAGA TODO O RESTO:
--   • pedidos e itens, carrinhos, listas de desejos, mensagens de contato,
--     tokens de reset de senha, promo_alerts
--   • usuários que NÃO são admin
--
-- NÃO rode em CI/migration automática. Execute só quando quiser zerar dados.
-- Faça backup antes. Exija pelo menos 1 admin ou o script aborta.
-- =============================================================================

DO $$
DECLARE
  nadm int;
BEGIN
  SELECT COUNT(*)::int INTO nadm
  FROM users
  WHERE LOWER(COALESCE(TRIM(role), 'user')) = 'admin';

  IF nadm < 1 THEN
    RAISE EXCEPTION
      'Nenhum usuario com role admin encontrado. Crie um admin antes de executar este script.';
  END IF;
END $$;

BEGIN;

-- Transacional / pedidos (order_items: ON DELETE CASCADE a partir de orders)
DELETE FROM orders;

-- Carrinhos e favoritos (ligados a telefone; não fazem parte do catálogo)
DELETE FROM cart_items;
DELETE FROM carts;
DELETE FROM wishlist_items;
DELETE FROM wishlists;

-- Contato e utilitários de conta
DELETE FROM contact_messages;
DELETE FROM password_reset_tokens;
DELETE FROM promo_alerts;

-- Contas: só não-admin (perfumes/brands não referenciam users)
DELETE FROM users
WHERE LOWER(COALESCE(TRIM(role), 'user')) <> 'admin';

COMMIT;
