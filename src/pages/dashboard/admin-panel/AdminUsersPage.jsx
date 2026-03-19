import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminUsers } from "@/api/admin";

function formatDate(val) {
  if (!val) return "—";
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? val : d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function AdminUsersPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAdminUsers().then(setList).catch((err) => setError(err.message || "Erro ao carregar usuários")).finally(() => setLoading(false));
  }, []);

  return (
    <div className="account-dashboard">
      <h5 className="title-account mb-3">Usuários cadastrados</h5>
      <p className="text-muted mb-4">Lista de usuários com acesso ao site.</p>
      {loading ? (
        <p className="text-muted">Carregando...</p>
      ) : error ? (
        <p className="text-muted">{error}</p>
      ) : list.length === 0 ? (
        <p className="text-muted">Nenhum usuário cadastrado.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>E-mail</th>
                <th>Perfil</th>
                <th>Cadastro</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((u) => (
                <tr key={u.id}>
                  <td className="fw-medium">{u.name || "—"}</td>
                  <td>{u.phone || "—"}</td>
                  <td>{u.email || "—"}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.role === "admin" ? "bg-primary" : "bg-secondary"
                      }`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="text-sm text-main-2">{formatDate(u.created_at)}</td>
                  <td className="text-end">
                    <Link to={`/painel/usuarios/${u.id}`} className="text-sm link">
                      Ver detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
