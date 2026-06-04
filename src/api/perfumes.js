import { apiFetch, getApiBase } from "./apiFetch";
import { normalizePublicUrl } from "@/utils/normalizeImageUrl";
const BLOB_HOST = "blob.vercel-storage.com";

function toProxyUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") return imageUrl;
  const normalized = normalizePublicUrl(imageUrl);
  if (!normalized) return "";
  if (!normalized.includes(BLOB_HOST)) return normalized;
  const base = getApiBase();
  return `${base}/api/perfume-image?url=${encodeURIComponent(normalized)}`;
}

export function applyImageProxy(perfume) {
  if (!perfume) return perfume;
  const p = { ...perfume };
  if (Array.isArray(p.images)) p.images = p.images.map(toProxyUrl);
  if (Array.isArray(p.variants)) {
    p.variants = p.variants.map((v) => {
      if (!v) return v;
      const url = v.image_url ?? v.imageUrl;
      if (!url) return v;
      const proxied = toProxyUrl(url);
      return { ...v, image_url: proxied, imageUrl: proxied };
    });
  }
  return p;
}

export async function getPerfumesList(params = {}) {
  const apiBase = getApiBase();
  const url = new URL(`${apiBase}/api/perfumes`, apiBase || undefined);
  if (params.catalog && ["arabe", "feminino", "normal"].includes(params.catalog)) {
    url.searchParams.set("catalog", params.catalog);
  }
  if (params.all) url.searchParams.set("all", "1");
  if (params.limit != null) url.searchParams.set("limit", String(params.limit));
  if (params.offset != null) url.searchParams.set("offset", String(params.offset));
  if (params.page != null) url.searchParams.set("page", String(params.page));
  if (params.q) url.searchParams.set("q", String(params.q));
  if (params.brandKey) url.searchParams.set("brandKey", String(params.brandKey));
  if (params.priceMin != null && params.priceMin !== "") url.searchParams.set("priceMin", String(params.priceMin));
  if (params.priceMax != null && params.priceMax !== "") url.searchParams.set("priceMax", String(params.priceMax));
  if (params.sort) url.searchParams.set("sort", String(params.sort));
  if (params.status) url.searchParams.set("status", String(params.status));
  if (params.stock) url.searchParams.set("stock", String(params.stock));
  if (params.compact) url.searchParams.set("compact", "1");
  if (params.includeTotal != null) {
    url.searchParams.set("includeTotal", params.includeTotal ? "1" : "0");
  } else if (params.noTotal != null) {
    url.searchParams.set("includeTotal", params.noTotal ? "0" : "1");
  }
  const list = await apiFetch(url.toString(), { method: "GET", auth: Boolean(params.all) });
  if (list && typeof list === "object" && Array.isArray(list.items)) {
    return { ...list, items: list.items.map(applyImageProxy) };
  }
  return (Array.isArray(list) ? list : []).map(applyImageProxy);
}

export async function getPerfumeFacets(params = {}) {
  const apiBase = getApiBase();
  const url = new URL(`${apiBase}/api/perfumes`, apiBase || undefined);
  url.searchParams.set("facets", "1");
  if (params.catalog && ["arabe", "feminino", "normal"].includes(params.catalog)) {
    url.searchParams.set("catalog", params.catalog);
  }
  if (params.all) url.searchParams.set("all", "1");
  if (params.q) url.searchParams.set("q", String(params.q));
  if (params.status) url.searchParams.set("status", String(params.status));
  if (params.stock) url.searchParams.set("stock", String(params.stock));
  const data = await apiFetch(url.toString(), { method: "GET", auth: Boolean(params.all) });
  return data;
}

export async function getPerfumeById(id) {
  const apiBase = getApiBase();
  const data = await apiFetch(`${apiBase}/api/perfumes/${encodeURIComponent(id)}`, { method: "GET", auth: true });
  return applyImageProxy(data);
}

export async function createPerfume(data) {
  const { getStoredToken } = await import("@/api/auth");
  const token = getStoredToken();
  if (!token) throw new Error("Não autenticado");
  const apiBase = getApiBase();
  const resData = await apiFetch(`${apiBase}/api/perfumes`, { method: "POST", auth: true, body: data });
  return applyImageProxy(resData);
}

export async function updatePerfume(id, data) {
  const { getStoredToken } = await import("@/api/auth");
  const token = getStoredToken();
  if (!token) throw new Error("Não autenticado");
  const apiBase = getApiBase();
  const resData = await apiFetch(`${apiBase}/api/perfumes/${encodeURIComponent(id)}`, { method: "PUT", auth: true, body: data });
  return applyImageProxy(resData);
}

export async function deletePerfume(id) {
  const { getStoredToken } = await import("@/api/auth");
  const token = getStoredToken();
  if (!token) throw new Error("Não autenticado");
  const apiBase = getApiBase();
  await apiFetch(`${apiBase}/api/perfumes/${encodeURIComponent(id)}`, { method: "DELETE", auth: true });
}
