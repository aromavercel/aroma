import React, { useEffect, useMemo, useRef, useState } from "react";
import { getAdminContactMessages } from "@/api/admin";

function formatDate(val) {
  if (!val) return "—";
  const d = new Date(val);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminContactMessagesPage() {
  const modalRef = useRef(null);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const limit = 50;

  const load = async (nextOffset = 0) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAdminContactMessages({ limit, offset: nextOffset });
      setItems(data?.items || []);
      setTotal(Number(data?.total || 0));
      setOffset(Number(data?.offset || nextOffset));
    } catch (err) {
      setError(err.message || "Erro ao carregar mensagens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canPrev = offset > 0;
  const canNext = offset + limit < total;

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items || [];
    return (items || []).filter((m) => {
      const name = (m?.name || "").toString().toLowerCase();
      const email = (m?.email || "").toString().toLowerCase();
      const message = (m?.message || "").toString().toLowerCase();
      const id = String(m?.id || "").toLowerCase();
      return name.includes(q) || email.includes(q) || message.includes(q) || id.includes(q);
    });
  }, [items, search]);

  const openMessage = async (m) => {
    setSelected(m);
    const bootstrap = await import("bootstrap");
    const instance = bootstrap.Modal.getOrCreateInstance(modalRef.current);
    instance.show();
  };

  useEffect(() => {
    const el = modalRef.current;
    if (!el) return;
    let cleanup = () => {};
    import("bootstrap").then((bootstrap) => {
      const instance = bootstrap.Modal.getOrCreateInstance(el);
      const handleHidden = () => setSelected(null);
      el.addEventListener("hidden.bs.modal", handleHidden);
      cleanup = () => {
        el.removeEventListener("hidden.bs.modal", handleHidden);
        try {
          instance.hide();
        } catch {
          // ignora
        }
      };
    }).catch(() => {});
    return () => cleanup();
  }, []);

  return (
    <div className="account-dashboard">
      <h5 className="title-account mb-3">Mensagens de contato</h5>
      <p className="text-muted mb-4">
        Mensagens enviadas pelo formulário de contato do site.
      </p>

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <span className="text-sm text-main-2">
            {filteredItems.length} mensagem{filteredItems.length === 1 ? "" : "s"}
            {search.trim() ? (
              <span className="text-muted"> (filtrado)</span>
            ) : null}
          </span>
          <input
            className="form-control form-control-sm"
            style={{ minWidth: 280 }}
            placeholder="Buscar por nome, e-mail, mensagem..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => load(offset)}
          disabled={loading}
        >
          Atualizar
        </button>
      </div>

      {loading ? (
        <p className="text-muted">Carregando...</p>
      ) : error ? (
        <div className="p-4 rounded bg-light">
          <div className="text-muted">{error}</div>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm mt-3"
            onClick={() => load(offset)}
          >
            Tentar novamente
          </button>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="p-4 rounded bg-light text-center">
          <p className="text-muted mb-0">Nenhuma mensagem ainda.</p>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Data</th>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Mensagem</th>
                  <th className="text-end">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((m) => (
                  <tr key={m.id}>
                    <td className="text-sm text-main-2" style={{ whiteSpace: "nowrap" }}>
                      {formatDate(m.created_at)}
                    </td>
                    <td className="fw-medium">{m.name}</td>
                    <td className="text-sm">{m.email}</td>
                    <td className="text-sm" style={{ minWidth: 360 }}>
                      <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 520 }}>
                        {m.message}
                      </div>
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => openMessage(m)}
                      >
                        Abrir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              disabled={!canPrev || loading}
              onClick={() => load(Math.max(0, offset - limit))}
            >
              Anterior
            </button>
            <div className="text-sm text-muted">
              {Math.min(offset + 1, total)}–{Math.min(offset + limit, total)} de {total}
            </div>
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm"
              disabled={!canNext || loading}
              onClick={() => load(offset + limit)}
            >
              Próximo
            </button>
          </div>
        </>
      )}

      <div
        ref={modalRef}
        className="modal fade"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Mensagem de contato</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar" />
            </div>
            <div className="modal-body">
              <div className="mb-2 text-sm text-muted">
                <strong>Data:</strong> {formatDate(selected?.created_at)}
              </div>
              <div className="mb-2">
                <strong>Nome:</strong> {selected?.name || "—"}
              </div>
              <div className="mb-3">
                <strong>E-mail:</strong> {selected?.email || "—"}
              </div>
              <div className="p-3 rounded bg-light" style={{ whiteSpace: "pre-wrap" }}>
                {selected?.message || "—"}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

