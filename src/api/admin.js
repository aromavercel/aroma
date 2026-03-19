const BASE = import.meta.env.VITE_API_URL || "";

function getApiBase() {
  const b = BASE.replace(/\/$/, "");
  return b || (typeof window !== "undefined" ? window.location.origin : "");
}

async function fetchWithAuth(path) {
  const { getStoredToken } = await import("@/api/auth");
  const token = getStoredToken();
  if (!token) throw new Error("Não autenticado");
  const apiBase = getApiBase();
  const res = await fetch(`${apiBase}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = res.headers.get("content-type")?.includes("application/json") ? await res.json().catch(() => null) : null;
  if (!res.ok) throw new Error(data?.error || "Erro na requisição");
  return data;
}

async function fetchWithAuthJson(path, { method = "GET", body } = {}) {
  const { getStoredToken } = await import("@/api/auth");
  const token = getStoredToken();
  if (!token) throw new Error("Não autenticado");
  const apiBase = getApiBase();
  const res = await fetch(`${apiBase}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = res.headers.get("content-type")?.includes("application/json")
    ? await res.json().catch(() => null)
    : null;
  if (!res.ok) throw new Error(data?.error || "Erro na requisição");
  return data;
}

export async function getAdminUsers() {
  return fetchWithAuth("/api/admin/users");
}

export async function getAdminAccessInfo() {
  return fetchWithAuth("/api/admin/access-info");
}

export async function getAdminUser(id) {
  if (!id) throw new Error("ID do usuário é obrigatório");
  return fetchWithAuth(`/api/admin/users/${id}`);
}

export async function makeUserAdmin(id) {
  if (!id) throw new Error("ID do usuário é obrigatório");
  return fetchWithAuthJson(`/api/admin/users/${id}/make-admin`, { method: "POST" });
}

export async function getAdminOrders(params = {}) {
  const search = new URLSearchParams();
  if (params.status && params.status !== "all") {
    search.set("status", params.status);
  }
  const qs = search.toString();
  const path = `/api/admin/orders${qs ? `?${qs}` : ""}`;
  return fetchWithAuth(path);
}

export async function updateOrderStatus(id, status) {
  if (!id) throw new Error("ID do pedido é obrigatório");
  if (!status) throw new Error("Status é obrigatório");
  return fetchWithAuthJson(`/api/admin/orders/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
}

export async function getAdminOrder(id) {
  if (!id) throw new Error("ID do pedido é obrigatório");
  return fetchWithAuth(`/api/admin/orders/${id}`);
}
