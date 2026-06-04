import { parsePhoneNumberFromString } from "libphonenumber-js";

const DEFAULT_COUNTRY = "BR";

function prepareRawForParse(raw) {
  const trimmed = typeof raw === "string" ? raw.trim() : "";
  if (!trimmed) return "";
  if (trimmed.startsWith("+")) {
    return trimmed.replace(/\s/g, "");
  }
  const digits = trimmed.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("55") && digits.length >= 12) {
    return `+${digits}`;
  }
  return digits;
}

export function normalizePhone(raw, defaultCountry = DEFAULT_COUNTRY) {
  const str = prepareRawForParse(raw);
  if (!str) throw new Error("Telefone é obrigatório");
  const parsed = parsePhoneNumberFromString(str, defaultCountry);
  if (!parsed) throw new Error("Telefone inválido");
  if (!parsed.isValid()) throw new Error("Telefone inválido");
  return parsed.format("E.164");
}
