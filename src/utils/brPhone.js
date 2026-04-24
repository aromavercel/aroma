import { parsePhoneNumberFromString } from "libphonenumber-js";

/** Só dígitos (0–9), com limite para telefone/celular. */
export function filterPhoneDigitsInput(raw, maxLen = 16) {
  const digits = String(raw ?? "").replace(/\D/g, "");
  return digits.slice(0, maxLen);
}

/**
 * Até 11 dígitos nacionais (DDD + número), removendo 55 inicial se houver.
 * Valor ideal para guardar no estado quando o país é BR.
 */
export function brazilPhoneNationalDigits(raw) {
  let d = String(raw ?? "").replace(/\D/g, "");
  if (d.startsWith("55")) d = d.slice(2);
  return d.slice(0, 11);
}

/**
 * Máscara visual para BR: celular +55 (11) 9 9999-9999 ou fixo +55 (11) 3333-4444.
 * Aceita dígitos nacionais ou string com +55 / máscaras.
 */
export function formatBrazilPhoneDisplay(raw) {
  const d = brazilPhoneNationalDigits(raw);
  if (!d.length) return "";
  const ddd = d.slice(0, 2);
  if (d.length <= 2) return `+55 (${ddd}`;
  const rest = d.slice(2);
  if (!rest.length) return `+55 (${ddd})`;
  if (rest[0] === "9") {
    const out = `+55 (${ddd}) 9`;
    const tail = rest.slice(1);
    if (!tail.length) return out;
    if (tail.length <= 4) return `${out} ${tail}`;
    return `${out} ${tail.slice(0, 4)}-${tail.slice(4, 8)}`;
  }
  if (rest.length <= 4) return `+55 (${ddd}) ${rest}`;
  return `+55 (${ddd}) ${rest.slice(0, 4)}-${rest.slice(4, 8)}`;
}

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
