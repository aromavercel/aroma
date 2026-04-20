-- Relaciona perfumes -> brands e faz backfill a partir do título ("MARCA - resto")

ALTER TABLE perfumes
  ADD COLUMN IF NOT EXISTS brand_id UUID;

-- Criar marcas a partir dos perfumes existentes
INSERT INTO brands (name, name_key)
SELECT
  TRIM(SPLIT_PART(p.title, '-', 1)) AS name,
  LOWER(TRIM(SPLIT_PART(p.title, '-', 1))) AS name_key
FROM perfumes p
WHERE p.title IS NOT NULL
  AND TRIM(SPLIT_PART(p.title, '-', 1)) <> ''
ON CONFLICT (name_key) DO UPDATE
  SET name = EXCLUDED.name;

-- Associar perfumes às marcas
UPDATE perfumes p
SET brand_id = b.id
FROM brands b
WHERE p.brand_id IS NULL
  AND b.name_key = LOWER(TRIM(SPLIT_PART(p.title, '-', 1)));

-- Se algum título não tiver "-", ainda tentamos usar o primeiro "token" como marca
INSERT INTO brands (name, name_key)
SELECT
  TRIM(SPLIT_PART(p.title, ' ', 1)) AS name,
  LOWER(TRIM(SPLIT_PART(p.title, ' ', 1))) AS name_key
FROM perfumes p
WHERE p.brand_id IS NULL
  AND p.title IS NOT NULL
  AND TRIM(SPLIT_PART(p.title, ' ', 1)) <> ''
ON CONFLICT (name_key) DO UPDATE
  SET name = EXCLUDED.name;

UPDATE perfumes p
SET brand_id = b.id
FROM brands b
WHERE p.brand_id IS NULL
  AND b.name_key = LOWER(TRIM(SPLIT_PART(p.title, ' ', 1)));

ALTER TABLE perfumes
  ADD CONSTRAINT perfumes_brand_id_fkey
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS idx_perfumes_brand_id ON perfumes (brand_id);

ALTER TABLE perfumes
  ALTER COLUMN brand_id SET NOT NULL;

