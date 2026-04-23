import { apiFetch } from "./apiFetch";

/**
 * Cria um pedido a partir do carrinho atual (usuário logado).
 * O backend cria o pedido, copia itens para order_items e zera o carrinho.
 * @param {Object} payload - { subtotal, discount, shipping, tax, total, shipping_name, shipping_address, shipping_complement, shipping_city, shipping_state, shipping_zipcode, shipping_country, shipping_phone, payment_method }
 */
export async function createOrder(payload) {
  return apiFetch("/api/orders", { method: "POST", body: payload, auth: true });
}

/**
 * Retorna a lista de pedidos do usuário logado.
 */
export async function getMyOrders() {
  const data = await apiFetch("/api/my-orders", { method: "GET", auth: true });
  return Array.isArray(data) ? data : Array.isArray(data?.orders) ? data.orders : [];
}

/**
 * Retorna os detalhes de um pedido específico do usuário logado.
 */
export async function getMyOrder(id) {
  return apiFetch(`/api/my-orders/${encodeURIComponent(id)}`, { method: "GET", auth: true });
}
