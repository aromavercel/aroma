"use client";
import React, { useState } from "react";
import Slider1 from "./sliders/Slider1";

import { useContextElement } from "@/context/Context";
import StickyProducts from "./StickyProducts";

import ProductHeading from "./ProductHeading";
import OutofStockForm from "./OutofStockForm";
export default function Details23({ product }) {
  const [activeColor, setActiveColor] = useState("Black");
  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
  } = useContextElement();
  return (
    <section className="flat-single-product">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* Product Images */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="product-thumbs-slider">
                  <Slider1
                    activeColor={activeColor}
                    firstItem={product.imgSrc}
                    setActiveColor={setActiveColor}
                  />
                </div>
              </div>
            </div>
            {/* /Product Images */}
            {/* Product Info */}
            <div className="col-md-6">
              <div className="tf-zoom-main" />
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-product-info-list other-image-zoom">
                  <ProductHeading
                    inStock={false}
                    showProgress={false}
                    product={product}
                  />
                  <OutofStockForm />

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
                      data-bs-toggle="modal"
                      onClick={() => addToCompareItem(product.id)}
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
