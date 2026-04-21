const VIACEP_BASE = "https://viacep.com.br/ws";

export function onlyDigits(value) {
  return String(value ?? "").replace(/\D/g, "");
}

export function formatCep(value) {
  const d = onlyDigits(value).slice(0, 8);
  if (d.length <= 5) return d;
  return `${d.slice(0, 5)}-${d.slice(5)}`;
}

export function isCepComplete(value) {
  return onlyDigits(value).length === 8;
}

export async function fetchAddressByCep(cep) {
  const digits = onlyDigits(cep);
  if (digits.length !== 8) return null;
  const res = await fetch(`${VIACEP_BASE}/${digits}/json/`);
  if (!res.ok) throw new Error(`Falha ao consultar CEP (HTTP ${res.status})`);
  const data = await res.json();
  if (!data || data.erro) return null;
  return {
    cep: formatCep(data.cep || digits),
    street: data.logradouro || "",
    complement: data.complemento || "",
    neighborhood: data.bairro || "",
    city: data.localidade || "",
    state: (data.uf || "").toUpperCase(),
  };
}

