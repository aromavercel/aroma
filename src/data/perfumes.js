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

export function toTitleCase(input) {
  const s = String(input || "").trim();
  if (!s) return "";
  return s
    .toLowerCase()
    .split(/\s+/g)
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : ""))
    .join(" ");
}

export function getBrandOptions(perfumesList) {
  const map = new Map();
  (perfumesList || []).forEach((p) => {
    const explicit = typeof p?.brand === "string" ? p.brand.trim() : "";
    const b = explicit
      ? { name: explicit, key: normalizeBrandKey(explicit) }
      : extractBrandFromTitle(p?.title);
    if (!b?.key) return;
    if (!map.has(b.key)) map.set(b.key, toTitleCase(b.name));
  });
  const items = [...map.entries()]
    .map(([key, name]) => ({ key, name }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
  return [{ value: "all", label: "Todas as marcas" }].concat(
    items.map((x) => ({ value: x.key, label: x.name })),
  );
}

// Mantido para o painel admin (campo técnico do banco)
export const CATALOG_SOURCE_OPTIONS = [
  { value: "arabe", label: "Árabe" },
  { value: "feminino", label: "Feminino" },
  { value: "normal", label: "Masculino / Unissex" },
];

/**
 * TEMPORÁRIO: quando o blob está fora do limite, usar imagem local para visualização.
 * Coloque em false quando o banco/blob voltar a funcionar.
 */
const USE_TEMPORARY_PERFUME_IMAGE = false;
const TEMPORARY_PERFUME_IMAGE = "/images/perfume1.webp";

export function getPerfumeDisplayData(item) {
  const variants = item.variants || [];
  const withPrice = variants.filter((v) => v && v.price_number != null);
  const variantsPriceMin = withPrice.length
    ? Math.min(...withPrice.map((v) => Number(v.price_number)))
    : null;
  const priceMinFromApi =
    item && item.priceMin != null && !Number.isNaN(Number(item.priceMin))
      ? Number(item.priceMin)
      : null;
  const priceMin = variantsPriceMin ?? priceMinFromApi;
  const firstVariant = variants.find((v) => v && v.image_url) || variants[0];
  const variantImage = firstVariant?.image_url
    ? (String(firstVariant.image_url).startsWith("//")
      ? "https:" + firstVariant.image_url
      : firstVariant.image_url)
    : "";
  const mainImage = item.images && item.images[0]
    ? (String(item.images[0]).startsWith("//") ? "https:" + item.images[0] : item.images[0])
    : "";
  let imageUrl = mainImage || variantImage || "";
  if (USE_TEMPORARY_PERFUME_IMAGE) {
    imageUrl = TEMPORARY_PERFUME_IMAGE;
  }
  const priceShort =
    firstVariant?.price_short ||
    (priceMin != null
      ? `R$ ` + Number(priceMin).toFixed(2).replace(".", ",")
      : "");
  const source = item.catalogSource || "normal";
  const labels = { arabe: "Árabe", feminino: "Feminino", normal: "Masculino / Unissex" };
  const brand = typeof item?.brand === "string" && item.brand.trim()
    ? item.brand.trim()
    : extractBrandFromTitle(item?.title).name;
  return {
    imageUrl,
    title: item.title || "",
    brand: toTitleCase(brand),
    priceMin: priceMin ?? 0,
    priceShort,
    url: item.url || "#",
    catalogSource: source,
    catalogLabel: labels[source] || source,
    description: item.description || "",
    notes: item.notes || {},
  };
}

export function getPerfumeAllImages(item) {
  const seen = new Set();
  const out = [];
  const add = (url) => {
    if (!url || typeof url !== "string") return;
    const full = String(url).startsWith("//") ? "https:" + url : url;
    if (seen.has(full)) return;
    seen.add(full);
    out.push(full);
  };
  (item.images || []).forEach(add);
  (item.variants || []).forEach((v) => add(v?.image_url));
  if (USE_TEMPORARY_PERFUME_IMAGE) {
    return [TEMPORARY_PERFUME_IMAGE];
  }
  return out;
}
