const BASE = import.meta.env.VITE_API_URL || "";
const BLOB_HOST = "blob.vercel-storage.com";

function getApiBase() {
  const base = BASE.replace(/\/$/, "");
  return base || (typeof window !== "undefined" ? window.location.origin : "");
}

function toProxyUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") return imageUrl;
  if (!imageUrl.includes(BLOB_HOST)) return imageUrl;
  const base = BASE.replace(/\/$/, "");
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
  const headers = {};
  if (params.all) {
    const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(url.toString(), { headers: Object.keys(headers).length ? headers : undefined });
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json") ? await res.json().catch(() => null) : null;
  if (!res.ok) {
    const msg = data?.error || (res.status === 503 ? "Banco não configurado." : "Erro ao carregar catálogo.");
    throw new Error(msg);
  }
  const list = data ?? [];
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
  const headers = {};
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(`${apiBase}/api/perfumes/${encodeURIComponent(id)}`, { headers: Object.keys(headers).length ? headers : undefined });
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;
  if (!res.ok) {
    if (res.status === 404) {
      const serverMsg = data?.error;
      if (serverMsg) throw new Error(serverMsg);
      const text = !isJson ? await res.text().catch(() => "") : "";
      throw new Error(text ? `404 ao buscar perfume: ${text.slice(0, 180)}` : "Perfume não encontrado.");
    }
    throw new Error(data?.error || `Erro ao carregar perfume (HTTP ${res.status}).`);
  }
  return applyImageProxy(data);
}

export async function createPerfume(data) {
  const { getStoredToken } = await import("@/api/auth");
  const token = getStoredToken();
  if (!token) throw new Error("Não autenticado");
  const apiBase = getApiBase();
  const res = await fetch(`${apiBase}/api/perfumes`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const resData = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => null) : null;
  if (!res.ok) throw new Error(resData?.error || "Erro ao criar perfume");
  return applyImageProxy(resData);
}

export async function updatePerfume(id, data) {
  const { getStoredToken } = await import("@/api/auth");
  const token = getStoredToken();
  if (!token) throw new Error("Não autenticado");
  const apiBase = getApiBase();
  const res = await fetch(`${apiBase}/api/perfumes/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
  const resData = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => null) : null;
  if (!res.ok) {
    if (res.status === 404) throw new Error("Perfume não encontrado");
    throw new Error(resData?.error || "Erro ao atualizar perfume");
  }
  return applyImageProxy(resData);
}

export async function deletePerfume(id) {
  const { getStoredToken } = await import("@/api/auth");
  const token = getStoredToken();
  if (!token) throw new Error("Não autenticado");
  const apiBase = getApiBase();
  const res = await fetch(`${apiBase}/api/perfumes/${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  const resData = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => null) : null;
  if (!res.ok) {
    if (res.status === 404) throw new Error("Perfume não encontrado");
    throw new Error(resData?.error || "Erro ao excluir perfume");
  }
}
