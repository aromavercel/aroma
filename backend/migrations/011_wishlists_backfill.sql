INSERT INTO wishlists (user_phone)
SELECT u.phone
FROM users u
WHERE u.phone IS NOT NULL
  AND u.phone <> ''
  AND NOT EXISTS (SELECT 1 FROM wishlists w WHERE w.user_phone = u.phone);
