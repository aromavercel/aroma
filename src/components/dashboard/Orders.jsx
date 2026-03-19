import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { getMyOrders } from "@/api/orders";

const STATUS_LABELS = {
  pending: "Pedido realizado",
  shipped: "Enviado",
  completed: "Finalizado",
  canceled: "Cancelado",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      setLoading(true);
      setError("");
      try {
        const list = await getMyOrders();
        setOrders(list);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar seus pedidos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  const hasOrders = orders.length > 0;

  return (
    <div className="flat-spacing-13">
      <div className="container-7">
        <div className="btn-sidebar-mb d-lg-none">
          <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
            <i className="icon icon-sidebar" />
          </button>
        </div>

        <div className="main-content-account">
          <div className="sidebar-account-wrap sidebar-content-wrap sticky-top d-lg-block d-none">
            <ul className="my-account-nav">
              <Sidebar />
            </ul>
          </div>
          <div className="my-acount-content account-orders">
            {!loading && !hasOrders && !error && (
              <div className="account-no-orders-wrap">
                <img
                  className="lazyload"
                  data-src="/images/section/account-no-order.png"
                  alt=""
                  src="/images/section/account-no-order.png"
                  width={169}
                  height={168}
                />
                <div className="display-sm fw-medium title">
                  Você ainda não fez nenhum pedido
                </div>
                <div className="text text-sm">
                  Que tal aproveitar para fazer o seu primeiro pedido?
                </div>
                <Link
                  to={`/catalogo`}
                  className="tf-btn animate-btn d-inline-flex bg-dark-2 justify-content-center"
                >
                  Ver catálogo
                </Link>
              </div>
            )}

            {loading && (
              <div className="text-sm mb-3">Carregando seus pedidos...</div>
            )}

            {error && (
              <div className="alert alert-danger text-sm mb-3" role="alert">
                {error}
              </div>
            )}

            {hasOrders && (
              <div className="account-orders-wrap">
                <h5 className="title">Histórico de pedidos</h5>
                <div className="wrap-account-order">
                  <table>
                    <thead>
                      <tr>
                        <th className="text-md fw-medium">Pedido</th>
                        <th className="text-md fw-medium">Data</th>
                        <th className="text-md fw-medium">Status</th>
                        <th className="text-md fw-medium">Total</th>
                        <th className="text-md fw-medium text-end">Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => {
                        const status = STATUS_LABELS[o.status] || "—";
                        const created = o.created_at
                          ? new Date(o.created_at)
                          : null;
                        const dateStr = created
                          ? created.toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })
                          : "—";
                        const total = typeof o.total === "number" ? o.total : Number(o.total || 0);
                        const totalStr = `R$ ${total.toFixed(2).replace(".", ",")}`;
                        const statusKey = o.status || "pending";
                        return (
                          <tr className="tf-order-item" key={o.id}>
                            <td className="text-md">#{o.id}</td>
                            <td className="text-md">{dateStr}</td>
                            <td className="text-md">
                              <span
                                className={`badge text-uppercase status-${statusKey} ${
                                  statusKey === "pending" ? "text-dark" : ""
                                }`}
                              >
                                {status}
                              </span>
                            </td>
                            <td className="text-md">{totalStr}</td>
                            <td className="text-md text-end">
                              <Link
                                to={`/account-orders/${o.id}`}
                                className="text-sm text-decoration-underline link"
                              >
                                Ver detalhes
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
