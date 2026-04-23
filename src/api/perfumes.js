import { apiFetch, getApiBase } from "./apiFetch";
const BLOB_HOST = "blob.vercel-storage.com";

function toProxyUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") return imageUrl;
  if (!imageUrl.includes(BLOB_HOST)) return imageUrl;
  const base = getApiBase();
  return `${base}/api/perfume-image?url=${encodeURIComponent(imageUrl)}`;
}

function applyImageProxy(perfume) {
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

/**
 * Lista perfumes do banco. Opcional: ?catalog=arabe|feminino|normal | ?all=1 (admin: lista todos, inclusive inativos).
 * Imagens do Blob são convertidas para o proxy do backend (evita 403).
 * @param {{ catalog?: string, all?: boolean }} [params]
 * @returns {Promise<Array<{ id: string, url: string, title: string, catalogSource: string, notes: object, variants: array, images: string[], ativo?: boolean, esgotado?: boolean }>>}
 */
export async function getPerfumesList(params = {}) {
  const apiBase = getApiBase();
  const url = new URL(`${apiBase}/api/perfumes`, apiBase || undefined);
  if (params.catalog && ["arabe", "feminino", "normal"].includes(params.catalog)) {
    url.searchParams.set("catalog", params.catalog);
  }
  if (params.all) url.searchParams.set("all", "1");
  const list = await apiFetch(url.toString(), { method: "GET", auth: Boolean(params.all) });
  return list.map(applyImageProxy);
}

/**
 * Busca um perfume por id.
 * Imagens do Blob são convertidas para o proxy do backend (evita 403).
 * @param {string} id - UUID do perfume
 * @returns {Promise<{ id: string, url: string, title: string, description: string, catalogSource: string, notes: object, variants: array, images: string[] }>}
 */
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
