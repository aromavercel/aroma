import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import { createOrder } from "@/api/orders";

import CountdownTimer from "../common/Countdown";

export default function Account() {
  const { user, wishList } = useContextElement();
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    // No futuro podemos trocar para um endpoint dedicado de "meus pedidos".
    // Por enquanto, apenas não exibimos contagem se o backend não suportar.
    async function loadOrdersCount() {
      try {
        const res = await fetch("/api/my-orders", {
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data)) {
          setOrdersCount(data.length);
        } else if (Array.isArray(data.orders)) {
          setOrdersCount(data.orders.length);
        }
      } catch {
        // Silencia erros - página continua funcionando.
      }
    }
    loadOrdersCount();
  }, []);

  const firstName =
    (user?.name || "")
      .split(" ")
      .filter(Boolean)
      .at(0) || "cliente";

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
          <div className="my-acount-content account-dashboard">
            <div className="box-account-title">
              <p className="hello-name display-sm fw-medium">
                Olá, {firstName}!
              </p>
              <p className="notice text-sm">
                Aqui você acompanha o histórico dos seus pedidos, seus
                endereços de entrega e sua lista de desejos.
              </p>
            </div>
            <div className="content-account">
              <ul className="box-check-list flex-sm-nowrap">
                <li>
                  <Link
                    to={`/account-orders`}
                    className="box-check text-center"
                  >
                    <div className="icon">
                      <i className="icon-order" />
                      <span className="count-number text-sm text-white fw-medium">
                        {ordersCount}
                      </span>
                    </div>
                    <div className="text">
                      <div className="link name-type text-xl fw-medium">
                        Pedidos
                      </div>
                      <p className="sub-type text-sm">
                        Veja o histórico de todos os seus pedidos
                      </p>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to={`/wish-list`} className="box-check text-center">
                    <div className="icon">
                      <i className="icon-heart" />
                      <span className="count-number text-sm text-white fw-medium">
                        {wishList.length}
                      </span>
                    </div>
                    <div className="text">
                      <div className="link name-type text-xl fw-medium">
                        Lista de desejos
                      </div>
                      <p className="sub-type text-sm">
                        Acompanhe os perfumes que você salvou
                      </p>
                    </div>
                  </Link>
                </li>
              </ul>
              <div className="banner-account">
                <div className="image">
                  <img
                    src="/images/banner/account-1.jpg"
                    alt=""
                    className="lazyload"
                    width={912}
                    height={280}
                  />
                </div>
                <div className="banner-content-right">
                  <div className="banner-title">
                    <p className="display-md fw-medium">Frete especial</p>
                    <p className="text-md">
                      Condições diferenciadas para clientes cadastrados.
                    </p>
                  </div>
                  <div className="banner-btn">
                    <Link to={`/catalogo`} className="tf-btn animate-btn">
                      Ver catálogo
                    </Link>
                  </div>
                </div>
              </div>
              <div className="banner-account banner-acc-countdown bg-linear d-flex align-items-center">
                <div className="banner-content-left">
                  <div className="banner-title">
                    <p className="sub text-md fw-medium">OFERTAS DA SEMANA</p>
                    <p className="display-xl fw-medium">Descontos especiais</p>
                    <p className="sub text-md fw-medium">
                      Aproveite antes que o tempo acabe
                    </p>
                  </div>
                  <div className="banner-btn">
                    <Link
                      to={`/catalogo`}
                      className="tf-btn btn-white animate-btn animate-dark"
                    >
                      Ver perfumes
                    </Link>
                  </div>
                </div>
                <div className="banner-countdown">
                  <div className="wg-countdown-2">
                    <span className="js-countdown">
                      <CountdownTimer style={2} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
