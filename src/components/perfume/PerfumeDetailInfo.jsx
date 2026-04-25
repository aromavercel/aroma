"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [buyNowLoading, setBuyNowLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState(() => {
    const first = variantsWithPrice?.[0];
    return typeof first?.option0 === "string" ? first.option0 : "";
  });
  const {
    addProductToCart,
    cartProducts,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    isAddedtoWishlist,
    wishListLoading,
    addToCompareItem,
    isAddedtoCompareItem,
    cartLoading,
  } = useContextElement();

  const inWishlist = isAddedtoWishlist(perfume?.id);
  const cartItemForSelection = cartProducts.find(
    (p) =>
      String(p.perfume_id) === String(perfume?.id) &&
      String(p.variant_option || "") === String(selectedOption || ""),
  );
  const inCart = Boolean(cartItemForSelection);
  const cartQty = inCart ? (cartItemForSelection?.quantity ?? 1) : quantity;
  const indisponivel = perfume && (!perfume.ativo || perfume.esgotado);

  const selectedVariant =
    variantsWithPrice.find((v) => String(v?.option0 || "") === String(selectedOption || "")) ||
    variantsWithPrice[0] ||
    null;

  const displayPriceShort = selectedVariant?.price_short || displayData.priceShort;
  const displayPriceNumber =
    selectedVariant?.price_number != null ? Number(selectedVariant.price_number) : displayData.priceMin ?? 0;

  const buildSnapshot = () => ({
    id: `${perfume.id}:${selectedOption || ""}`,
    perfume_id: perfume.id,
    variant_option: selectedOption || null,
    title: selectedOption ? `${displayData.title} (${selectedOption})` : displayData.title,
    imgSrc: mainImage || "",
    price: displayPriceNumber ?? 0,
  });

  const handleAddToCart = () => {
    if (!perfume?.id) return;
    addProductToCart(perfume.id, inCart ? cartQty : quantity, true, buildSnapshot(), selectedVariant);
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();
    if (indisponivel || !perfume?.id) return;
    if (cartLoading || buyNowLoading) return;
    setBuyNowLoading(true);
    try {
      if (inCart) {
        navigate("/checkout");
        return;
      }
      await addProductToCart(perfume.id, quantity, false, buildSnapshot(), selectedVariant);
      navigate("/checkout");
    } catch (err) {
      console.error("Comprar agora:", err);
    } finally {
      setBuyNowLoading(false);
    }
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
            {displayPriceShort}
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
            <select
              className="form-select"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                setQuantity(1);
              }}
            >
              {variantsWithPrice.slice(0, 40).map((v, i) => (
                <option key={`${v.option0 || i}`} value={v.option0 || ""}>
                  {(v.option0 || "Opção")} {v.price_short ? `— ${v.price_short}` : ""}
                </option>
              ))}
            </select>
            {variantsWithPrice.length > 40 && (
              <div className="text-sm text-muted mt-2">
                + {variantsWithPrice.length - 40} opções (edite no painel)
              </div>
            )}
          </div>
        </div>
      )}

      <div className="tf-product-total-quantity">
        <div className="group-btn">
          {!indisponivel && (
            <QuantitySelect
              quantity={cartQty}
              setQuantity={(qty) => {
                if (inCart) updateQuantity(cartItemForSelection.id, qty);
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
            {indisponivel
              ? "Indisponível"
              : inCart
                ? "No carrinho"
                : cartLoading
                  ? "..."
                  : "Adicionar ao carrinho"}
          </a>
        </div>
        {indisponivel ? (
          <span className="tf-btn btn-primary w-100 animate-btn disabled" aria-disabled>
            Comprar agora
          </span>
        ) : (
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={cartLoading || buyNowLoading}
            className="tf-btn btn-primary w-100 animate-btn"
          >
            {buyNowLoading ? "..." : "Comprar agora"}
          </button>
        )}
      </div>

      <div className="tf-product-extra-link">
        <button
          type="button"
          disabled={wishListLoading || !perfume?.id}
          onClick={() => {
            if (!perfume?.id || wishListLoading) return;
            if (inWishlist) removeFromWishlist(perfume.id);
            else addToWishlist(perfume.id, perfume);
          }}
          className={`product-extra-icon link btn-add-wishlist ${inWishlist ? "added-wishlist" : ""}`}
        >
          <i className="icon add icon-heart" />
          <span className="add">Adicionar aos favoritos</span>
          <i className="icon added icon-trash" />
          <span className="added">Remover dos favoritos</span>
        </button>
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
