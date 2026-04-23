const BASE = import.meta.env.VITE_API_URL || "";

export class ApiError extends Error {
  constructor(message, { status, data } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export function getApiBase() {
  const base = (BASE || "").replace(/\/$/, "");
  return base || (typeof window !== "undefined" ? window.location.origin : "");
}

function getStoredToken() {
  try {
    return typeof localStorage !== "undefined" ? localStorage.getItem("token") : null;
  } catch {
    return null;
  }
}

function friendlyMessage(status, serverMessage, { auth } = {}) {
  if (serverMessage) return serverMessage;
  if (status === 401) return auth ? "Sua sessão expirou. Entre novamente para continuar." : "Faça login para continuar.";
  if (status === 403) return "Você não tem permissão para realizar essa ação.";
  if (status === 404) return "Não encontrado.";
  if (status === 409) return "Já existe um registro com esses dados.";
  if (status === 413) return "Arquivo muito grande. Tente uma imagem menor.";
  if (status >= 500) return "Tivemos um problema no servidor. Tente novamente em instantes.";
  return "Não foi possível concluir. Verifique os dados e tente novamente.";
}

/**
 * Wrapper padrão para fetch: sempre tenta ler JSON {error} e lança mensagens amigáveis.
 * @param {string} path - ex.: "/api/cart"
 * @param {{ method?: string, body?: any, headers?: Record<string,string>, auth?: boolean, signal?: AbortSignal }} [opts]
 */
export async function apiFetch(path, opts = {}) {
  const apiBase = getApiBase();
  const url = path.startsWith("http") ? path : `${apiBase}${path.startsWith("/") ? "" : "/"}${path}`;

  const headers = { ...(opts.headers || {}) };
  const hasBody = opts.body !== undefined && opts.body !== null;
  if (hasBody && !headers["Content-Type"]) headers["Content-Type"] = "application/json";
  if (opts.auth) {
    const token = getStoredToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res;
  try {
    res = await fetch(url, {
      method: opts.method || (hasBody ? "POST" : "GET"),
      headers,
      body: hasBody && headers["Content-Type"]?.includes("application/json") ? JSON.stringify(opts.body) : opts.body,
      signal: opts.signal,
    });
  } catch (err) {
    throw new ApiError("Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.", {
      status: 0,
      data: null,
    });
  }

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => "");

  if (!res.ok) {
    const serverMessage =
      (data && typeof data === "object" ? data.error : "") ||
      (typeof data === "string" ? data.trim() : "");
    throw new ApiError(
      friendlyMessage(res.status, serverMessage, { auth: opts.auth === true }),
      { status: res.status, data },
    );
  }

  return data;
}

