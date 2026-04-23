import { apiFetch, getApiBase } from "./apiFetch";
const BLOB_HOST = "blob.vercel-storage.com";

function getBase() {
  return getApiBase();
}

function toProxyUrl(imageUrl) {
  if (!imageUrl || typeof imageUrl !== "string") return imageUrl;
  if (!imageUrl.includes(BLOB_HOST)) return imageUrl;
  return `${getBase()}/api/perfume-image?url=${encodeURIComponent(imageUrl)}`;
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
    perfume_id: item.perfume_id ?? id,
    variant_option: item.variant_option ?? null,
    title: item.title ?? "",
    imgSrc: rawImg ? toProxyUrl(rawImg) : "",
    priceShort: item.priceShort ?? "",
    price,
    quantity: Math.max(1, Number(item.quantity) || 1),
  };
}

/** Retorna o carrinho do usuário logado. Se não logado ou sem telefone, retorna { items: [] }. */
export async function getCart() {
  try {
    const data = await apiFetch("/api/cart", { method: "GET", auth: true });
    const items = (data?.items || []).map(mapCartItem);
    return { items };
  } catch (err) {
    if (err?.status === 401 || err?.status === 400) return { items: [] };
    throw err;
  }
}

/** Adiciona ou soma quantidade de um perfume no carrinho. Requer login com telefone. */
export async function addCartItem(perfumeId, quantity = 1, variant = null) {
  return apiFetch("/api/cart/items", {
    method: "POST",
    auth: true,
    body: {
      perfume_id: perfumeId,
      quantity,
      variant_option: variant?.option0 || variant?.variant_option || "",
      unit_price: variant?.price_number ?? variant?.price ?? 0,
    },
  });
}

/** Atualiza a quantidade de um item. quantity 0 remove o item. */
export async function updateCartItem(cartItemId, quantity) {
  return apiFetch(`/api/cart/items/${encodeURIComponent(cartItemId)}`, {
    method: "PATCH",
    auth: true,
    body: { quantity },
  });
}

/** Remove um item do carrinho. */
export async function removeCartItem(cartItemId) {
  return apiFetch(`/api/cart/items/${encodeURIComponent(cartItemId)}`, {
    method: "DELETE",
    auth: true,
  });
}
