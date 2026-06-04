export function normalizePublicUrl(url) {
  if (url == null || typeof url !== "string") return "";
  const s = url.trim();
  if (!s) return "";
  const head = s.slice(0, 6).toLowerCase();
  if (head.startsWith("data:") || head.startsWith("blob:")) return s;
  if (s.startsWith("//")) return "https:" + s;
  if (/^https?:\/\//i.test(s)) return s;
  if (s.startsWith("/")) return s;
  return "/" + s;
}
