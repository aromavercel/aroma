import { apiFetch, getApiBase } from "./apiFetch";

export async function getShippingEstimate({ cep, peso }) {
  const apiBase = getApiBase();
  return apiFetch(`${apiBase}/api/shipping-estimate`, {
    method: "POST",
    body: {
      cep: (cep || "").replace(/\D/g, "").slice(0, 8),
      ...(peso != null && peso !== "" && { peso: Number(peso) }),
    },
  });
}
