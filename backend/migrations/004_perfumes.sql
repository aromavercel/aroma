CREATE TABLE IF NOT EXISTS perfumes (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  external_url   TEXT NOT NULL UNIQUE,
  title          TEXT NOT NULL,
  description    TEXT,
  catalog_source VARCHAR(50) NOT NULL,
  notes          JSONB,
  variants       JSONB,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_perfumes_catalog_source ON perfumes (catalog_source);
CREATE INDEX IF NOT EXISTS idx_perfumes_title ON perfumes (title);