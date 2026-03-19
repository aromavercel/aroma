const BASE = import.meta.env.VITE_API_URL || "";

export async function sendContactMessage({ name, email, message }) {
  const url = `${BASE}/api/contact`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => ({}))
    : {};
  if (!res.ok) {
    const msg =
      data.error ||
      (res.status === 503
        ? "Servidor sem configuração de e-mail. Tente novamente mais tarde."
        : "Erro ao enviar mensagem.");
    throw new Error(msg);
  }
  return data;
}

