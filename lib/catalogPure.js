

export function slugifyTitle(title) {
  return String(title || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .slice(0, 80);
}

export function clampInt(value, { min, max, fallback }) {
  const n =
    typeof value === "string" && value.trim() !== ""
      ? Number(value)
      : Number(value);
  if (!Number.isFinite(n)) return fallback;
  const i = Math.floor(n);
  return Math.min(max, Math.max(min, i));
}

export function clampNumber(value, { min, max, fallback }) {
  const n =
    typeof value === "string" && value.trim() !== ""
      ? Number(value)
      : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

export function normalizeBrandKey(name) {
  return String(name || "")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export function extractBrandFromTitle(title) {
  const t = String(title || "").trim();
  if (!t) return { name: "Sem marca", key: "sem marca" };
  const dashIdx = t.indexOf("-");
  let brand = dashIdx > 0 ? t.slice(0, dashIdx) : t.split(/\s+/)[0];
  brand = String(brand || "").trim();
  if (!brand) brand = "Sem marca";
  const key = normalizeBrandKey(brand);
  return { name: brand, key: key || "sem marca" };
}

export function toUuidKey(val) {
  if (val == null) return "";
  const s = String(val).trim().toLowerCase();
  return s.length > 10 ? s : "";
}

export function canonicalPerfumeImageUrl(u) {
  if (!u || typeof u !== "string") return "";
  const s = u.trim();
  if (!s) return "";
  return s.startsWith("
}

export function stripVariantImagesNotInGallery(variants, galleryUrls) {
  if (!Array.isArray(variants) || !Array.isArray(galleryUrls) || galleryUrls.length === 0) {
    return variants;
  }
  const allowed = new Set(
    galleryUrls.map((u) => canonicalPerfumeImageUrl(u)).filter(Boolean),
  );
  return variants.map((v) => {
    if (!v || typeof v !== "object") return v;
    const img = v.image_url ?? v.imageUrl;
    if (!img || typeof img !== "string") return v;
    const c = canonicalPerfumeImageUrl(img);
    if (allowed.has(c)) return v;
    const { image_url, imageUrl, ...rest } = v;
    return rest;
  });
}

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function normalizePerfumeId(id) {
  if (id == null) return "";
  const s = String(id).trim().toLowerCase();
  return UUID_REGEX.test(s) ? s : "";
}

export function perfumesCatalogWhereParams({
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

export function perfumesListOrderByClause(sort) {
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
