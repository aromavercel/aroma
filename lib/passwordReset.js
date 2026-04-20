import crypto from "crypto";

const OTP_TTL_CODE_LENGTH = 6;

export function generateOtpCode(length = OTP_TTL_CODE_LENGTH) {
  if (!Number.isInteger(length) || length < 4 || length > 12) {
    throw new Error("Tamanho de OTP inválido");
  }

  const max = 10 ** length;
  const n = crypto.randomInt(0, max);
  return String(n).padStart(length, "0");
}

export function hashResetCode(code, phoneE164) {
  const normalizedCode = typeof code === "string" ? code.trim() : "";
  const normalizedPhone = typeof phoneE164 === "string" ? phoneE164.trim() : "";
  if (!normalizedCode || !normalizedPhone) throw new Error("Dados inválidos");

  // Hash com escopo do telefone para reduzir reutilização acidental entre usuários.
  return crypto
    .createHash("sha256")
    .update(`${normalizedPhone}:${normalizedCode}`)
    .digest("hex");
}

export function constantTimeEqualHex(aHex, bHex) {
  if (typeof aHex !== "string" || typeof bHex !== "string") return false;
  if (aHex.length !== bHex.length) return false;

  const a = Buffer.from(aHex, "hex");
  const b = Buffer.from(bHex, "hex");
  if (a.length !== b.length) return false;

  return crypto.timingSafeEqual(a, b);
}

