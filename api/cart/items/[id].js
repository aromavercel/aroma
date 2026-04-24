import { handlePatchCartItem, handleDeleteCartItem } from "../../../lib/api/cartHandlers.js";

function resolveItemId(req, queryId) {
  const q = queryId ?? req.query?.id;
  if (Array.isArray(q)) return q[0] != null ? String(q[0]).trim() : "";
  if (q != null && String(q).trim() !== "") return String(q).trim();
  const path = (req.url || req.originalUrl || "").split("?")[0];
  const segments = path.split("/").filter(Boolean);
  const itemsIdx = segments.indexOf("items");
  if (itemsIdx >= 0 && segments[itemsIdx + 1]) {
    try {
      return decodeURIComponent(segments[itemsIdx + 1]).trim();
    } catch {
      return segments[itemsIdx + 1].trim();
    }
  }
  return "";
}

export default async function handler(req, res) {
  const id = resolveItemId(req, req.query?.id);
  if (req.method === "PATCH") return handlePatchCartItem(req, res, id);
  if (req.method === "DELETE") return handleDeleteCartItem(req, res, id);
  res.setHeader("Allow", "PATCH, DELETE");
  return res.status(405).json({ error: "Método não permitido" });
}
