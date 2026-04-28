"use client";
import { useContextElement } from "@/context/Context";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PerfumeCard from "@/components/catalog/PerfumeCard";
import Sidebar from "@/components/dashboard/Sidebar";

export default function Wishlist() {
  const { user, wishListItems, wishListLoading, removeFromWishlist } = useContextElement();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(Array.isArray(wishListItems) ? wishListItems : []);
  }, [wishListItems]);

  const guestHydrating =
    !user?.id &&
    items.some((p) => p?.id && !String(p?.title || "").trim());

  return (
    <div className="flat-spacing-13">
      <div className="container-7">
        {user?.id && (
          <div className="btn-sidebar-mb d-lg-none">
            <button
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#mbAccount"
              aria-label="Abrir menu da conta"
            >
              <i className="icon icon-sidebar" />
            </button>
          </div>
        )}

        <div className="main-content-account">
          {user?.id && (
            <div className="sidebar-account-wrap sidebar-content-wrap sticky-top d-lg-block d-none">
              <ul className="my-account-nav">
                <Sidebar />
              </ul>
            </div>
          )}
          <div className="my-acount-content account-wishlist">
            {user?.id && wishListLoading ? (
              <div className="text-muted py-4">Carregando lista de desejos…</div>
            ) : guestHydrating ? (
              <div className="text-muted py-4">Carregando perfumes da lista…</div>
            ) : items.length ? (
              <div
                className="wrapper-shop tf-grid-layout tf-col-2 lg-col-3 xl-col-4 style-1"
                id="gridLayout"
              >
                {items.map((perfume, i) => (
                  <div key={perfume.id ?? `w-${i}`}>
                    <PerfumeCard perfume={perfume} />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger w-100 mt-2"
                      onClick={() => removeFromWishlist(perfume.id)}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="account-no-orders-wrap text-start">
                <div className="display-sm fw-medium title mb-2">
                  Sua lista de desejos está vazia
                </div>
                <p className="text text-sm mb-3">
                  Adicione perfumes do catálogo para vê-los aqui.
                </p>
                <Link
                  className="tf-btn animate-btn d-inline-flex bg-dark-2 justify-content-center"
                  to="/catalogo"
                >
                  Ver catálogo
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
