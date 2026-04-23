import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminUsers } from "@/api/admin";
import Skeleton from "@/components/common/Skeleton";

function formatDate(val) {
  if (!val) return "—";
  const d = new Date(val);
  return Number.isNaN(d.getTime()) ? val : d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function AdminUsersPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAdminUsers().then(setList).catch((err) => setError(err.message || "Erro ao carregar usuários")).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return (list || []).filter((u) => {
      const name = (u?.name || "").toString().toLowerCase();
      const email = (u?.email || "").toString().toLowerCase();
      const phone = (u?.phone || "").toString().toLowerCase();
      const role = (u?.role || "").toString().toLowerCase();
      return (
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        role.includes(q) ||
        String(u?.id || "").toLowerCase().includes(q)
      );
    });
  }, [list, search]);

  return (
    <div className="account-dashboard">
      <h5 className="title-account mb-3">Usuários cadastrados</h5>
      <p className="text-muted mb-4">Lista de usuários com acesso ao site.</p>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3">
        <div className="d-flex align-items-center gap-2">
          <span className="text-sm text-main-2">
            {filtered.length} usuário{filtered.length === 1 ? "" : "s"}
          </span>
        </div>
        <input
          className="form-control form-control-sm"
          style={{ maxWidth: 360 }}
          placeholder="Buscar por nome, e-mail, telefone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="py-3">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={`sk-u-${idx}`} className="d-flex align-items-center gap-3 py-2">
              <Skeleton style={{ width: 36, height: 36, borderRadius: "50%" }} rounded={false} />
              <div style={{ flex: 1 }}>
                <Skeleton variant="text" style={{ width: "40%", marginBottom: 8 }} />
                <Skeleton variant="text" style={{ width: "25%" }} />
              </div>
              <Skeleton variant="text" style={{ width: 80 }} />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-muted">{error}</p>
      ) : filtered.length === 0 ? (
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
              {filtered.map((u) => (
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
