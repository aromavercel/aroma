import { normalizePhone } from "./phone.js";

/**
 * Gera chaves equivalentes (E.164, bruto, só dígitos) para bater com carts.user_phone / wishlists.user_phone.
 */
export function cartPhoneCandidateKeys(...sources) {
  const keys = [];
  const seen = new Set();
  const push = (v) => {
    const x = v != null ? String(v).trim() : "";
    if (!x || seen.has(x)) return;
    seen.add(x);
    keys.push(x);
  };
  for (const raw of sources) {
    if (raw == null) continue;
    const s = String(raw).trim();
    if (!s) continue;
    try {
      push(normalizePhone(s, "BR"));
    } catch {
      /* ignora */
    }
    push(s);
    const digits = s.replace(/\D/g, "");
    if (digits.length >= 10) {
      push(digits);
      try {
        push(normalizePhone(digits, "BR"));
      } catch {
        /* ignora */
      }
    }
  }
  return keys;
}

/**
 * Descobre o user_phone gravado no carrinho, ou o canônico (E.164 BR) para criar carrinho novo.
 */
export async function resolveCartsUserPhoneFromCandidates(sql, dbPhone, jwtPhone) {
  const keys = cartPhoneCandidateKeys(dbPhone, jwtPhone);
  for (const key of keys) {
    const [row] = await sql`
      SELECT user_phone FROM carts WHERE user_phone = ${key} LIMIT 1
    `;
    if (row?.user_phone != null && String(row.user_phone).trim()) {
      return String(row.user_phone).trim();
    }
  }
  const base = String(dbPhone || jwtPhone || "").trim();
  if (!base) return "";
  try {
    return normalizePhone(base, "BR");
  } catch {
    return base;
  }
}
