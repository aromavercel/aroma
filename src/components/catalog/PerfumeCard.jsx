"use client";

import React from "react";
import { Link } from "react-router-dom";
import { getPerfumeDisplayData } from "@/data/perfumes";
import { useContextElement } from "@/context/Context";

/**
 * Card de um perfume para o catálogo no estilo Vineta (shop-left-sidebar).
 * Ícones de ação no hover: carrinho, favoritos, ver detalhes.
 * Redireciona para /perfume/:id.
 */
export default function PerfumeCard({
  perfume,
  className = "",
  onSelect,
  tooltipDirection = "left",
}) {
  const {
    addProductToCart,
    isAddedToCartProducts,
    cartLoading,
    addToWishlist,
    isAddedtoWishlist,
  } = useContextElement();
  const d = getPerfumeDisplayData(perfume);
  const perfumeUrl = perfume?.id ? `/perfume/${perfume.id}` : "/catalogo";

  const handleClick = (e) => {
    if (onSelect) {
      e.preventDefault();
      onSelect(perfume);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!perfume?.id) return;
    const snapshot = {
      id: perfume.id,
      title: d.title,
      imgSrc: d.imageUrl ?? "",
      price: d.priceMin ?? 0,
    };
    addProductToCart(perfume.id, 1, true, snapshot);
  };

  const Wrapper = onSelect ? "a" : Link;
  const wrapperProps = onSelect
    ? { href: "#", onClick: handleClick }
    : { to: perfumeUrl };

  return (
    <div className={`card-product grid style-1 ${className}`}>
      <div className="card-product-wrapper">
        <Wrapper className="product-img" {...wrapperProps}>
          {d.imageUrl ? (
            <>
              <img
                className="img-product lazyload"
                alt={d.title}
                src={d.imageUrl}
                width={513}
                height={729}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <img
                className="img-hover lazyload"
                alt=""
                src={d.imageUrl}
                width={513}
                height={729}
                aria-hidden
                referrerPolicy="no-referrer"
              />
            </>
          ) : (
            <div
              className="img-product d-flex align-items-center justify-content-center bg-light"
              style={{ width: "100%", aspectRatio: "1", minHeight: 200 }}
            >
              <span
                className="icon icon-user text-muted"
                style={{ fontSize: "3rem" }}
              />
            </div>
          )}
        </Wrapper>
        {d.catalogLabel && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">{d.catalogLabel}</span>
          </div>
        )}
        <ul className="list-product-btn">
          <li>
            <a
              href="#shoppingCart"
              data-bs-toggle="offcanvas"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(e);
              }}
              className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
              aria-label="Adicionar ao carrinho"
            >
              <span className="icon icon-cart2" />
              <span className="tooltip">
                {isAddedToCartProducts(perfume.id)
                  ? "No carrinho"
                  : "Adicionar ao carrinho"}
              </span>
            </a>
          </li>
          <li
            className={`wishlist ${
              isAddedtoWishlist(perfume.id) ? "addwishlist" : ""
            }`}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToWishlist(perfume.id);
              }}
              className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
              aria-label="Lista de desejos"
            >
              <span
                className={`icon ${
                  isAddedtoWishlist(perfume.id) ? "icon-trash" : "icon-heart2"
                }`}
              />
              <span className="tooltip">
                {isAddedtoWishlist(perfume.id)
                  ? "Remover dos favoritos"
                  : "Adicionar aos favoritos"}
              </span>
            </a>
          </li>
          <li>
            <Link
              to={perfumeUrl}
              className={`hover-tooltip tooltip-${tooltipDirection} box-icon quickview`}
              aria-label="Ver detalhes"
            >
              <span className="icon icon-view" />
              <span className="tooltip">Ver detalhes</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="card-product-info">
        <Link
          to={perfumeUrl}
          className="name-product link fw-medium text-md"
        >
          {d.title}
        </Link>
        <p className="price-wrap fw-medium">
          <span className="price-new text-primary">{d.priceShort}</span>
        </p>
      </div>
    </div>
  );
}
