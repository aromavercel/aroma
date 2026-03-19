export const CATALOG_OPTIONS = [
  { value: "all", label: "Todos" },
  { value: "arabe", label: "Ãrabe" },
  { value: "feminino", label: "Feminino" },
  { value: "normal", label: "Masculino / Unissex" },
];

/**
 * TEMPORÁRIO: quando o blob está fora do limite, usar imagem local para visualização.
 * Coloque em false quando o banco/blob voltar a funcionar.
 */
const USE_TEMPORARY_PERFUME_IMAGE = true;
const TEMPORARY_PERFUME_IMAGE = "/images/perfume1.webp";

export function getPerfumeDisplayData(item) {
  const variants = item.variants || [];
  const withPrice = variants.filter((v) => v.price_number != null);
  const priceMin = withPrice.length ? Math.min(...withPrice.map((v) => v.price_number)) : null;
  const firstVariant = variants.find((v) => v.image_url) || variants[0];
  const variantImage = firstVariant?.image_url
    ? (String(firstVariant.image_url).startsWith("//") ? "https:" + firstVariant.image_url : firstVariant.image_url)
    : "";
  const mainImage = item.images && item.images[0]
    ? (String(item.images[0]).startsWith("//") ? "https:" + item.images[0] : item.images[0])
    : "";
  let imageUrl = mainImage || variantImage || "";
  if (USE_TEMPORARY_PERFUME_IMAGE) {
    imageUrl = TEMPORARY_PERFUME_IMAGE;
  }
  const priceShort = firstVariant?.price_short || (priceMin != null ? `R$ ` + priceMin.toFixed(2).replace(".", ",") : "");
  const source = item.catalogSource || "normal";
  const labels = { arabe: "Ãrabe", feminino: "Feminino", normal: "Masculino / Unissex" };
  return {
    imageUrl,
    title: item.title || "",
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
