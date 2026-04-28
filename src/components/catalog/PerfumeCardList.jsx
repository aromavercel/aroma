"use client";

import React from "react";
import { Link } from "react-router-dom";
import { getPerfumeDisplayData } from "@/data/perfumes";
import { useContextElement } from "@/context/Context";

/**
 * Card de perfume em layout de lista (estilo Vineta): imagem à esquerda,
 * informações e botões (Adicionar ao carrinho, Favoritos, Compare) à direita.
 */
export default function PerfumeCardList({ perfume, className = "" }) {
  const {
    addProductToCart,
    isAddedToCartProducts,
    cartLoading,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();
  const d = getPerfumeDisplayData(perfume);
  const perfumeUrl = perfume?.slug
    ? `/perfume/${perfume.slug}`
    : perfume?.id
      ? `/perfume/${perfume.id}`
      : "/catalogo";

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!perfume?.id) return;
    const snapshot = {
      id: perfume.id,
      slug: perfume.slug,
      title: d.title,
      imgSrc: d.imageUrl ?? "",
      price: d.priceMin ?? 0,
    };
    addProductToCart(perfume.id, 1, true, snapshot);
  };

  return (
    <div className={`card-product style-list ${className}`}>
      <div className="card-product-wrapper">
        <Link to={perfumeUrl} className="product-img">
          {d.imageUrl ? (
            <>
              <img
                className="img-product lazyload"
                alt={d.title}
                src={d.imageUrl}
                width={684}
                height={972}
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <img
                className="img-hover lazyload"
                alt=""
                src={d.imageUrl}
                width={684}
                height={972}
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
        </Link>
        {d.catalogLabel && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">{d.catalogLabel}</span>
          </div>
        )}
      </div>
      <div className="card-product-info">
        <div className="info-list">
          <Link
            to={perfumeUrl}
            className="name-product link fw-medium text-md"
          >
            {d.title}
          </Link>
          <p className="price-wrap fw-medium text-md">
            <span className="price-new text-primary">{d.priceShort}</span>
          </p>
          {d.description && (
            <p className="decs text-sm text-main text-line-clamp-2">
              {d.description}
            </p>
          )}
        </div>
        <div className="list-product-btn">
          <a
            href="#shoppingCart"
            data-bs-toggle="offcanvas"
            onClick={handleAddToCart}
            className="tf-btn btn-main-product animate-btn"
          >
            {isAddedToCartProducts(perfume.id)
              ? "No carrinho"
              : "Adicionar ao carrinho"}
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              addToWishlist(perfume.id, perfume);
            }}
            className="box-icon wishlist hover-tooltip"
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
          <a
            href="#compare"
            data-bs-toggle="modal"
            onClick={(e) => {
              e.preventDefault();
              addToCompareItem(perfume.id);
            }}
            aria-controls="compare"
            className="box-icon compare hover-tooltip"
            aria-label="Comparar"
          >
            <span className="icon icon-compare3" />
            <span className="tooltip">
              {isAddedtoCompareItem(perfume.id)
                ? "Já adicionado à comparação"
                : "Adicionar à comparação"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
