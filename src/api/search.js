export async function getSearchData(params = {}) {
  const { apiFetch, getApiBase } = await import("./apiFetch");
  const apiBase = getApiBase();
  const url = new URL(`${apiBase}/api/search`, apiBase || undefined);
  if (params.q) url.searchParams.set("q", params.q);
  return apiFetch(url.toString(), { method: "GET" });
}

