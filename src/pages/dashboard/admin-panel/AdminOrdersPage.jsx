import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAdminOrders, updateOrderStatus } from "@/api/admin";

const STATUS_OPTIONS = [
  { value: "all", label: "Todos os estados" },
  { value: "pending", label: "Pedido realizado" },
  { value: "confirmed", label: "Pedido confirmado" },
  { value: "shipped", label: "Enviado" },
  { value: "completed", label: "Finalizado" },
  { value: "canceled", label: "Cancelado" },
];

function formatDate(val) {
  if (!val) return "—";
  const d = new Date(val);
  return Number.isNaN(d.getTime())
    ? "—"
    : d.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
}

function formatMoney(val) {
  const n = Number(val || 0);
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function getStatusLabel(status) {
  switch (status) {
    case "pending":
      return "Pedido realizado";
    case "confirmed":
      return "Pedido confirmado";
    case "shipped":
      return "Enviado";
    case "completed":
      return "Finalizado";
    case "canceled":
      return "Cancelado";
    default:
      return status || "—";
  }
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "pending":
      return "bg-warning text-dark";
    case "confirmed":
      return "bg-primary";
    case "shipped":
      return "bg-info text-dark";
    case "completed":
      return "bg-success";
    case "canceled":
      return "bg-secondary";
    default:
      return "bg-light text-dark";
  }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const loadOrders = () => {
    setLoading(true);
    setError(null);
    getAdminOrders({ status: statusFilter })
      .then(setOrders)
      .catch((err) =>
        setError(err.message || "Erro ao carregar pedidos"),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return orders || [];
    return (orders || []).filter((o) => {
      const id = String(o?.id || "").toLowerCase();
      const name = (o?.customer_name || "").toString().toLowerCase();
      const email = (o?.customer_email || "").toString().toLowerCase();
      const phone = (o?.customer_phone || "").toString().toLowerCase();
      const status = (o?.status || "").toString().toLowerCase();
      const total = String(o?.total ?? "").toLowerCase();
      return (
        id.includes(q) ||
        id.slice(0, 8).includes(q) ||
        name.includes(q) ||
        email.includes(q) ||
        phone.includes(q) ||
        status.includes(q) ||
        total.includes(q)
      );
    });
  }, [orders, search]);

  const hasOrders = useMemo(() => filteredOrders && filteredOrders.length > 0, [filteredOrders]);

  const handleChangeStatus = async (order, nextStatus) => {
    if (!order?.id || !nextStatus || nextStatus === order.status) return;
    setUpdatingId(order.id);
    try {
      const updated = await updateOrderStatus(order.id, nextStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === updated.id ? updated : o)),
      );
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.message || "Erro ao atualizar status do pedido.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="account-dashboard">
      <h5 className="title-account mb-3">Pedidos</h5>
      <p className="text-muted mb-4">
        Acompanhe todos os pedidos realizados na loja. Use os filtros para
        localizar pedidos por status.
      </p>

      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex flex-wrap align-items-center gap-3">
          <span className="text-sm text-main-2">
            {filteredOrders.length} pedido{filteredOrders.length === 1 ? "" : "s"}
          </span>
          <select
            className="form-select form-select-sm"
            style={{ minWidth: 200 }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <input
            className="form-control form-control-sm"
            style={{ minWidth: 260 }}
            placeholder="Buscar por código, cliente, contato..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={loadOrders}
          disabled={loading}
        >
          Atualizar
        </button>
      </div>

      {loading ? (
        <p className="text-muted">Carregando pedidos...</p>
      ) : error ? (
        <p className="text-muted">{error}</p>
      ) : !hasOrders ? (
        <p className="text-muted">Nenhum pedido encontrado.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Código</th>
                <th>Cliente</th>
                <th>Contato</th>
                <th>Total</th>
                <th>Status</th>
                <th>Criado em</th>
                <th className="text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.id}>
                  <td className="text-sm font-monospace">
                    {String(o.id).slice(0, 8)}
                  </td>
                  <td className="text-sm">
                    {o.customer_name || "—"}
                  </td>
                  <td className="text-sm">
                    {o.customer_email || o.customer_phone || "—"}
                  </td>
                  <td className="fw-medium">
                    {formatMoney(o.total)}
                  </td>
                  <td>
                    <span
                      className={`badge ${getStatusBadgeClass(o.status)}`}
                    >
                      {getStatusLabel(o.status)}
                    </span>
                  </td>
                  <td className="text-sm text-main-2">
                    {formatDate(o.created_at)}
                  </td>
                  <td className="text-end">
                    <div className="d-flex justify-content-end gap-2">
                      <Link
                        to={`/painel/pedidos/${o.id}`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Ver detalhes
                      </Link>
                      <select
                        className="form-select form-select-sm d-inline-block w-auto"
                        value={o.status || "pending"}
                        disabled={updatingId === o.id}
                        onChange={(e) =>
                          handleChangeStatus(o, e.target.value)
                        }
                      >
                        {STATUS_OPTIONS.filter(
                          (opt) => opt.value !== "all",
                        ).map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
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

