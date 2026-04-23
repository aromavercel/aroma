export async function sendContactMessage({ name, email, message }) {
  const { apiFetch, getApiBase } = await import("./apiFetch");
  const apiBase = getApiBase();
  return apiFetch(`${apiBase}/api/contact`, {
    method: "POST",
    body: { name, email, message },
  });
}

