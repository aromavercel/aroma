import { sql } from "../backend/lib/db.js";

async function main() {
  if (!sql) {
    console.log("sql not configured (missing DATABASE_URL)");
    process.exit(1);
  }
  const [p] = await sql`SELECT COUNT(*)::int AS c FROM perfumes`;
  let [pa] = [{ c: null }];
  try {
    [pa] = await sql`SELECT COUNT(*)::int AS c FROM perfumes WHERE COALESCE(ativo, true) = true`;
  } catch {
    // schema antigo sem coluna ativo
  }
  const [b] = await sql`SELECT COUNT(*)::int AS c FROM brands`;
  const sample = await sql`
    SELECT p.id, p.title, p.catalog_source, b.name AS brand_name
    FROM perfumes p
    LEFT JOIN brands b ON b.id = p.brand_id
    WHERE COALESCE(p.ativo, true) = true
    ORDER BY p.catalog_source, p.title
    LIMIT 1
  `;
  console.log(JSON.stringify({ perfumes: p?.c ?? null, perfumes_ativos: pa?.c ?? null, brands: b?.c ?? null }, null, 2));
  console.log("sample", sample?.[0]);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

