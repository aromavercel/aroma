const BASE = import.meta.env.VITE_API_URL || "";

/** Em produção (mesma origem), usa a URL atual para a API. Evita chamar outro backend por engano. */
function getBase() {
  if (BASE) return BASE.replace(/\/$/, "");
  if (typeof window !== "undefined" && window.location?.origin) return window.location.origin;
  return "";
}

/** URL para iniciar login com Google (redireciona para o backend). */
export function getAuthGoogleUrl() {
  const b = getBase();
  return b ? `${b}/api/auth-google` : "/api/auth-google";
}

/** URL para iniciar login com Facebook (redireciona para o backend). */
export function getAuthFacebookUrl() {
  const b = getBase();
  return b ? `${b}/api/auth-facebook` : "/api/auth-facebook";
}

export async function register({ phone, password, name, email, country }) {
  const url = `${getBase()}/api/register`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: phone?.trim().replace(/\s/g, "") || "",
      password,
      name: name || undefined,
      email: email?.trim() || undefined,
      country: country || "BR",
    }),
  });
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => ({}))
    : {};
  if (!res.ok) {
    const msg =
      data.error ||
      (res.status === 503
        ? "Backend indisponível. Verifique DATABASE_URL e se o backend está rodando."
        : res.status === 404 || res.status >= 500
          ? "Servidor indisponível. Tente de novo ou confira a conexão com o backend."
          : "Erro ao criar conta.");
    throw new Error(msg);
  }
  return data;
}

export async function login({ phone, password, country }) {
  const res = await fetch(`${getBase()}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: phone?.trim().replace(/\s/g, "") || "",
      password,
      country: country || "BR",
    }),
  });
  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => ({}))
    : {};
  if (!res.ok) {
    const msg =
      data.error ||
      (res.status === 503
        ? "Backend indisponível. Verifique DATABASE_URL e se o backend está rodando."
        : "Erro ao fazer login.");
    throw new Error(msg);
  }
  return data;
}

export function getStoredToken() {
  return localStorage.getItem("token");
}

export function setStoredToken(token) {
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
}

export async function getMe() {
  const token = getStoredToken();
  if (!token) return null;
  const res = await fetch(`${getBase()}/api/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => ({}));
  return data?.user ?? null;
}

/** Verifica no servidor se o usuário atual é admin. Retorna true só se o backend confirmar. */
export async function checkAdmin() {
  const token = getStoredToken();
  if (!token) return false;
  const res = await fetch(`${getBase()}/api/admin-check`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return false;
  const data = await res.json().catch(() => ({}));
  return data?.ok === true;
}

export async function updateProfile(profile) {
  const token = getStoredToken();
  if (!token) throw new Error("Não autenticado");
  const res = await fetch(`${getBase()}/api/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(profile),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Erro ao atualizar perfil");
  return data.user;
}

export async function uploadAvatar(dataUrl) {
  const token = getStoredToken();
  if (!token) throw new Error("Não autenticado");
  const res = await fetch(`${getBase()}/api/upload-avatar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ dataUrl }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Erro ao enviar foto");
  return data.url;
}

export async function requestPasswordResetEmail({ email } = {}) {
  const res = await fetch(`${getBase()}/api/password-reset/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email?.trim() || "",
    }),
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => ({}))
    : {};

  if (!res.ok) {
    const msg =
      data.error ||
      (res.status === 503
        ? "Não foi possível enviar o e-mail no momento. Tente novamente."
        : "Erro ao solicitar redefinição de senha.");
    throw new Error(msg);
  }

  return data;
}

export async function confirmPasswordResetEmail({
  email,
  code,
  newPassword,
} = {}) {
  const res = await fetch(`${getBase()}/api/password-reset/confirm`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email?.trim() || "",
      code: typeof code === "string" ? code.trim() : String(code ?? ""),
      newPassword,
    }),
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json().catch(() => ({}))
    : {};

  if (!res.ok) {
    const msg =
      data.error ||
      (res.status === 503
        ? "Erro ao redefinir a senha. Tente novamente."
        : "Código inválido ou expirado.");
    throw new Error(msg);
  }

  return data;
}
