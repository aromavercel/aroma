import { parsePhoneNumberFromString } from "libphonenumber-js";

const DEFAULT_COUNTRY = "BR";

/**
 * Normaliza o telefone para o formato E.164 (código do país + DDD + número).
 * @param {string} raw - Telefone como digitado
 * @param {string} [defaultCountry='BR'] - Código do país (ISO 3166-1 alpha-2)
 * @returns {string} Número no formato E.164
 * @throws {Error} Se o número for inválido
 */
export function normalizePhone(raw, defaultCountry = DEFAULT_COUNTRY) {
  const str = typeof raw === "string" ? raw.trim().replace(/\s/g, "") : "";
  if (!str) throw new Error("Telefone é obrigatório");
  const parsed = parsePhoneNumberFromString(str, defaultCountry);
  if (!parsed) throw new Error("Telefone inválido");
  if (!parsed.isValid()) throw new Error("Telefone inválido");
  return parsed.format("E.164");
}
