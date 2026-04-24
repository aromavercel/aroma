/**
 * Smoke test: lista posicional (mesmo padrão de fetchPerfumesListRows).
 * Uso: node --env-file=.env scripts/test-perfumes-list-query.mjs
 */
const { sql } = await import("../lib/db.js");
if (!sql) {
  console.error("DATABASE_URL ausente");
  process.exit(1);
}

const PERFUMES_FROM_WHERE_SQL = `
FROM perfumes p
LEFT JOIN brands b ON b.id = p.brand_id
WHERE ($1::boolean = false OR p.catalog_source = $2)
  AND ($3::boolean = false OR COALESCE(p.ativo, true) = true)
  AND ($4::boolean IS NULL OR COALESCE(p.ativo, true) = $4)
  AND ($5::boolean IS NULL OR COALESCE(p.esgotado, false) = $5)
  AND ($6::boolean = false OR b.name_key = $7)
  AND ($8::boolean = false OR (
    p.title ILIKE $9 OR COALESCE(p.description, '') ILIKE $9 OR b.name ILIKE $9
  ))`;

const selectBlock = `SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.image_2_url, p.ativo, p.esgotado,
   b.name AS brand_name,
   (
     SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
     FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
     WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
   ) AS price_min`;

const text = `${selectBlock}
${PERFUMES_FROM_WHERE_SQL}
ORDER BY p.catalog_source, p.title
LIMIT $10 OFFSET $11`;

const values = [
  false,
  null,
  true,
  null,
  null,
  false,
  "",
  false,
  "%%",
  25,
  0,
];

try {
  const rows = await sql(text, values);
  console.log("positional catalog list ok", rows?.length);
} catch (e) {
  console.error("query failed", e?.code, e?.message);
  process.exit(1);
}
