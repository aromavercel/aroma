const BASE = import.meta.env.VITE_API_URL || "";

function getBase() {
  const b = (BASE || (typeof window !== "undefined" ? window.location.origin : "")).replace(/\/$/, "");
  return b || "";
}

function getAuthHeaders() {
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/** Retorna a wishlist do usuário logado. Se não logado ou sem telefone, retorna { items: [] }. */
export async function getWishlist() {
  const res = await fetch(`${getBase()}/api/wishlist`, { headers: getAuthHeaders() });
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => ({})) : {};
  if (!res.ok) {
    if (res.status === 401 || res.status === 400) return { items: [] };
    throw new Error(data.error || "Erro ao carregar lista de desejos");
  }
  return { items: data.items || [] };
}

export async function addWishlistItem(perfumeId) {
  const res = await fetch(`${getBase()}/api/wishlist/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ perfume_id: perfumeId }),
  });
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => ({})) : {};
  if (!res.ok) throw new Error(data.error || "Erro ao adicionar à lista de desejos");
  return data;
}

export async function removeWishlistItem(perfumeId) {
  const res = await fetch(`${getBase()}/api/wishlist/items/${encodeURIComponent(perfumeId)}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => ({})) : {};
  if (!res.ok) throw new Error(data.error || "Erro ao remover da lista de desejos");
  return data;
}

