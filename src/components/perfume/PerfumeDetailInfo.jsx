"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import QuantitySelect from "@/components/common/QuantitySelect";
import { useContextElement } from "@/context/Context";

/**
 * Coluna de informações do perfume no estilo Vineta (product-detail):
 * título, preço, variantes, quantidade, adicionar ao carrinho, wishlist, compare, etc.
 */
export default function PerfumeDetailInfo({
  perfume,
  displayData,
  variantsWithPrice = [],
  mainImage,
  onAddToCart,
}) {
  const [quantity, setQuantity] = useState(1);
  const {
    addProductToCart,
    isAddedToCartProducts,
    cartProducts,
    updateQuantity,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    cartLoading,
  } = useContextElement();

  const inWishlist = isAddedtoWishlist(perfume?.id);
  const inCart = isAddedToCartProducts(perfume?.id);
  const cartQty = inCart ? (cartProducts.find((p) => p.id === perfume?.id)?.quantity ?? 1) : quantity;
  const indisponivel = perfume && (!perfume.ativo || perfume.esgotado);

  const handleAddToCart = () => {
    if (!perfume?.id) return;
    const snapshot = {
      id: perfume.id,
      title: displayData.title,
      imgSrc: mainImage || "",
      price: displayData.priceMin ?? 0,
    };
    addProductToCart(perfume.id, inCart ? cartQty : quantity, true, snapshot);
  };

  return (
    <div className="tf-product-info-list other-image-zoom">
      <div className="tf-product-heading">
        {displayData.catalogLabel && (
          <span className="brand-product">{displayData.catalogLabel}</span>
        )}
        <h5 className="product-name fw-medium">{displayData.title}</h5>
        <div className="product-price">
          <div className="display-sm price-new price-on-sale text-primary">
            {displayData.priceShort}
          </div>
        </div>
        <div className="product-stock">
          <span className={`stock ${indisponivel ? "out-of-stock text-danger" : "in-stock"}`}>
            {indisponivel ? "Indisponível" : "Em estoque"}
          </span>
        </div>
      </div>

      {variantsWithPrice.length > 0 && (
        <div className="tf-product-variant">
          <div className="variant-option mb-3">
            <span className="label text-main-2 d-block mb-2">Opções:</span>
            <ul className="list-unstyled text-md mb-0">
              {variantsWithPrice.slice(0, 15).map((v, i) => (
                <li key={i} className="py-1">
                  {v.option0 || "—"} — {v.price_short || ""}
                </li>
              ))}
              {variantsWithPrice.length > 15 && (
                <li className="text-muted">+ {variantsWithPrice.length - 15} opções</li>
              )}
            </ul>
          </div>
        </div>
      )}

      <div className="tf-product-total-quantity">
        <div className="group-btn">
          {!indisponivel && (
            <QuantitySelect
              quantity={cartQty}
              setQuantity={(qty) => {
                if (inCart) updateQuantity(perfume.id, qty);
                else setQuantity(qty);
              }}
            />
          )}
          <a
            href="#shoppingCart"
            data-bs-toggle="offcanvas"
            onClick={(e) => {
              e.preventDefault();
              if (indisponivel) return;
              if (!cartLoading) handleAddToCart();
            }}
            className={`tf-btn hover-primary btn-add-to-cart ${cartLoading || indisponivel ? "disabled" : ""}`}
            aria-disabled={cartLoading || indisponivel}
          >
            {indisponivel ? "Indisponível" : cartLoading ? "..." : inCart ? "No carrinho" : "Adicionar ao carrinho"}
          </a>
        </div>
        {indisponivel ? (
          <span className="tf-btn btn-primary w-100 animate-btn disabled" aria-disabled>
            Comprar agora
          </span>
        ) : (
          <Link to="/checkout" className="tf-btn btn-primary w-100 animate-btn">
            Comprar agora
          </Link>
        )}
      </div>

      <div className="tf-product-extra-link">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            addToWishlist(perfume.id);
          }}
          className={`product-extra-icon link btn-add-wishlist ${inWishlist ? "added-wishlist" : ""}`}
        >
          <i className="icon add icon-heart" />
          <span className="add">Adicionar aos favoritos</span>
          <i className="icon added icon-trash" />
          <span className="added">Remover dos favoritos</span>
        </a>
        {/* <a
          href="#compare"
          data-bs-toggle="modal"
          onClick={() => addToCompareItem(perfume.id)}
          className="product-extra-icon link"
        >
          <i className="icon icon-compare2" />
          {isAddedtoCompareItem(perfume.id) ? "Já comparado" : "Comparar"}
        </a> */}
        <a href="#shareSocial" data-bs-toggle="modal" className="product-extra-icon link">
          <i className="icon icon-share" />
          Compartilhar
        </a>
      </div>

      <ul className="tf-product-cate-sku text-md">
        <li className="item-cate-sku">
          <span className="label">Categoria:</span>
          <span className="value">{displayData.catalogLabel || "Perfume"}</span>
        </li>
      </ul>

      <div className="tf-product-trust-seal text-center">
        <p className="text-md text-dark-2 text-seal fw-medium">Pagamento seguro:</p>
        <ul className="list-card">
          <li className="card-item">
            <img alt="card" src="/images/payment/Visa.png" width={90} height={64} />
          </li>
          <li className="card-item">
            <img alt="card" src="/images/payment/Mastercard.png" width={90} height={64} />
          </li>
          <li className="card-item">
            <img alt="card" src="/images/payment/PayPal.png" width={90} height={64} />
          </li>
        </ul>
      </div>

      <div className="tf-product-delivery-return">
        <div className="product-delivery">
          <div className="icon icon-car2" />
          <p className="text-md">
            Prazo de entrega estimado: <span className="fw-medium">3 a 7 dias úteis</span>
          </p>
        </div>
        <div className="product-delivery">
          <div className="icon icon-shipping3" />
          <p className="text-md">
            Frete grátis em <span className="fw-medium">compras acima de R$ 250</span>
          </p>
        </div>
      </div>
    </div>
  );
}
