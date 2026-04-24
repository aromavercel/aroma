import { sql } from "../db.js";
import { getBearerToken, verifyToken } from "../auth.js";

function clampInt(value, { min, max, fallback }) {
  const n =
    typeof value === "string" && value.trim() !== ""
      ? Number(value)
      : Number(value);
  if (!Number.isFinite(n)) return fallback;
  const i = Math.floor(n);
  return Math.min(max, Math.max(min, i));
}

function clampNumber(value, { min, max, fallback }) {
  const n =
    typeof value === "string" && value.trim() !== ""
      ? Number(value)
      : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function normalizeBrandKey(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function extractBrandFromTitle(title) {
  const t = String(title || "").trim();
  if (!t) return { name: "Sem marca", key: "sem marca" };
  const dashIdx = t.indexOf("-");
  let brand = dashIdx > 0 ? t.slice(0, dashIdx) : t.split(/\s+/)[0];
  brand = String(brand || "").trim();
  if (!brand) brand = "Sem marca";
  const key = normalizeBrandKey(brand);
  return { name: brand, key: key || "sem marca" };
}

async function upsertBrandIdByTitle(title) {
  const brand = extractBrandFromTitle(title);
  const [row] = await sql`
    INSERT INTO brands (name, name_key)
    VALUES (${brand.name}, ${brand.key})
    ON CONFLICT (name_key) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
  `;
  return row?.id ?? null;
}

function toUuidKey(val) {
  if (val == null) return "";
  const s = String(val).trim().toLowerCase();
  return s.length > 10 ? s : "";
}

async function requireAdmin(req, res) {
  const token = getBearerToken(req);
  const payload = verifyToken(token);
  if (!payload?.userId) {
    res.status(401).json({ error: "Token inválido ou expirado" });
    return null;
  }
  if (!sql) {
    res.status(503).json({ error: "Banco de dados não configurado" });
    return null;
  }
  const rows = await sql`SELECT role FROM users WHERE id = ${payload.userId}`;
  const user = rows?.[0];
  if (!user) {
    res.status(403).json({ error: "Usuário não encontrado" });
    return null;
  }
  const role = (user.role || "user").toString().toLowerCase();
  if (role !== "admin") {
    res.status(403).json({ error: "Acesso negado. Apenas administradores." });
    return null;
  }
  return payload;
}

function buildListRow(p, imagesByPerfume) {
  const perfumeId = toUuidKey(p.id);
  let images = imagesByPerfume.get(perfumeId) ?? [];
  if (images.length === 0) {
    const vars = p.variants ?? [];
    const firstWithImg = vars.find((v) => v && (v.image_url || v.imageUrl));
    const url = firstWithImg && (firstWithImg.image_url ?? firstWithImg.imageUrl);
    if (url) images = [String(url).startsWith("//") ? "https:" + url : url];
  }
  if (images.length === 0 && p.image_2_url) {
    const u = String(p.image_2_url).trim();
    if (u) images = [u.startsWith("//") ? "https:" + u : u];
  }
  return {
    id: toUuidKey(p.id) || String(p.id ?? ""),
    url: p.external_url,
    title: p.title,
    description: p.description ?? "",
    catalogSource: p.catalog_source,
    brand: p.brand_name ?? p.brand ?? "",
    priceMin: p.price_min != null ? Number(p.price_min) : null,
    notes: p.notes ?? {},
    variants: p.variants ?? [],
    images,
    ativo: p.ativo === true || p.ativo == null,
    esgotado: p.esgotado === true,
  };
}

/** Parâmetros do WHERE comum (ordem fixa para queries posicionais $1…$9). */
function perfumesCatalogWhereParams({
  filterByCatalog,
  catalog,
  onlyActive,
  filterActive,
  filterOutOfStock,
  filterByBrand,
  brandKey,
  hasQuery,
  q,
}) {
  return [
    filterByCatalog,
    catalog,
    onlyActive,
    filterActive,
    filterOutOfStock,
    filterByBrand,
    brandKey,
    hasQuery,
    "%" + q + "%",
  ];
}

function perfumesListOrderByClause(sort) {
  switch (sort) {
    case "title-asc":
      return "ORDER BY p.title ASC";
    case "title-desc":
      return "ORDER BY p.title DESC";
    case "price-asc":
      return "ORDER BY price_min ASC NULLS LAST, p.title ASC";
    case "price-desc":
      return "ORDER BY price_min DESC NULLS LAST, p.title ASC";
    default:
      return "ORDER BY p.catalog_source, p.title";
  }
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

const PERFUMES_PRICE_FILTER_SQL = `
  AND ($10::numeric IS NULL OR (
    SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
    FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
    WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
  ) >= $10)
  AND ($11::numeric IS NULL OR (
    SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
    FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
    WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
  ) <= $11)`;

const PERFUMES_COUNT_WITH_PRICE_TXT = `WITH base AS (
  SELECT p.id,
         (
           SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
           FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
           WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
         ) AS price_min
  FROM perfumes p
  LEFT JOIN brands b ON b.id = p.brand_id
  WHERE ($1::boolean = false OR p.catalog_source = $2)
    AND ($3::boolean = false OR COALESCE(p.ativo, true) = true)
    AND ($4::boolean IS NULL OR COALESCE(p.ativo, true) = $4)
    AND ($5::boolean IS NULL OR COALESCE(p.esgotado, false) = $5)
    AND ($6::boolean = false OR b.name_key = $7)
    AND ($8::boolean = false OR (
      p.title ILIKE $9 OR COALESCE(p.description, '') ILIKE $9 OR b.name ILIKE $9
    ))
)
SELECT COUNT(*)::int AS total
FROM base
WHERE 1=1
AND ($10::numeric IS NULL OR price_min >= $10)
AND ($11::numeric IS NULL OR price_min <= $11)`;

/**
 * Lista paginada (Neon serverless): não usar `sql\`\`...\${outroSql}\`\`` — o driver
 * trata o fragmento aninhado como parâmetro e quebra com 42601 perto de "$n".
 */
async function fetchPerfumesListRows(sqlFn, opts) {
  const {
    sort,
    compactOnly,
    isPaged,
    listLimit,
    effectiveOffset,
    hasPriceFilter,
    priceMin,
    priceMax,
    filterByCatalog,
    catalog,
    onlyActive,
    filterActive,
    filterOutOfStock,
    filterByBrand,
    brandKey,
    hasQuery,
    q,
  } = opts;

  const selectBlock = compactOnly
    ? `SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.image_2_url, p.ativo, p.esgotado,
       b.name AS brand_name,
       (
         SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
         FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
         WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
       ) AS price_min`
    : `SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url, p.ativo, p.esgotado,
       b.name AS brand_name,
       (
         SELECT MIN(NULLIF((v->>'price_number')::numeric, 0))
         FROM jsonb_array_elements(COALESCE(p.variants, '[]'::jsonb)) AS v
         WHERE (v ? 'price_number') AND (v->>'price_number') ~ '^[0-9]+(\.[0-9]+)?$'
       ) AS price_min`;

  const priceBlock = hasPriceFilter ? PERFUMES_PRICE_FILTER_SQL : "";
  const orderBy = perfumesListOrderByClause(sort);
  const limitBlock = isPaged
    ? hasPriceFilter
      ? " LIMIT $12 OFFSET $13"
      : " LIMIT $10 OFFSET $11"
    : "";

  const text = `${selectBlock}
${PERFUMES_FROM_WHERE_SQL}${priceBlock}
${orderBy}
${limitBlock}`;

  const values = perfumesCatalogWhereParams({
    filterByCatalog,
    catalog,
    onlyActive,
    filterActive,
    filterOutOfStock,
    filterByBrand,
    brandKey,
    hasQuery,
    q,
  });
  if (hasPriceFilter) values.push(priceMin, priceMax);
  if (isPaged) values.push(listLimit, effectiveOffset);

  return sqlFn(text, values);
}

async function handleList(req, res) {
  const catalog =
    typeof req.query?.catalog === "string" ? req.query.catalog.trim() : null;
  const brandParam =
    typeof req.query?.brand === "string" ? req.query.brand.trim() : null;
  const brandKeyParam =
    typeof req.query?.brandKey === "string" ? req.query.brandKey.trim() : null;
  const brandKey = brandKeyParam
    ? normalizeBrandKey(brandKeyParam)
    : brandParam
      ? normalizeBrandKey(brandParam)
      : null;

  const q =
    typeof req.query?.q === "string" ? req.query.q.trim().slice(0, 80) : "";
  const sort =
    typeof req.query?.sort === "string" ? req.query.sort.trim() : "default";

  const status =
    typeof req.query?.status === "string" ? req.query.status.trim().toLowerCase() : "all"; // all|active|inactive
  const stock =
    typeof req.query?.stock === "string" ? req.query.stock.trim().toLowerCase() : "all"; // all|in_stock|out_of_stock
  const filterActive =
    status === "active" ? true : status === "inactive" ? false : null;
  const filterOutOfStock =
    stock === "out_of_stock" ? true : stock === "in_stock" ? false : null;

  const limitRaw = req.query?.limit ?? req.query?.pageSize;
  const offsetRaw = req.query?.offset;
  const pageRaw = req.query?.page;
  const noTotal =
    req.query?.noTotal === "1" || req.query?.noTotal === "true";
  const limit =
    limitRaw != null
      ? clampInt(limitRaw, { min: 1, max: 96, fallback: 24 })
      : null;
  let offset =
    offsetRaw != null
      ? clampInt(offsetRaw, { min: 0, max: 1_000_000, fallback: 0 })
      : null;
  if (offset == null && pageRaw != null && limit != null) {
    const page = clampInt(pageRaw, { min: 1, max: 100_000, fallback: 1 });
    offset = (page - 1) * limit;
  }

  const priceMin =
    req.query?.priceMin != null
      ? clampNumber(req.query.priceMin, { min: 0, max: 1_000_000, fallback: null })
      : null;
  const priceMax =
    req.query?.priceMax != null
      ? clampNumber(req.query.priceMax, { min: 0, max: 1_000_000, fallback: null })
      : null;

  const allParam = req.query?.all === "1" || req.query?.all === "true";
  let onlyActive = true;
  if (allParam) {
    const payload = await requireAdmin(req, res);
    if (!payload) return;
    onlyActive = false;
  }
  const filterByCatalog = Boolean(
    catalog && ["arabe", "feminino", "normal"].includes(catalog),
  );
  const filterByBrand = Boolean(brandKey);
  const hasQuery = Boolean(q);
  const isPaged = limit != null || offset != null || pageRaw != null;

  const facetsOnly =
    req.query?.facets === "1" || req.query?.facets === "true";
  const compactOnly =
    req.query?.compact === "1" || req.query?.compact === "true";
  if (facetsOnly) {
    const rows = await sql`
      SELECT b.name_key AS key, b.name AS label, COUNT(*)::int AS count
      FROM perfumes p
      LEFT JOIN brands b ON b.id = p.brand_id
      WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
        AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
        AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
        AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
        AND (${hasQuery}::boolean = false OR (
          p.title ILIKE ${"%" + q + "%"}
          OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
          OR b.name ILIKE ${"%" + q + "%"}
        ))
        AND b.id IS NOT NULL
      GROUP BY b.name_key, b.name
      ORDER BY b.name
    `;
    const [totalRow] = await sql`
      SELECT COUNT(*)::int AS total
      FROM perfumes p
      LEFT JOIN brands b ON b.id = p.brand_id
      WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
        AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
        AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
        AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
        AND (${hasQuery}::boolean = false OR (
          p.title ILIKE ${"%" + q + "%"}
          OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
          OR b.name ILIKE ${"%" + q + "%"}
        ))
    `;
    res.setHeader("Cache-Control", "no-store, max-age=0");
    return res.status(200).json({
      brands: (rows || []).map((r) => ({
        key: r.key,
        label: r.label,
        count: r.count,
      })),
      total: totalRow?.total ?? 0,
    });
  }

  let rows;
  let total = null;
  const effectiveLimit = isPaged ? limit ?? 24 : null;
  const effectiveOffset = isPaged ? offset ?? 0 : null;

  const hasPriceFilter = priceMin != null || priceMax != null;

  try {
    if (isPaged && !noTotal) {
      if (!hasPriceFilter) {
        const [countRow] = await sql`
          SELECT COUNT(*)::int AS total
          FROM perfumes p
          LEFT JOIN brands b ON b.id = p.brand_id
          WHERE (${filterByCatalog}::boolean = false OR p.catalog_source = ${catalog})
            AND (${onlyActive}::boolean = false OR COALESCE(p.ativo, true) = true)
            AND (${filterActive}::boolean IS NULL OR COALESCE(p.ativo, true) = ${filterActive})
            AND (${filterOutOfStock}::boolean IS NULL OR COALESCE(p.esgotado, false) = ${filterOutOfStock})
            AND (${filterByBrand}::boolean = false OR b.name_key = ${brandKey})
            AND (${hasQuery}::boolean = false OR (
              p.title ILIKE ${"%" + q + "%"}
              OR COALESCE(p.description, '') ILIKE ${"%" + q + "%"}
              OR b.name ILIKE ${"%" + q + "%"}
            ))
        `;
        total = countRow?.total ?? 0;
      } else {
        const [countRow] = await sql(
          PERFUMES_COUNT_WITH_PRICE_TXT,
          perfumesCatalogWhereParams({
            filterByCatalog,
            catalog,
            onlyActive,
            filterActive,
            filterOutOfStock,
            filterByBrand,
            brandKey,
            hasQuery,
            q,
          }).concat([priceMin, priceMax]),
        );
        total = countRow?.total ?? 0;
      }
    }

    const listLimit = isPaged ? (noTotal ? effectiveLimit + 1 : effectiveLimit) : null;
    rows = await fetchPerfumesListRows(sql, {
      sort,
      compactOnly,
      isPaged,
      listLimit,
      effectiveOffset,
      hasPriceFilter,
      priceMin,
      priceMax,
      filterByCatalog,
      catalog,
      onlyActive,
      filterActive,
      filterOutOfStock,
      filterByBrand,
      brandKey,
      hasQuery,
      q,
    });
  } catch (queryErr) {
    if (queryErr?.code !== "42703" && queryErr?.code !== "42883") throw queryErr;
    rows =
      filterByCatalog
        ? compactOnly
          ? isPaged
            ? await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.image_2_url
                FROM perfumes p
                WHERE p.catalog_source = ${catalog}
                ORDER BY p.title
                LIMIT ${effectiveLimit} OFFSET ${effectiveOffset}
              `
            : await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.image_2_url
                FROM perfumes p
                WHERE p.catalog_source = ${catalog}
                ORDER BY p.title
              `
          : isPaged
            ? await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url
                FROM perfumes p
                WHERE p.catalog_source = ${catalog}
                ORDER BY p.title
                LIMIT ${effectiveLimit} OFFSET ${effectiveOffset}
              `
            : await sql`
                SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url
                FROM perfumes p
                WHERE p.catalog_source = ${catalog}
                ORDER BY p.title
              `
        : isPaged
          ? await sql`
              SELECT id, external_url, title, description, catalog_source, notes, variants, image_2_url
              FROM perfumes
              ORDER BY catalog_source, title
              LIMIT ${effectiveLimit} OFFSET ${effectiveOffset}
            `
          : await sql`
              SELECT id, external_url, title, description, catalog_source, notes, variants, image_2_url
              FROM perfumes
              ORDER BY catalog_source, title
            `;
    if (isPaged && !noTotal) {
      const [countRow] = await sql`SELECT COUNT(*)::int AS total FROM perfumes`;
      total = countRow?.total ?? 0;
    }
  }

  let hasNext = null;
  let pageRows = rows || [];
  if (isPaged && noTotal) {
    hasNext = pageRows.length > effectiveLimit;
    pageRows = hasNext ? pageRows.slice(0, effectiveLimit) : pageRows;
  }

  const perfumeIds = [...new Set((pageRows || []).map((r) => toUuidKey(r.id)).filter(Boolean))];
  const imgRows = perfumeIds.length
    ? await sql`
        SELECT perfume_id, url, position
        FROM perfume_images
        WHERE perfume_id = ANY(${perfumeIds})
        ORDER BY perfume_id, position
      `
    : [];

  const imagesByPerfume = new Map();
  for (const img of imgRows || []) {
    const pid = toUuidKey(img.perfume_id ?? img.perfumeId);
    if (!pid) continue;
    const url =
      typeof (img.url ?? img.URL) === "string"
        ? (img.url ?? img.URL).trim()
        : "";
    if (!url) continue;
    const list = imagesByPerfume.get(pid) || [];
    list.push({ url, position: Number(img.position ?? img.Position ?? list.length) });
    imagesByPerfume.set(pid, list);
  }

  const imagesByPerfumeUrls = new Map();
  for (const [pid, arr] of imagesByPerfume) {
    arr.sort((a, b) => a.position - b.position);
    imagesByPerfumeUrls.set(pid, arr.map((x) => x.url));
  }

  const items = (pageRows || []).map((p) => buildListRow(p, imagesByPerfumeUrls));
  res.setHeader("Cache-Control", "no-store, max-age=0");

  if (isPaged) {
    return res.status(200).json({
      items,
      total: noTotal ? null : (total ?? items.length),
      limit: effectiveLimit,
      offset: effectiveOffset,
      hasNext: noTotal ? Boolean(hasNext) : null,
    });
  }

  return res.status(200).json(items);
}

async function handlePostCreate(req, res) {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  const body = req.body || {};
  const title = typeof body.title === "string" ? body.title.trim() : "";
  let externalUrl =
    typeof body.external_url === "string"
      ? body.external_url.trim()
      : typeof body.url === "string"
        ? body.url.trim()
        : "";
  const catalogSource =
    typeof body.catalog_source === "string"
      ? body.catalog_source.trim()
      : "";
  if (!title) return res.status(400).json({ error: "Título é obrigatório" });
  if (!externalUrl) externalUrl = null;
  if (!["arabe", "feminino", "normal"].includes(catalogSource))
    return res.status(400).json({
      error: "Catálogo deve ser: arabe, feminino ou normal",
    });
  const description =
    typeof body.description === "string"
      ? body.description.trim() || null
      : null;
  const notes =
    body.notes && typeof body.notes === "object" ? body.notes : {};
  const variants = Array.isArray(body.variants) ? body.variants : [];
  const rawImages = Array.isArray(body.images) ? body.images : [];
  const images = rawImages
    .map((u) => (typeof u === "string" ? u.trim() : ""))
    .filter(Boolean);
  const ativo = body.ativo !== false && body.ativo !== "false";
  const esgotado = body.esgotado === true || body.esgotado === "true";

  const brandId = await upsertBrandIdByTitle(title);
  if (!brandId) return res.status(500).json({ error: "Erro ao definir marca" });

  const [inserted] = await sql`
    INSERT INTO perfumes (brand_id, external_url, title, description, catalog_source, notes, variants, ativo, esgotado)
    VALUES (${brandId}, ${externalUrl}, ${title}, ${description}, ${catalogSource}, ${JSON.stringify(
      notes,
    )}, ${JSON.stringify(variants)}, ${ativo}, ${esgotado})
    RETURNING id, external_url, title, description, catalog_source, notes, variants, ativo, esgotado
  `;
  if (!inserted) return res.status(500).json({ error: "Erro ao criar perfume" });
  const perfumeId = inserted.id;
  for (let i = 0; i < images.length; i++) {
    await sql`
      INSERT INTO perfume_images (perfume_id, url, position)
      VALUES (${perfumeId}, ${images[i]}, ${i})
    `;
  }
  const imgRows =
    await sql`SELECT url, position FROM perfume_images WHERE perfume_id = ${perfumeId} ORDER BY position`;
  const imagesList = (imgRows || [])
    .map((i) => (i.url != null ? String(i.url).trim() : ""))
    .filter(Boolean);
  return res.status(201).json({
    id: inserted.id,
    url: inserted.external_url,
    title: inserted.title,
    description: inserted.description ?? "",
    catalogSource: inserted.catalog_source,
    brand: extractBrandFromTitle(inserted.title).name,
    notes: inserted.notes ?? {},
    variants: inserted.variants ?? [],
    images: imagesList,
    ativo: inserted.ativo !== false,
    esgotado: inserted.esgotado === true,
  });
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function normalizePerfumeId(id) {
  if (id == null) return "";
  const s = String(id).trim().toLowerCase();
  return UUID_REGEX.test(s) ? s : "";
}

async function handleGetOne(id, req, res) {
  const normalizedId = normalizePerfumeId(id);
  if (!normalizedId) {
    return res.status(400).json({ error: "ID do perfume inválido" });
  }
  let p;
  try {
    [p] = await sql`
      SELECT p.id, p.external_url, p.title, p.description, p.catalog_source, p.notes, p.variants, p.image_2_url, p.ativo, p.esgotado,
             b.name AS brand_name
      FROM perfumes p
      JOIN brands b ON b.id = p.brand_id
      WHERE p.id = ${normalizedId}
    `;
  } catch (queryErr) {
    if (queryErr?.code !== "42703") throw queryErr;
    [p] = await sql`
      SELECT id, external_url, title, description, catalog_source, notes, variants, image_2_url
      FROM perfumes
      WHERE id = ${normalizedId}
    `;
  }
  if (!p) {
    res.setHeader("Cache-Control", "no-store, max-age=0");
    return res.status(404).json({ error: "Perfume não encontrado" });
  }
  const imgRows =
    await sql`SELECT url, position FROM perfume_images WHERE perfume_id = ${normalizedId} ORDER BY position`;
  let images = (imgRows || [])
    .map((i) => (i.url != null ? String(i.url).trim() : ""))
    .filter(Boolean);
  if (images.length === 0) {
    const vars = p.variants ?? [];
    const firstWithImg = vars.find((v) => v && (v.image_url || v.imageUrl));
    const url = firstWithImg && (firstWithImg.image_url ?? firstWithImg.imageUrl);
    if (url) images = [String(url).startsWith("//") ? "https:" + url : url];
  }
  if (images.length === 0 && p.image_2_url) {
    const u = String(p.image_2_url).trim();
    if (u) images = [u.startsWith("//") ? "https:" + u : u];
  }
  res.setHeader("Cache-Control", "no-store, max-age=0");
  return res.status(200).json({
    id: toUuidKey(p.id) || String(p.id ?? ""),
    url: p.external_url,
    title: p.title,
    description: p.description ?? "",
    catalogSource: p.catalog_source,
    brand: p.brand_name ?? extractBrandFromTitle(p.title).name,
    notes: p.notes ?? {},
    variants: p.variants ?? [],
    images,
    ativo: p.ativo === true || p.ativo == null,
    esgotado: p.esgotado === true,
  });
}

async function handlePut(id, req, res) {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  const [existing] =
    await sql`SELECT id FROM perfumes WHERE id = ${id}`;
  if (!existing)
    return res.status(404).json({ error: "Perfume não encontrado" });
  const body = req.body || {};
  const title = typeof body.title === "string" ? body.title.trim() : "";
  let externalUrl =
    typeof body.external_url === "string"
      ? body.external_url.trim()
      : typeof body.url === "string"
        ? body.url.trim()
        : "";
  const catalogSource =
    typeof body.catalog_source === "string"
      ? body.catalog_source.trim()
      : "";
  if (!title) return res.status(400).json({ error: "Título é obrigatório" });
  if (!externalUrl) externalUrl = null;
  if (!["arabe", "feminino", "normal"].includes(catalogSource))
    return res.status(400).json({
      error: "Catálogo deve ser: arabe, feminino ou normal",
    });
  const description =
    typeof body.description === "string"
      ? body.description.trim() || null
      : null;
  const notes =
    body.notes && typeof body.notes === "object" ? body.notes : {};
  const variants = Array.isArray(body.variants) ? body.variants : [];
  const rawImagesPut = Array.isArray(body.images) ? body.images : [];
  const images = rawImagesPut
    .map((u) => (typeof u === "string" ? u.trim() : ""))
    .filter(Boolean);
  const ativo = body.ativo !== false && body.ativo !== "false";
  const esgotado = body.esgotado === true || body.esgotado === "true";

  const brandId = await upsertBrandIdByTitle(title);
  if (!brandId) return res.status(500).json({ error: "Erro ao definir marca" });

  await sql`
    UPDATE perfumes
    SET external_url = ${externalUrl},
        brand_id = ${brandId},
        title = ${title},
        description = ${description},
        catalog_source = ${catalogSource},
        notes = ${JSON.stringify(notes)},
        variants = ${JSON.stringify(variants)},
        ativo = ${ativo},
        esgotado = ${esgotado},
        updated_at = now()
    WHERE id = ${id}
  `;
  await sql`DELETE FROM perfume_images WHERE perfume_id = ${id}`;
  for (let i = 0; i < images.length; i++) {
    await sql`
      INSERT INTO perfume_images (perfume_id, url, position)
      VALUES (${id}, ${images[i]}, ${i})
    `;
  }
  const [p] =
    await sql`SELECT id, external_url, title, description, catalog_source, notes, variants, ativo, esgotado FROM perfumes WHERE id = ${id}`;
  const imgRows =
    await sql`SELECT url, position FROM perfume_images WHERE perfume_id = ${id} ORDER BY position`;
  const imagesList = (imgRows || [])
    .map((i) => (i.url != null ? String(i.url).trim() : ""))
    .filter(Boolean);
  return res.status(200).json({
    id: p.id,
    url: p.external_url,
    title: p.title,
    description: p.description ?? "",
    catalogSource: p.catalog_source,
    brand: extractBrandFromTitle(p.title).name,
    notes: p.notes ?? {},
    variants: p.variants ?? [],
    images: imagesList,
    ativo: p.ativo !== false,
    esgotado: p.esgotado === true,
  });
}

async function handleDelete(id, req, res) {
  const payload = await requireAdmin(req, res);
  if (!payload) return;
  const [existing] =
    await sql`SELECT id FROM perfumes WHERE id = ${id}`;
  if (!existing)
    return res.status(404).json({ error: "Perfume não encontrado" });
  await sql`DELETE FROM perfume_images WHERE perfume_id = ${id}`;
  await sql`DELETE FROM perfumes WHERE id = ${id}`;
  return res.status(200).json({ ok: true });
}

export async function handlePerfumes(pathSegments, req, res) {
  if (!sql)
    return res
      .status(503)
      .json({ error: "Banco de dados não configurado" });

  const id = Array.isArray(pathSegments) && pathSegments.length > 0
    ? pathSegments[0]
    : undefined;

  try {
    if (!id) {
      if (req.method === "GET") return await handleList(req, res);
      if (req.method === "POST") return await handlePostCreate(req, res);
      return res.status(405).json({ error: "Método não permitido" });
    }

    if (req.method === "GET") return await handleGetOne(id, req, res);
    if (req.method === "PUT") return await handlePut(id, req, res);
    if (req.method === "DELETE") return await handleDelete(id, req, res);
    return res.status(405).json({ error: "Método não permitido" });
  } catch (err) {
    if (err?.code === "23505")
      return res
        .status(409)
        .json({ error: "Já existe um perfume com esta URL externa" });
    console.error("API perfumes error:", err);
    return res.status(500).json({ error: "Erro ao processar perfume" });
  }
}

