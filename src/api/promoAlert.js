const BASE = import.meta.env.VITE_API_URL || "";

export async function registerPromoAlert({ phone, country }) {
  const url = `${BASE}/api/promo-alert`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: phone?.toString() || "",
      country: country || "BR",
    }),
  });
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => ({}))
    : {};
  if (!res.ok) {
    const msg =
      data.error ||
      (res.status === 503
        ? "Servidor indisponível para salvar o alerta. Tente novamente mais tarde."
        : "Erro ao registrar alerta de promoções.");
    throw new Error(msg);
  }
  return data;
}

