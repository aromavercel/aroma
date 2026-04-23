export async function registerPromoAlert({ phone, country }) {
  const { apiFetch, getApiBase } = await import("./apiFetch");
  const apiBase = getApiBase();
  return apiFetch(`${apiBase}/api/promo-alert`, {
    method: "POST",
    body: {
      phone: phone?.toString() || "",
      country: country || "BR",
    },
  });
}

