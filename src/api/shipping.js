const BASE = import.meta.env.VITE_API_URL || "";

/**
 * Obtém estimativa de entrega pelos Correios (PAC).
 * @param {{ cep: string, peso?: number }} params - CEP de destino (8 dígitos) e peso opcional em kg
 * @returns {{ servico, prazoDias, valor, valorFormatado, mensagem }}
 */
export async function getShippingEstimate({ cep, peso }) {
  const url = `${BASE}/api/shipping-estimate`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cep: (cep || "").replace(/\D/g, "").slice(0, 8),
      ...(peso != null && peso !== "" && { peso: Number(peso) }),
    }),
  });
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => ({}))
    : {};
  if (!res.ok) {
    const msg = data.error || "Erro ao calcular entrega. Tente novamente.";
    throw new Error(msg);
  }
  return data;
}
