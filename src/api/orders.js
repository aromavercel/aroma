const BASE = import.meta.env.VITE_API_URL || "";

export function getBase() {
  const b = (BASE || (typeof window !== "undefined" ? window.location.origin : "")).replace(/\/$/, "");
  return b || "";
}

function getAuthHeaders() {
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

/**
 * Cria um pedido a partir do carrinho atual (usuário logado).
 * O backend cria o pedido, copia itens para order_items e zera o carrinho.
 * @param {Object} payload - { subtotal, discount, shipping, tax, total, shipping_name, shipping_address, shipping_complement, shipping_city, shipping_state, shipping_zipcode, shipping_country, shipping_phone, payment_method }
 */
export async function createOrder(payload) {
  const res = await fetch(`${getBase()}/api/orders`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => ({})) : {};
  if (!res.ok) throw new Error(data.error || "Erro ao finalizar pedido");
  return data;
}

/**
 * Retorna a lista de pedidos do usuário logado.
 */
export async function getMyOrders() {
  const res = await fetch(`${getBase()}/api/my-orders`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => ({})) : {};
  if (!res.ok) throw new Error(data.error || "Erro ao carregar pedidos");
  return Array.isArray(data) ? data : Array.isArray(data.orders) ? data.orders : [];
}

/**
 * Retorna os detalhes de um pedido específico do usuário logado.
 */
export async function getMyOrder(id) {
  const res = await fetch(`${getBase()}/api/my-orders/${encodeURIComponent(id)}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => ({})) : {};
  if (!res.ok) throw new Error(data.error || "Erro ao carregar pedido");
  return data;
}
