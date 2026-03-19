import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminOrder, updateOrderStatus } from "@/api/admin";

const STATUS_LABELS = {
  pending: "Pedido realizado",
  shipped: "Enviado",
  completed: "Finalizado",
  canceled: "Cancelado",
};

const STATUS_OPTIONS = [
  { value: "pending", label: "Pedido realizado" },
  { value: "shipped", label: "Enviado" },
  { value: "completed", label: "Finalizado" },
  { value: "canceled", label: "Cancelado" },
];

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

function formatMoney(val) {
  const n = Number(val || 0);
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "pending":
      return "bg-warning text-dark";
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

export default function AdminOrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getAdminOrder(id)
      .then((data) => {
        setOrder(data?.order || null);
        setItems(data?.items || []);
      })
      .catch((err) =>
        setError(err.message || "Erro ao carregar pedido"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleChangeStatus = async (nextStatus) => {
    if (!order?.id || !nextStatus || nextStatus === order.status) return;
    setUpdating(true);
    try {
      const updated = await updateOrderStatus(order.id, nextStatus);
      setOrder((prev) => (prev ? { ...prev, status: updated.status } : prev));
    } catch (err) {
      // eslint-disable-next-line no-alert
      window.alert(err.message || "Erro ao atualizar status do pedido.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="account-dashboard">
      <button
        type="button"
        className="btn btn-link text-sm px-0 mb-3"
        onClick={() => navigate("/painel/pedidos")}
      >
        ← Voltar para a lista de pedidos
      </button>

      <h5 className="title-account mb-3">Detalhes do pedido</h5>

      {loading ? (
        <p className="text-muted">Carregando...</p>
      ) : error ? (
        <p className="text-muted">{error}</p>
      ) : !order ? (
        <p className="text-muted">Pedido não encontrado.</p>
      ) : (
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-sm text-uppercase text-muted mb-3">
                  Resumo
                </h6>
                <p className="mb-1 text-sm">
                  <strong>Código:</strong>{" "}
                  <span className="font-monospace">
                    {String(order.id).slice(0, 8)}
                  </span>
                </p>
                <p className="mb-1 text-sm">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${getStatusBadgeClass(order.status)}`}
                  >
                    {STATUS_LABELS[order.status] || order.status || "—"}
                  </span>
                </p>
                <p className="mb-1 text-sm">
                  <strong>Total:</strong> {formatMoney(order.total)}
                </p>
                <p className="mb-1 text-sm">
                  <strong>Subtotal:</strong>{" "}
                  {formatMoney(order.subtotal)}
                </p>
                <p className="mb-1 text-sm">
                  <strong>Desconto:</strong>{" "}
                  {formatMoney(order.discount)}
                </p>
                <p className="mb-1 text-sm">
                  <strong>Frete:</strong> {formatMoney(order.shipping)}
                </p>
                <p className="mb-3 text-sm">
                  <strong>Imposto:</strong> {formatMoney(order.tax)}
                </p>

                <h6 className="text-sm text-uppercase text-muted mb-2">
                  Datas
                </h6>
                <p className="mb-1 text-sm">
                  <strong>Criado em:</strong>{" "}
                  {formatDateTime(order.created_at)}
                </p>
                <p className="mb-0 text-sm">
                  <strong>Atualizado em:</strong>{" "}
                  {formatDateTime(order.updated_at)}
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-sm text-uppercase text-muted mb-3">
                  Cliente e entrega
                </h6>
                <p className="mb-1 text-sm">
                  <strong>Nome:</strong>{" "}
                  {order.customer_name || order.shipping_name || "—"}
                </p>
                <p className="mb-1 text-sm">
                  <strong>E-mail:</strong>{" "}
                  {order.customer_email || "—"}
                </p>
                <p className="mb-1 text-sm">
                  <strong>Telefone:</strong>{" "}
                  {order.customer_phone || order.shipping_phone || "—"}
                </p>
                <p className="mb-1 text-sm">
                  <strong>Endereço:</strong>{" "}
                  {order.shipping_address || "—"}
                </p>
                <p className="mb-1 text-sm">
                  <strong>Complemento:</strong>{" "}
                  {order.shipping_complement || "—"}
                </p>
                <p className="mb-1 text-sm">
                  <strong>Cidade/UF:</strong>{" "}
                  {order.shipping_city || order.shipping_state
                    ? `${order.shipping_city || ""}${
                        order.shipping_state
                          ? ` / ${order.shipping_state}`
                          : ""
                      }`
                    : "—"}
                </p>
                <p className="mb-1 text-sm">
                  <strong>CEP:</strong>{" "}
                  {order.shipping_zipcode || "—"}
                </p>
                <p className="mb-3 text-sm">
                  <strong>País:</strong>{" "}
                  {order.shipping_country || "—"}
                </p>

                <h6 className="text-sm text-uppercase text-muted mb-2">
                  Atualizar status
                </h6>
                <select
                  className="form-select form-select-sm mb-2"
                  value={order.status || "pending"}
                  disabled={updating}
                  onChange={(e) => handleChangeStatus(e.target.value)}
                >
                  {STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-muted mb-0">
                  Use esta opção para acompanhar o fluxo do pedido: realizado,
                  enviado, finalizado ou cancelado.
                </p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h6 className="text-sm text-uppercase text-muted mb-3">
                  Itens do pedido
                </h6>
                {items.length === 0 ? (
                  <p className="text-sm text-muted">
                    Nenhum item encontrado para este pedido.
                  </p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th>Produto</th>
                          <th className="text-center" style={{ width: 90 }}>
                            Qtde.
                          </th>
                          <th className="text-end" style={{ width: 140 }}>
                            Valor unitário
                          </th>
                          <th className="text-end" style={{ width: 140 }}>
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((it) => (
                          <tr key={it.id}>
                            <td className="text-sm">{it.title}</td>
                            <td className="text-center text-sm">
                              {it.quantity}
                            </td>
                            <td className="text-end text-sm">
                              {formatMoney(it.unit_price)}
                            </td>
                            <td className="text-end text-sm fw-medium">
                              {formatMoney(it.total_price)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

