import { parsePhoneNumberFromString } from "libphonenumber-js";

/**
 * Prepara o texto digitado (DDD + número, máscaras, etc.) para libphonenumber com país BR.
 * Não exige +55: só dígitos nacionais (ex.: 11999999999) já são interpretados como Brasil.
 */
export function prepareBrazilPhoneForParse(raw) {
  const trimmed = String(raw ?? "").trim();
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

export function isValidBrazilPhoneInput(raw) {
  const s = prepareBrazilPhoneForParse(raw);
  if (!s) return false;
  const parsed = parsePhoneNumberFromString(s, "BR");
  return Boolean(parsed?.isValid());
}
