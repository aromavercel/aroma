import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";
import { getMyOrder } from "@/api/orders";

const STATUS_LABELS = {
  pending: "Pedido realizado",
  confirmed: "Pedido confirmado",
  shipped: "Enviado",
  completed: "Finalizado",
  canceled: "Cancelado",
};

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

const metadata = {
  title: "Detalhes do pedido || Aroma Expresso",
  description: "Veja os detalhes do seu pedido na Aroma Expresso.",
};

export default function AccountOrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getMyOrder(id)
      .then((data) => {
        setOrder(data?.order || null);
        setItems(data?.items || []);
      })
      .catch((err) =>
        setError(err.message || "Erro ao carregar pedido"),
      )
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Pedidos" pageTitle="Detalhes do pedido" />

      <div className="flat-spacing-13">
        <div className="container-7">
          <div className="account-dashboard">
            <button
              type="button"
              className="btn btn-link text-sm px-0 mb-3"
              onClick={() => navigate("/account-orders")}
            >
              ← Voltar para meus pedidos
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
                          className={`badge ${getStatusBadgeClass(
                            order.status,
                          )}`}
                        >
                          {STATUS_LABELS[order.status] ||
                            order.status ||
                            "—"}
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
                        <strong>Frete:</strong>{" "}
                        {formatMoney(order.shipping)}
                      </p>
                      <p className="mb-3 text-sm">
                        <strong>Imposto:</strong>{" "}
                        {formatMoney(order.tax)}
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
                        Entrega
                      </h6>
                      <p className="mb-1 text-sm">
                        <strong>Nome:</strong>{" "}
                        {order.shipping_name || "—"}
                      </p>
                      <p className="mb-1 text-sm">
                        <strong>Telefone:</strong>{" "}
                        {order.shipping_phone || "—"}
                      </p>
                      <p className="mb-1 text-sm">
                        <strong>Endereço:</strong>{" "}
                        {[order.shipping_address, order.shipping_street_number].filter(Boolean).join(", ") || "—"}
                      </p>
                      <p className="mb-1 text-sm">
                        <strong>Complemento:</strong>{" "}
                        {order.shipping_complement || "—"}
                      </p>
                      {order.shipping_delivery_instructions ? (
                        <p className="mb-1 text-sm">
                          <strong>Instruções ao entregador:</strong>{" "}
                          {order.shipping_delivery_instructions}
                        </p>
                      ) : null}
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

                      <p className="text-sm text-muted mb-0">
                        O pagamento será realizado na entrega, conforme
                        combinado com a equipe Aroma.
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
                                <th
                                  className="text-center"
                                  style={{ width: 90 }}
                                >
                                  Qtde.
                                </th>
                                <th
                                  className="text-end"
                                  style={{ width: 140 }}
                                >
                                  Valor unitário
                                </th>
                                <th
                                  className="text-end"
                                  style={{ width: 140 }}
                                >
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
        </div>
      </div>

      <Footer1 />
    </>
  );
}

