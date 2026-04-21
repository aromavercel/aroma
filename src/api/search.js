const BASE = import.meta.env.VITE_API_URL || "";

function getApiBase() {
  const base = BASE.replace(/\/$/, "");
  return base || (typeof window !== "undefined" ? window.location.origin : "");
}

export async function getSearchData(params = {}) {
  const apiBase = getApiBase();
  const url = new URL(`${apiBase}/api/search`, apiBase || undefined);
  if (params.q) url.searchParams.set("q", params.q);
  const res = await fetch(url.toString());
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : null;
  if (!res.ok) {
    throw new Error(data?.error || "Erro ao carregar busca");
  }
  return data;
}

