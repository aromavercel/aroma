"use client";
import { useContextElement } from "@/context/Context";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PerfumeCard from "@/components/catalog/PerfumeCard";

export default function Wishlist() {
  const { user, wishListItems, wishListLoading, removeFromWishlist } = useContextElement();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(Array.isArray(wishListItems) ? wishListItems : []);
  }, [wishListItems]);
  return (
    <section className="s-account flat-spacing-4 pt_0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            {!user ? (
              <div className="p-4 rounded bg-light">
                <div className="mb-2">Faça login para ver sua lista de desejos.</div>
                <Link className="tf-btn btn-dark2 animate-btn mt-2" to="/catalogo">
                  Ver catálogo
                </Link>
              </div>
            ) : wishListLoading ? (
              <div className="text-muted py-4">Carregando lista de desejos…</div>
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
              <div className="">
                <div>
                  Sua lista de desejos está vazia. Adicione perfumes do catálogo!
                </div>{" "}
                <Link
                  className="tf-btn btn-dark2 animate-btn mt-3"
                  to="/catalogo"
                >
                  Ver catálogo
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
