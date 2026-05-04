export async function getSearchData(params = {}) {
  const { apiFetch, getApiBase } = await import("./apiFetch");
  const { applyImageProxy } = await import("./perfumes");
  const apiBase = getApiBase();
  const url = new URL(`${apiBase}/api/search`, apiBase || undefined);
  if (params.q) url.searchParams.set("q", params.q);
  const data = await apiFetch(url.toString(), { method: "GET" });
  if (!data || typeof data !== "object") return data;
  return {
    ...data,
    topProducts: (data.topProducts || []).map(applyImageProxy),
    results: (data.results || []).map(applyImageProxy),
  };
}

