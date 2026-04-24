import { handleLogin } from "../lib/api/login.js";
import { handleRegister } from "../lib/api/register.js";
import { handleAdminCheck } from "../lib/api/adminCheck.js";
import { handleMe } from "../lib/api/me.js";
import { handleUploadAvatar } from "../lib/api/uploadAvatar.js";
import { handlePerfumes } from "../lib/api/perfumes.js";
import { handleAdminUsers } from "../lib/api/adminUsers.js";
import { handleAdminOrders } from "../lib/api/adminOrders.js";
import { handleAdminContactMessages } from "../lib/api/adminContactMessages.js";
import { handleMyOrders } from "../lib/api/myOrders.js";
import { handleContact } from "../lib/api/contact.js";
import { handlePasswordResetRequest } from "../lib/api/passwordResetRequest.js";
import { handlePasswordResetConfirm } from "../lib/api/passwordResetConfirm.js";
import { handleCheckPhone } from "../lib/api/checkPhone.js";
import { handlePostOrders } from "../lib/api/ordersCreate.js";
import {
  handleGetCart,
  handlePostCartItems,
  handlePatchCartItem,
  handleDeleteCartItem,
} from "../lib/api/cartHandlers.js";
import { handleUploadPerfumeImage } from "../lib/api/uploadPerfumeImage.js";

function getPathSegments(req) {
  let segments = [];
  const query = req.query || {};
  const qp = query.path ?? query.slug;
  if (Array.isArray(qp)) {
    segments = qp
      .map((s) => (typeof s === "string" ? s : String(s)).trim())
      .filter(Boolean);
  } else if (typeof qp === "string" && qp.length) {
    segments = qp
      .split("/")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  if (segments.length > 0) {
    return segments.map((s) => {
      try {
        return decodeURIComponent(s);
      } catch (_) {
        return s;
      }
    });
  }
  let rawUrl = req.url || req.originalUrl || "";
  try {
    if (rawUrl.startsWith("http")) {
      const u = new URL(rawUrl);
      rawUrl = u.pathname || rawUrl;
    }
  } catch (_) {}
  const pathOnly = rawUrl.split("?")[0] || "";
  const withoutApi = pathOnly.startsWith("/api") ? pathOnly.slice(4) : pathOnly;
  const path = withoutApi.startsWith("/") ? withoutApi.slice(1) : withoutApi;
  segments = path ? path.split("/").filter(Boolean) : [];
  return segments.map((s) => {
    try {
      return decodeURIComponent(s);
    } catch (_) {
      return s;
    }
  });
}

export default async function handler(req, res) {
  const segments = getPathSegments(req);
  const [first, ...rest] = segments;

  try {
    switch (first) {
      case "login":
        return await handleLogin(req, res);
      case "register":
        return await handleRegister(req, res);
      case "auth": {
        const action = rest?.[0];
        if (action === "check-phone") return await handleCheckPhone(req, res);
        break;
      }
      case "password-reset": {
        const action = rest?.[0];
        if (action === "request") return await handlePasswordResetRequest(req, res);
        if (action === "confirm") return await handlePasswordResetConfirm(req, res);
        break;
      }
      case "admin-check":
        return await handleAdminCheck(req, res);
      case "me":
        return await handleMe(req, res);
      case "upload-avatar":
        return await handleUploadAvatar(req, res);
      case "upload-perfume-image":
        return await handleUploadPerfumeImage(req, res);
      case "contact":
        return await handleContact(req, res);
      case "perfumes":
        return await handlePerfumes(rest, req, res);
      case "cart": {
        if (rest.length === 0 && req.method === "GET") return await handleGetCart(req, res);
        if (rest[0] === "items" && rest.length === 1 && req.method === "POST") {
          return await handlePostCartItems(req, res);
        }
        if (rest[0] === "items" && rest.length === 2) {
          const itemId = rest[1];
          if (req.method === "PATCH") return await handlePatchCartItem(req, res, itemId);
          if (req.method === "DELETE") return await handleDeleteCartItem(req, res, itemId);
        }
        break;
      }
      case "orders":
        if (req.method === "POST") return await handlePostOrders(req, res);
        break;
      case "my-orders":
        return await handleMyOrders(rest, req, res);
      case "admin": {
        const [section, ...adminRest] = rest;
        if (section === "users") {
          return await handleAdminUsers(adminRest, req, res);
        }
        if (section === "orders") {
          return await handleAdminOrders(adminRest, req, res);
        }
        if (section === "contact-messages") {
          return await handleAdminContactMessages(adminRest, req, res);
        }
        break;
      }
      default:
        break;
    }

    return res.status(404).json({ error: "Não foi possível processar esta solicitação." });
  } catch (err) {
    console.error("API router error:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}


