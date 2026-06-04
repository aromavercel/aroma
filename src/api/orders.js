import { apiFetch } from "./apiFetch";

export async function createOrder(payload) {
  return apiFetch("/api/orders", { method: "POST", body: payload, auth: true });
}

export async function getMyOrders() {
  const data = await apiFetch("/api/my-orders", { method: "GET", auth: true });
  return Array.isArray(data) ? data : Array.isArray(data?.orders) ? data.orders : [];
}

export async function getMyOrder(id) {
  return apiFetch(`/api/my-orders/${encodeURIComponent(id)}`, { method: "GET", auth: true });
}
