const IBGE_BASE = "https://servicodados.ibge.gov.br/api/v1/localidades";

export const COUNTRY_BR_LABEL = "Brasil";

export const BR_STATES = [
  { value: "", label: "Estado" },
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AM", label: "Amazonas" },
  { value: "AP", label: "Amapá" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MG", label: "Minas Gerais" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MT", label: "Mato Grosso" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "PR", label: "Paraná" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SE", label: "Sergipe" },
  { value: "SP", label: "São Paulo" },
  { value: "TO", label: "Tocantins" },
];

const memoryCache = new Map();

function storageKey(uf) {
  return `ibge_cities_${uf}`;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Falha ao carregar dados (HTTP ${res.status})`);
  return res.json();
}

export async function fetchBrazilCitiesByUF(uf) {
  const key = (uf || "").trim().toUpperCase();
  if (!key) return [];

  if (memoryCache.has(key)) return memoryCache.get(key);

  try {
    const cached = localStorage.getItem(storageKey(key));
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length) {
        memoryCache.set(key, parsed);
        return parsed;
      }
    }
  } catch {
    // ignora cache inválido
  }

  const data = await fetchJson(`${IBGE_BASE}/estados/${key}/municipios`);
  const cities = Array.isArray(data)
    ? data
        .map((m) => (typeof m?.nome === "string" ? m.nome : null))
        .filter(Boolean)
    : [];

  memoryCache.set(key, cities);
  try {
    localStorage.setItem(storageKey(key), JSON.stringify(cities));
  } catch {
    // ignora quota
  }
  return cities;
}

