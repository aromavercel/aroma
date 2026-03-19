"use client";
import React, { useState } from "react";

import BoughtTogether from "./BoughtTogether";
import { Link } from "react-router-dom";

import ColorSelect1 from "./ColorSelect1";
import SizePicker from "./SizeSelect";
import QuantitySelect from "../common/QuantitySelect";
import StickyProducts from "./StickyProducts";
import ProductHeading from "./ProductHeading";
import { useContextElement } from "@/context/Context";

import Gallery3 from "./gallery/Gallery3";
export default function Details20({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState("Black");
  const {
    addProductToCart,
    isAddedToCartProducts,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    cartProducts,
    updateQuantity,
  } = useContextElement();
  return (
    <section className="flat-single-product">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* Product Images */}
            <div className="col-md-6">
              <Gallery3
                setActiveColor={setActiveColor}
                activeColor={activeColor}
                firstItem={product.imgSrc}
              />
            </div>
            {/* /Product Images */}
            {/* Product Info */}
            <div className="col-md-6">
              <div className="tf-product-info-wrap sticky-top">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-list other-image-zoom">
                  <ProductHeading product={product} />
                  <div className="tf-product-variant">
                    <ColorSelect1
                      setActiveColor={setActiveColor}
                      activeColor={activeColor}
                    />
                    <SizePicker />
                  </div>
                  <div className="tf-product-total-quantity">
                    <div className="group-btn">
                      <QuantitySelect
                        quantity={
                          isAddedToCartProducts(product.id)
                            ? cartProducts.filter(
                                (elm) => elm.id == product.id
                              )[0].quantity
                            : quantity
                        }
                        setQuantity={(qty) => {
                          if (isAddedToCartProducts(product.id)) {
                            updateQuantity(product.id, qty);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        onClick={() => addProductToCart(product.id, quantity)}
                        className="tf-btn hover-primary btn-add-to-cart"
                      >
                        {isAddedToCartProducts(product.id)
                          ? "Already Added"
                          : "Add to cart"}
                      </a>
                    </div>
                    <a
                      href="#"
                      className="tf-btn btn-primary w-100 animate-btn"
                    >
                      Buy it now
                    </a>
                    <Link to={`/checkout`} className="more-choose-payment link">
                      More payment options
                    </Link>
                  </div>
                  <div className="tf-product-extra-link">
                    <a
                      onClick={() => addToWishlist(product.id)}
                      className={`product-extra-icon link btn-add-wishlist ${
                        isAddedtoWishlist(product.id) ? "added-wishlist" : ""
                      } `}
                    >
                      <i className="icon add icon-heart" />
                      <span className="add">Add to wishlist</span>
                      <i className="icon added icon-trash" />
                      <span className="added">Remove from wishlist</span>
                    </a>
                    <a
                      href="#compare"
                      onClick={() => addToCompareItem(product.id)}
                      data-bs-toggle="modal"
                      className="product-extra-icon link"
                    >
                      <i className="icon icon-compare2" />
                      {isAddedtoCompareItem(product.id)
                        ? "Already compared"
                        : "Add to Compare"}
                    </a>
                    <a
                      href="#askQuestion"
                      data-bs-toggle="modal"
                      className="product-extra-icon link"
                    >
                      <i className="icon icon-ask" />
                      Ask a question
                    </a>
                    <a
                      href="#shareSocial"
                      data-bs-toggle="modal"
                      className="product-extra-icon link"
                    >
                      <i className="icon icon-share" />
                      Share
                    </a>
                  </div>
                  <ul className="tf-product-cate-sku text-md">
                    <li className="item-cate-sku">
                      <span className="label">SKU:</span>
                      <span className="value">AD1FSSE0YR</span>
                    </li>
                    <li className="item-cate-sku">
                      <span className="label">Categories:</span>
                      <span className="value">Clothes, Top</span>
                    </li>
                  </ul>

                  <div className="tf-product-trust-seal text-center">
                    <p className="text-md text-dark-2 text-seal fw-medium">
                      Guarantee Safe Checkout:
                    </p>
                    <ul className="list-card">
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/Visa.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/DinersClub.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/Mastercard.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/Stripe.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/PayPal.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/GooglePay.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/ApplePay.png"
                          width={90}
                          height={64}
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="tf-product-delivery-return">
                    <div className="product-delivery">
                      <div className="icon icon-car2" />
                      <p className="text-md">
                        Estimated delivery time:
                        <span className="fw-medium">
                          3-5 days international
                        </span>
                      </p>
                    </div>
                    <div className="product-delivery">
                      <div className="icon icon-shipping3" />
                      <p className="text-md">
                        Free shipping on
                        <span className="fw-medium">all orders over $150</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tf-product-fbt">
                  <div className="title text-xl fw-medium">
                    Frequently Bought Together
                  </div>
                  <BoughtTogether />
                </div>
              </div>
            </div>
            {/* /Product Info */}
          </div>
        </div>
      </div>
      <StickyProducts />
    </section>
  );
}
