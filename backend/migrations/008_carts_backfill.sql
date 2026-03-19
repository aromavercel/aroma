INSERT INTO carts (user_phone)
SELECT u.phone
FROM users u
WHERE u.phone IS NOT NULL
  AND u.phone <> ''
  AND NOT EXISTS (SELECT 1 FROM carts c WHERE c.user_phone = u.phone);
