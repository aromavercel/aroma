const trim = (v) => (typeof v === "string" ? v.trim() : "");

/** Conversa no WhatsApp (mesmo número do rodapé). Sobrescreva com VITE_SOCIAL_WHATSAPP_URL. */
export const WHATSAPP_CHAT_URL =
  trim(import.meta.env.VITE_SOCIAL_WHATSAPP_URL) ||
  "https://wa.me/5575999997821";

/** Perfil oficial no Instagram. Sobrescreva com VITE_SOCIAL_INSTAGRAM_URL. */
export const INSTAGRAM_PROFILE_URL =
  trim(import.meta.env.VITE_SOCIAL_INSTAGRAM_URL) ||
  "https://www.instagram.com/aromaexpresso/";
