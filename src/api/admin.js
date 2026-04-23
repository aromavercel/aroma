import { apiFetch } from "./apiFetch";

export async function getAdminUsers() {
  return apiFetch("/api/admin/users", { method: "GET", auth: true });
}

export async function getAdminAccessInfo() {
  return apiFetch("/api/admin/access-info", { method: "GET", auth: true });
}

export async function getAdminUser(id) {
  if (!id) throw new Error("ID do usuário é obrigatório");
  return apiFetch(`/api/admin/users/${id}`, { method: "GET", auth: true });
}

export async function makeUserAdmin(id) {
  if (!id) throw new Error("ID do usuário é obrigatório");
  return apiFetch(`/api/admin/users/${id}/make-admin`, { method: "POST", auth: true });
}

export async function getAdminOrders(params = {}) {
  const search = new URLSearchParams();
  if (params.status && params.status !== "all") {
    search.set("status", params.status);
  }
  const qs = search.toString();
  const path = `/api/admin/orders${qs ? `?${qs}` : ""}`;
  return apiFetch(path, { method: "GET", auth: true });
}

export async function updateOrderStatus(id, status) {
  if (!id) throw new Error("ID do pedido é obrigatório");
  if (!status) throw new Error("Status é obrigatório");
  return apiFetch(`/api/admin/orders/${id}/status`, {
    method: "PATCH",
    auth: true,
    body: { status },
  });
}

export async function getAdminOrder(id) {
  if (!id) throw new Error("ID do pedido é obrigatório");
  return apiFetch(`/api/admin/orders/${id}`, { method: "GET", auth: true });
}

export async function getAdminContactMessages(params = {}) {
  const search = new URLSearchParams();
  if (params.limit != null) search.set("limit", String(params.limit));
  if (params.offset != null) search.set("offset", String(params.offset));
  const qs = search.toString();
  return apiFetch(`/api/admin/contact-messages${qs ? `?${qs}` : ""}`, { method: "GET", auth: true });
}
