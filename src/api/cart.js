const BASE = import.meta.env.VITE_API_URL || "";
const BLOB_HOST = "blob.vercel-storage.com";

function getBase() {
  const b = (BASE || (typeof window !== "undefined" ? window.location.origin : "")).replace(/\/$/, "");
  return b || "";
}

function toProxyUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") return imageUrl;
  if (!imageUrl.includes(BLOB_HOST)) return imageUrl;
  return `${getBase()}/api/perfume-image?url=${encodeURIComponent(imageUrl)}`;
}

function getAuthHeaders() {
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/**
 * Formato de item do carrinho (retorno da API e uso no Context):
 * { id, perfume_id, title, imageUrl, priceShort, price, quantity }
 */
function mapCartItem(item) {
  const id = item.id ?? item.perfume_id;
  const price = item.price != null ? Number(item.price) : 0;
  const rawImg = item.imageUrl ?? "";
  return {
    id,
    perfume_id: id,
    title: item.title ?? "",
    imgSrc: rawImg ? toProxyUrl(rawImg) : "",
    priceShort: item.priceShort ?? "",
    price,
    quantity: Math.max(1, Number(item.quantity) || 1),
  };
}

/** Retorna o carrinho do usuário logado. Se não logado ou sem telefone, retorna { items: [] }. */
export async function getCart() {
  const res = await fetch(`${getBase()}/api/cart`, { headers: getAuthHeaders() });
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => ({})) : {};
  if (!res.ok) {
    if (res.status === 401 || res.status === 400) return { items: [] };
    throw new Error(data.error || "Erro ao carregar carrinho");
  }
  const items = (data.items || []).map(mapCartItem);
  return { items };
}

/** Adiciona ou soma quantidade de um perfume no carrinho. Requer login com telefone. */
export async function addCartItem(perfumeId, quantity = 1) {
  const res = await fetch(`${getBase()}/api/cart/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ perfume_id: perfumeId, quantity }),
  });
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => ({})) : {};
  if (!res.ok) throw new Error(data.error || "Erro ao adicionar ao carrinho");
  return data;
}

/** Atualiza a quantidade de um item. quantity 0 remove o item. */
export async function updateCartItem(perfumeId, quantity) {
  const res = await fetch(`${getBase()}/api/cart/items/${encodeURIComponent(perfumeId)}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity }),
  });
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => ({})) : {};
  if (!res.ok) throw new Error(data.error || "Erro ao atualizar carrinho");
  return data;
}

/** Remove um item do carrinho. */
export async function removeCartItem(perfumeId) {
  const res = await fetch(`${getBase()}/api/cart/items/${encodeURIComponent(perfumeId)}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => ({})) : {};
  if (!res.ok) throw new Error(data.error || "Erro ao remover do carrinho");
  return data;
}
