"use client";
import { useContextElement } from "@/context/Context";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import QuantitySelect from "../common/QuantitySelect";
import Skeleton from "@/components/common/Skeleton";

export default function CartModal() {
  const [openTool, setOpenTool] = useState(-1);
  const {
    cartProducts,
    totalPrice,
    addProductToCart,
    isAddedToCartProducts,
    updateQuantity,
    removeFromCart,
    cartLoading,
  } = useContextElement();

  const hasItems = cartProducts.length > 0;

  const removeItem = (id) => {
    removeFromCart(id);
  };

  return (
    <div
      className="offcanvas offcanvas-end popup-style-1 popup-shopping-cart"
      id="shoppingCart"
    >
      <div className="canvas-wrapper">
        <div className="popup-header">
          <span className="title">Carrinho de compras</span>
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
          />
        </div>
        <div className="wrap">
          <div className="tf-mini-cart-threshold">
            <div className="text">
              Gaste <span className="fw-medium">R$250,00</span> ou mais para ganhar 
              <span className="fw-medium"> Frete Grátis</span>
            </div>
            <div className="tf-progress-bar tf-progress-ship">
              <div
                className="value"
                style={{ width: `${Math.min(100, Math.max(0, ((Number(totalPrice) || 0) / 250) * 100))}%` }}
              >
                <i className="icon icon-car" />
              </div>
            </div>
          </div>
          <div className="tf-mini-cart-wrap">
            <div className="tf-mini-cart-main">
              <div className="tf-mini-cart-sroll">
                {cartLoading && !cartProducts.length ? (
                  <div className="p-4">
                    <div className="d-grid gap-3">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={`cart-skel-${i}`} className="d-flex gap-3 align-items-start">
                          <Skeleton style={{ width: 64, height: 86, borderRadius: 10 }} />
                          <div className="flex-grow-1">
                            <Skeleton variant="text" style={{ width: "70%", height: 14, marginBottom: 10 }} />
                            <Skeleton variant="text" style={{ width: "45%", height: 12, marginBottom: 12 }} />
                            <Skeleton style={{ width: 120, height: 34, borderRadius: 999 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : cartProducts.length ? (
                  <div className="tf-mini-cart-items">
                    {cartProducts.map((product, i) => {
                      const perfumePageId = product.perfume_id ?? product.id;
                      return (
                      <div key={String(product.id ?? i)} className="tf-mini-cart-item file-delete">
                        <div className="tf-mini-cart-image">
                          <Link to={`/perfume/${perfumePageId}`}>
                            <img
                              className="lazyload"
                              alt="img-product"
                              src={product.imgSrc}
                              width={190}
                              height={252}
                            />
                          </Link>
                        </div>
                        <div className="tf-mini-cart-info">
                          <div className="d-flex justify-content-between">
                            <Link
                              className="title link text-md fw-medium"
                              to={`/perfume/${perfumePageId}`}
                            >
                              {product.title}
                            </Link>
                            <i
                              className="icon icon-close remove fs-12"
                              onClick={() => removeItem(product.id)}
                            />
                          </div>
                          <div className="d-flex gap-10">
                            <div className="text-xs">{product.priceShort || ""}</div>
                            <a href="#" className="link edit">
                              <i className="icon-pen" />
                            </a>
                          </div>
                          <p className="price-wrap text-sm fw-medium">
                            <span className="new-price text-primary">
                              {product.priceShort || `R$ ${((Number(product.price) || 0) * product.quantity).toFixed(2)}`}
                            </span>
                            {Number(product.oldPrice) > 0 && (
                              <span className="old-price text-decoration-line-through text-dark-1 ms-1">
                                R$ {((Number(product.oldPrice) || 0) * product.quantity).toFixed(2)}
                              </span>
                            )}
                          </p>
                          <QuantitySelect
                            styleClass="small"
                            quantity={product.quantity}
                            setQuantity={(qty) => {
                              updateQuantity(product.id, qty);
                            }}
                          />
                        </div>
                      </div>
                    );
                    })}
                  </div>
                ) : (
                  <div className="p-4">
                    Seu carrinho está vazio. Adicione perfumes do catálogo!{" "}
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
            <div className="tf-mini-cart-bottom">
              <div className="tf-mini-cart-bottom-wrap">
                <div className="tf-cart-totals-discounts">
                  <div className="tf-cart-total text-xl fw-medium">Total:</div>
                  <div className="tf-totals-total-value text-xl fw-medium">
                    R$ {totalPrice.toFixed(2)}
                  </div>
                </div>
                <div className="tf-cart-tax text-sm opacity-8">
                  Taxas e entrega calculadas no checkout
                </div>
                <div className="tf-mini-cart-view-checkout">
                  <Link
                    to="/carrinho-de-compras"
                    className="tf-btn animate-btn d-inline-flex bg-dark-2 w-100 justify-content-center"
                  >
                    Ver carrinho
                  </Link>
                  <Link
                    to={`/checkout`}
                    className={`tf-btn btn-out-line-dark2 w-100 justify-content-center ${hasItems ? "" : "disabled"}`}
                    aria-disabled={!hasItems}
                    tabIndex={hasItems ? 0 : -1}
                    onClick={(e) => {
                      if (!hasItems) {
                        e.preventDefault();
                        e.stopPropagation();
                      }
                    }}
                  >
                    <span>Check out</span>
                  </Link>
                </div>
              </div>
            </div>
            <div
              className={`tf-mini-cart-tool-openable add-gift ${
                openTool == 1 ? "open" : ""
              }`}
            >
              <div
                className="overplay tf-mini-cart-tool-close"
                onClick={() => setOpenTool(-1)}
              />
              <form action="#" className="tf-mini-cart-tool-content">
                <div className="tf-mini-cart-tool-text text-sm fw-medium">
                  Add gift wrap
                </div>
                <div className="tf-mini-cart-tool-text1 text-dark-1">
                  O produto será embalado com cuidado. O papel de presente é apenas
                  <span className="text fw-medium text-dark"> $10.00</span>. 
                  Você quer um papel de presente?
                </div>
                <div className="tf-cart-tool-btns">
                  <button
                    className="subscribe-button tf-btn animate-btn d-inline-flex bg-dark-2 w-100"
                    type="submit"
                  >
                    Save
                  </button>
                  <div
                    className="tf-btn btn-out-line-dark2 w-100 tf-mini-cart-tool-close"
                    onClick={() => setOpenTool(-1)}
                  >
                    Close
                  </div>
                </div>
              </form>
            </div>
            <div
              className={`tf-mini-cart-tool-openable add-note  ${
                openTool == 2 ? "open" : ""
              }`}
            >
              <div
                className="overplay tf-mini-cart-tool-close"
                onClick={() => setOpenTool(-1)}
              />
              <form action="#" className="tf-mini-cart-tool-content">
                <label
                  htmlFor="Cart-note"
                  className="tf-mini-cart-tool-text text-sm fw-medium"
                >
                  Pedir nota fiscal
                </label>
                <textarea
                  name="note"
                  id="Cart-note"
                  placeholder="Instruction for seller..."
                  defaultValue={""}
                />
                <div className="tf-cart-tool-btns">
                  <button
                    className="subscribe-button tf-btn animate-btn d-inline-flex bg-dark-2 w-100"
                    type="submit"
                  >
                    Save
                  </button>
                  <div
                    className="tf-btn btn-out-line-dark2 w-100 tf-mini-cart-tool-close"
                    onClick={() => setOpenTool(-1)}
                  >
                    Close
                  </div>
                </div>
              </form>
            </div>
            <div
              className={`tf-mini-cart-tool-openable coupon  ${
                openTool == 3 ? "open" : ""
              }`}
            >
              <div
                className="overplay tf-mini-cart-tool-close"
                onClick={() => setOpenTool(-1)}
              />
              <form action="#" className="tf-mini-cart-tool-content">
                <div className="tf-mini-cart-tool-text text-sm fw-medium">
                  Adicionar cupom de desconto
                </div>
                <div className="tf-mini-cart-tool-text1 text-dark-1">
                  * O desconto será calculado e aplicado no checkout
                </div>
                <input type="text" name="text" placeholder="" />
                <div className="tf-cart-tool-btns">
                  <button
                    className="subscribe-button tf-btn animate-btn d-inline-flex bg-dark-2 w-100"
                    type="submit"
                  >
                    Adicionar papel de presente
                  </button>
                  <div
                    className="tf-btn btn-out-line-dark2 w-100 tf-mini-cart-tool-close"
                    onClick={() => setOpenTool(-1)}
                  >
                    Cancelar
                  </div>
                </div>
              </form>
            </div>
            <div
              className={`tf-mini-cart-tool-openable estimate-shipping  ${
                openTool == 4 ? "open" : ""
              }`}
            >
              <div
                className="overplay tf-mini-cart-tool-close"
                onClick={() => setOpenTool(-1)}
              />
              <form id="shipping-form" className="tf-mini-cart-tool-content">
                <div className="tf-mini-cart-tool-text text-sm fw-medium">
                  Estimativa de entrega
                </div>
                <div className="field">
                  <p className="text-sm">País</p>
                  <div className="tf-select">
                    <select
                      className="w-100"
                      id="shipping-country-form"
                      name="address[country]"
                      data-default=""
                    >
                      <option
                        value="Brasil"
                        data-provinetas='[["Australian Capital Territory","Australian Capital Territory"],["New South Wales","New South Wales"],["Northern Territory","Northern Territory"],["Queensland","Queensland"],["South Australia","South Australia"],["Tasmania","Tasmania"],["Victoria","Victoria"],["Western Australia","Western Australia"]]'
                      >
                        Brasil
                      </option>
                      <option value="Brasil" data-provinetas="[]">
                        Argentina
                      </option>
                      <option value="Belgium" data-provinetas="[]">
                        Belgium
                      </option>
                      <option
                        value="Canada"
                        data-provinetas='[["Ontario","Ontario"],["Quebec","Quebec"]]'
                      >
                        Canada
                      </option>
                      <option value="Czech Republic" data-provinetas="[]">
                        Czechia
                      </option>
                      <option value="Denmark" data-provinetas="[]">
                        Denmark
                      </option>
                      <option value="Finland" data-provinetas="[]">
                        Finland
                      </option>
                      <option value="France" data-provinetas="[]">
                        France
                      </option>
                      <option value="Germany" data-provinetas="[]">
                        Germany
                      </option>
                      <option
                        value="United States"
                        data-provinetas='[["Alabama","Alabama"],["California","California"],["Florida","Florida"]]'
                      >
                        United States
                      </option>
                      <option
                        value="United Kingdom"
                        data-provinetas='[["England","England"],["Scotland","Scotland"],["Wales","Wales"],["Northern Ireland","Northern Ireland"]]'
                      >
                        United Kingdom
                      </option>
                      <option value="India" data-provinetas="[]">
                        India
                      </option>
                      <option value="Japan" data-provinetas="[]">
                        Japan
                      </option>
                      <option value="Mexico" data-provinetas="[]">
                        Mexico
                      </option>
                      <option value="South Korea" data-provinetas="[]">
                        South Korea
                      </option>
                      <option value="Spain" data-provinetas="[]">
                        Spain
                      </option>
                      <option value="Italy" data-provinetas="[]">
                        Italy
                      </option>
                      <option
                        value="Vietnam"
                        data-provinetas='[["Ha Noi","Ha Noi"],["Da Nang","Da Nang"],["Ho Chi Minh","Ho Chi Minh"]]'
                      >
                        Vietnam
                      </option>
                    </select>
                  </div>
                </div>
                <div className="field">
                  <p className="text-sm">State/Provineta</p>
                  <div className="tf-select">
                    <select
                      id="shipping-provineta-form"
                      name="address[provineta]"
                      data-default=""
                    />
                  </div>
                </div>
                <div className="field">
                  <p className="text-sm">Zipcode</p>
                  <input
                    type="text"
                    data-opend-focus=""
                    id="zipcode"
                    name="address[zip]"
                    defaultValue=""
                  />
                </div>
                <div
                  id="zipcode-message"
                  className="error"
                  style={{ display: "none" }}
                >
                  We found one shipping rate available for undefined.
                </div>
                <div
                  id="zipcode-success"
                  className="success"
                  style={{ display: "none" }}
                >
                  <p>We found one shipping rate available for your address:</p>
                  <p className="standard">
                    Standard at <span>$0.00</span> USD
                  </p>
                </div>
                <div className="tf-cart-tool-btns">
                  <button
                    className="subscribe-button tf-btn animate-btn d-inline-flex bg-dark-2 w-100"
                    type="submit"
                  >
                    Save
                  </button>
                  <div
                    className="tf-mini-cart-tool-primary text-center fw-6 w-100 tf-mini-cart-tool-close"
                    onClick={() => setOpenTool(-1)}
                  >
                    Cancel
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
