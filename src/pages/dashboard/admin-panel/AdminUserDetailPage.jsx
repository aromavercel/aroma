import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminUser, makeUserAdmin } from "@/api/admin";

function formatDateTime(val) {
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

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [promoteLoading, setPromoteLoading] = useState(false);
  const [promoteError, setPromoteError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getAdminUser(id)
      .then((data) => {
        setUser(data?.user || null);
      })
      .catch((err) => setError(err.message || "Erro ao carregar usuário"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleMakeAdmin = async () => {
    if (!user || user.role === "admin") return;
    setPromoteLoading(true);
    setPromoteError(null);
    try {
      const result = await makeUserAdmin(user.id);
      if (result?.role === "admin") {
        setUser((prev) => (prev ? { ...prev, role: "admin" } : prev));
      }
    } catch (err) {
      setPromoteError(err.message || "Não foi possível tornar este usuário admin.");
    } finally {
      setPromoteLoading(false);
    }
  };

  return (
    <div className="account-dashboard">
      <button
        type="button"
        className="btn btn-link text-sm px-0 mb-3"
        onClick={() => navigate("/painel/usuarios")}
      >
        ← Voltar para a lista de usuários
      </button>

      <h5 className="title-account mb-3">Detalhes do usuário</h5>

      {loading ? (
        <p className="text-muted">Carregando...</p>
      ) : error ? (
        <p className="text-muted">{error}</p>
      ) : !user ? (
        <p className="text-muted">Usuário não encontrado.</p>
      ) : (
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">
                    <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: 56, height: 56 }}>
                      <span className="fw-medium text-uppercase">
                        {(user.name || user.email || "?")
                          .toString()
                          .trim()
                          .slice(0, 2)}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-1">{user.name || "Usuário sem nome"}</h6>
                    <p className="mb-0 text-sm text-muted">
                      Perfil:{" "}
                      <span className={`badge ${user.role === "admin" ? "bg-primary" : "bg-secondary"}`}>
                        {user.role || "user"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="text-sm text-uppercase text-muted mb-2">
                    Contato
                  </h6>
                  <p className="mb-1 text-sm">
                    <strong>E-mail:</strong> {user.email || "—"}
                  </p>
                  <p className="mb-0 text-sm">
                    <strong>Telefone:</strong> {user.phone || "—"}
                  </p>
                </div>

                <div className="mb-3">
                  <h6 className="text-sm text-uppercase text-muted mb-2">
                    Localização
                  </h6>
                  <p className="mb-1 text-sm">
                    <strong>Cidade:</strong> {user.city || "—"}
                  </p>
                  <p className="mb-1 text-sm">
                    <strong>Estado:</strong> {user.state || "—"}
                  </p>
                  <p className="mb-0 text-sm">
                    <strong>País:</strong> {user.country || "—"}
                  </p>
                </div>

                <div>
                  <h6 className="text-sm text-uppercase text-muted mb-2">
                    Datas
                  </h6>
                  <p className="mb-1 text-sm">
                    <strong>Cadastrado em:</strong>{" "}
                    {formatDateTime(user.created_at)}
                  </p>
                  <p className="mb-1 text-sm">
                    <strong>Última atualização:</strong>{" "}
                    {formatDateTime(user.updated_at)}
                  </p>
                  <p className="mb-0 text-sm">
                    <strong>Última atividade no site:</strong>{" "}
                    {formatDateTime(user.last_activity_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-sm text-uppercase text-muted mb-3">
                  Ações administrativas
                </h6>
                <p className="text-sm mb-3">
                  Apenas administradores podem alterar o perfil de outros usuários.
                </p>

                {user.role === "admin" ? (
                  <p className="text-sm text-success mb-0">
                    Este usuário já é um administrador.
                  </p>
                ) : (
                  <>
                    <button
                      type="button"
                      className="tf-btn btn-fill btn-primary w-100 mb-2"
                      onClick={handleMakeAdmin}
                      disabled={promoteLoading}
                    >
                      {promoteLoading ? "Aplicando..." : "Tornar este usuário admin"}
                    </button>
                    {promoteError && (
                      <p className="text-sm text-danger mb-0">{promoteError}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

