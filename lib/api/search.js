import { sql } from "../db.js";

function toUuidKey(val) {
  if (val == null) return "";
  const s = String(val).trim().toLowerCase();
  return s.length > 10 ? s : "";
}

async function getImagesByPerfumeIds(perfumeIds) {
  if (!perfumeIds.length) return new Map();
  const rows = await sql`
    SELECT perfume_id, url, position
    FROM perfume_images
    WHERE perfume_id = ANY(${perfumeIds})
    ORDER BY perfume_id, position
  `;
  const map = new Map();
  for (const r of rows || []) {
    const pid = toUuidKey(r.perfume_id ?? r.perfumeId);
    if (!pid) continue;
    const url = r.url != null ? String(r.url).trim() : "";
    if (!url) continue;
    const list = map.get(pid) || [];
    list.push(url);
    map.set(pid, list);
  }
  return map;
}

function normalizeSearch(q) {
  const s = typeof q === "string" ? q.trim() : "";
  return s.length ? s.slice(0, 80) : "";
}

async function getTopProducts(limit = 4) {
  const rows = await sql`
    SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants,
           p.image_2_url, p.ativo, p.esgotado,
           b.name AS brand_name,
           SUM(oi.quantity)::int AS qty
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    JOIN perfumes p ON p.id = oi.perfume_id
    JOIN brands b ON b.id = p.brand_id
    WHERE COALESCE(o.status, '') <> 'canceled'
    GROUP BY p.id, b.name
    ORDER BY qty DESC
    LIMIT ${limit}
  `;
  return rows || [];
}

async function getRandomProducts(limit = 4, excludeIds = []) {
  const rows = await sql`
    SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants,
           p.image_2_url, p.ativo, p.esgotado,
           b.name AS brand_name
    FROM perfumes p
    JOIN brands b ON b.id = p.brand_id
    WHERE COALESCE(p.ativo, true) = true
      AND (${excludeIds}::uuid[] IS NULL OR p.id <> ALL(${excludeIds}))
    ORDER BY random()
    LIMIT ${limit}
  `;
  return rows || [];
}

async function getTopBrands(limit = 4) {
  const rows = await sql`
    SELECT b.id, b.name, SUM(oi.quantity)::int AS qty
    FROM order_items oi
    JOIN orders o ON o.id = oi.order_id
    JOIN perfumes p ON p.id = oi.perfume_id
    JOIN brands b ON b.id = p.brand_id
    WHERE COALESCE(o.status, '') <> 'canceled'
    GROUP BY b.id, b.name
    ORDER BY qty DESC
    LIMIT ${limit}
  `;
  return rows || [];
}

async function getRandomBrands(limit = 4) {
  const rows = await sql`
    SELECT id, name
    FROM brands
    ORDER BY random()
    LIMIT ${limit}
  `;
  return rows || [];
}

function toPerfumeCardRow(p, imagesByPerfume) {
  const pid = toUuidKey(p.id);
  let images = imagesByPerfume.get(pid) ?? [];
  if ((!images || images.length === 0) && p.image_2_url) {
    const u = String(p.image_2_url).trim();
    if (u) images = [u.startsWith("//") ? "https:" + u : u];
  }
  return {
    id: pid || String(p.id ?? ""),
    url: p.external_url,
    title: p.title,
    description: p.description ?? "",
    catalogSource: p.catalog_source,
    brand: p.brand_name ?? "",
    notes: p.notes ?? {},
    variants: p.variants ?? [],
    images,
    ativo: p.ativo === true || p.ativo == null,
    esgotado: p.esgotado === true,
  };
}

export async function handleSearch(req, res) {
  if (!sql)
    return res.status(503).json({ error: "Banco de dados não configurado" });

  const q = normalizeSearch(req.query?.q);

  let topProducts = await getTopProducts(4);
  if (topProducts.length < 4) {
    const exclude = topProducts.map((p) => p.id).filter(Boolean);
    const fill = await getRandomProducts(4 - topProducts.length, exclude);
    topProducts = topProducts.concat(fill);
  }

  let topBrands = await getTopBrands(4);
  if (topBrands.length < 4) {
    const fill = await getRandomBrands(4 - topBrands.length);
    topBrands = topBrands.concat(fill);
  }

  let results = [];
  if (q) {
    results = await sql`
      SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants,
             p.image_2_url, p.ativo, p.esgotado,
             b.name AS brand_name
      FROM perfumes p
      JOIN brands b ON b.id = p.brand_id
      WHERE COALESCE(p.ativo, true) = true
        AND (
          p.title ILIKE ${"%" + q + "%"}
          OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
          OR b.name ILIKE ${"%" + q + "%"}
        )
      ORDER BY p.title
      LIMIT 48
    `;
  }

  const allForImages = [...topProducts, ...results];
  const ids = [
    ...new Set(allForImages.map((p) => toUuidKey(p.id)).filter(Boolean)),
  ];
  const imagesByPerfume = await getImagesByPerfumeIds(ids);

  return res.status(200).json({
    q,
    topBrands: topBrands.map((b) => ({
      id: toUuidKey(b.id) || String(b.id ?? ""),
      name: b.name,
      qty: b.qty ?? null,
    })),
    topProducts: topProducts.map((p) => toPerfumeCardRow(p, imagesByPerfume)),
    results: results.map((p) => toPerfumeCardRow(p, imagesByPerfume)),
  });
}

