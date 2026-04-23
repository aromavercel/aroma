import { apiFetch } from "./apiFetch";

/** Retorna a wishlist do usuário logado. Se não logado ou sem telefone, retorna { items: [] }. */
export async function getWishlist() {
  try {
    const data = await apiFetch("/api/wishlist", { method: "GET", auth: true });
    return { items: data?.items || [] };
  } catch (err) {
    if (err?.status === 401 || err?.status === 400) return { items: [] };
    throw err;
  }
}

export async function addWishlistItem(perfumeId) {
  return apiFetch("/api/wishlist/items", {
    method: "POST",
    auth: true,
    body: { perfume_id: perfumeId },
  });
}

export async function removeWishlistItem(perfumeId) {
  return apiFetch(`/api/wishlist/items/${encodeURIComponent(perfumeId)}`, {
    method: "DELETE",
    auth: true,
  });
}

