import { apiFetch, getApiBase } from "./apiFetch";

/**
 * Obtém estimativa de entrega pelos Correios (PAC).
 * @param {{ cep: string, peso?: number }} params - CEP de destino (8 dígitos) e peso opcional em kg
 * @returns {{ servico, prazoDias, valor, valorFormatado, mensagem }}
 */
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
