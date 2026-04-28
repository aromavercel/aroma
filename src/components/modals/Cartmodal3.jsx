"use client";
import { useContextElement } from "@/context/Context";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import QuantitySelect from "../common/QuantitySelect";

import ProgressBarComponent from "../common/Progressbar";
export default function Cartmodal3() {
  const [openTool, setOpenTool] = useState(-1);
  const {
    cartProducts,
    totalPrice,
    removeFromCart,
    updateQuantity,
  } = useContextElement();

  const removeItem = (id) => {
    removeFromCart(id);
  };

  return (
    <div
      className="modal fullRight fade popup-style-1 popup-shopping-cart style-2"
      id="shoppingCart"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="popup-shopping-cart-main">
            <div className="popup-header">
              <span className="title">Shopping cart</span>
              <span
                className="icon-close icon-close-popup"
                data-bs-dismiss="modal"
              />
            </div>
            <div className="wrap">
              <div className="tf-mini-cart-threshold">
                <div className="text">
                  Spend <span className="fw-medium">$100</span> more to get{" "}
                  <span className="fw-medium">Free Shipping</span>
                </div>
                <div className="tf-progress-bar tf-progress-ship">
                  <ProgressBarComponent max={75}>
                    <i className="icon icon-car" />
                  </ProgressBarComponent>
                </div>
              </div>
              <div className="tf-mini-cart-wrap">
                <div className="tf-mini-cart-main">
                  <div className="tf-mini-cart-sroll">
                    {cartProducts.length ? (
                      <div className="tf-mini-cart-items">
                        {cartProducts.map((product, i) => (
                          <div
                            key={i}
                            className="tf-mini-cart-item file-delete"
                          >
                            <div className="tf-mini-cart-image">
                              <Link to={`/perfume/${product.slug ?? product.id}`}>
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
                                  to={`/perfume/${product.slug ?? product.id}`}
                                >
                                  {product.title}
                                </Link>
                                <i
                                  className="icon icon-close remove fs-12"
                                  onClick={() => removeItem(product.id)}
                                />
                              </div>
                              <div className="d-flex gap-10">
                                <div className="text-xs">White / L</div>
                                <a href="#" className="link edit">
                                  <i className="icon-pen" />
                                </a>
                              </div>
                              <p className="price-wrap text-sm fw-medium">
                                <span className="new-price text-primary">
                                  $
                                  {(product.price * product.quantity).toFixed(
                                    2
                                  )}
                                </span>{" "}
                                {product.oldPrice && (
                                  <span className="old-price text-decoration-line-through text-dark-1">
                                    $
                                    {(
                                      product.oldPrice * product.quantity
                                    ).toFixed(2)}
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
                        ))}
                      </div>
                    ) : (
                      <div className="p-4">
                        Your Cart is empty. Start adding favorite products to
                        cart!{" "}
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
                  <div className="tf-mini-cart-tool">
                    <div
                      className="tf-mini-cart-tool-btn btn-add-gift"
                      onClick={() => setOpenTool((pre) => (pre == 1 ? -1 : 1))}
                    >
                      <i className="icon icon-gift2" />
                      <div className="text-xxs">Add gift wrap</div>
                    </div>
                    <div
                      className="tf-mini-cart-tool-btn btn-add-note"
                      onClick={() => setOpenTool((pre) => (pre == 2 ? -1 : 2))}
                    >
                      <i className="icon icon-note" />
                      <div className="text-xxs">Order note</div>
                    </div>
                    <div
                      className="tf-mini-cart-tool-btn btn-coupon"
                      onClick={() => setOpenTool((pre) => (pre == 3 ? -1 : 3))}
                    >
                      <i className="icon icon-coupon" />
                      <div className="text-xxs">Coupon</div>
                    </div>
                    <div
                      className="tf-mini-cart-tool-btn btn-estimate-shipping"
                      onClick={() => setOpenTool((pre) => (pre == 4 ? -1 : 4))}
                    >
                      <i className="icon icon-car" />
                      <div className="text-xxs">Shipping</div>
                    </div>
                  </div>
                  <div className="tf-mini-cart-bottom-wrap">
                    <div className="tf-cart-totals-discounts">
                      <div className="tf-cart-total text-xl fw-medium">
                        Total:
                      </div>
                      <div className="tf-totals-total-value text-xl fw-medium">
                        ${totalPrice.toFixed(2)} USD
                      </div>
                    </div>
                    <div className="tf-cart-tax text-sm opacity-8">
                      Taxes and shipping calculated at checkout
                    </div>
                    <div className="tf-mini-cart-view-checkout">
                      <Link
                        to="/carrinho-de-compras"
                        className="tf-btn animate-btn d-inline-flex bg-dark-2 w-100 justify-content-center"
                      >
                        View cart
                      </Link>
                      <Link
                        to={`/checkout`}
                        className="tf-btn btn-out-line-dark2 w-100 justify-content-center"
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
                      The product will be wrapped carefully. Free is only
                      <span className="text fw-medium text-dark">$10.00</span>.
                      Do you want a gift wrap?
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
                      Order note
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
                      Add coupon
                    </div>
                    <div className="tf-mini-cart-tool-text1 text-dark-1">
                      * Discount will be calculated and applied at checkout
                    </div>
                    <input type="text" name="text" placeholder="" />
                    <div className="tf-cart-tool-btns">
                      <button
                        className="subscribe-button tf-btn animate-btn d-inline-flex bg-dark-2 w-100"
                        type="submit"
                      >
                        Add a Gift Wrap
                      </button>
                      <div
                        className="tf-btn btn-out-line-dark2 w-100 tf-mini-cart-tool-close"
                        onClick={() => setOpenTool(-1)}
                      >
                        Cancel
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
                  <form
                    id="shipping-form"
                    className="tf-mini-cart-tool-content"
                  >
                    <div className="tf-mini-cart-tool-text text-sm fw-medium">
                      Shipping estimates
                    </div>
                    <div className="field">
                      <p className="text-sm">Country</p>
                      <div className="tf-select">
                        <select
                          className="w-100"
                          id="shipping-country-form"
                          name="address[country]"
                          data-default=""
                        >
                          <option
                            value="Australia"
                            data-provinetas='[["Australian Capital Territory","Australian Capital Territory"],["New South Wales","New South Wales"],["Northern Territory","Northern Territory"],["Queensland","Queensland"],["South Australia","South Australia"],["Tasmania","Tasmania"],["Victoria","Victoria"],["Western Australia","Western Australia"]]'
                          >
                            Australia
                          </option>
                          <option value="Austria" data-provinetas="[]">
                            Austria
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
                      <p>
                        We found one shipping rate available for your address:
                      </p>
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
      </div>
    </div>
  );
}
