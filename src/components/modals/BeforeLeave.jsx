"use client";
import { useContextElement } from "@/context/Context";
import { products1 } from "@/data/products";

import { Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";

export default function BeforeLeave() {
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  const modalElement = useRef();
  useEffect(() => {
    const showModal = async () => {
      const bootstrap = await import("bootstrap"); // dynamically import bootstrap
      const myModal = new bootstrap.Modal(
        document.getElementById("BeforeLeave"),
        {
          keyboard: false,
        }
      );

      // Show the modal after a delay using a promise
      await new Promise((resolve) => setTimeout(resolve, 2000));
      myModal.show();

      modalElement.current?.addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
    };

    showModal();
  }, []);
  return (
    <div
      className="modal fullRight fade modal-before-you-leave auto-popup"
      id="BeforeLeave"
      ref={modalElement}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="image">
            <img
              className="lazyload"
              data-src="/images/section/before-you-leave.jpg"
              alt=""
              src="/images/section/before-you-leave.jpg"
              width={728}
              height={437}
            />
          </div>
          <div className="modal-inner">
            <span
              className="icon-close icon-close-popup btn-hide-popup"
              data-bs-dismiss="modal"
            />
            <div className="content text-center">
              <div className="display-sm fw-medium heading">
                Before You Leave
              </div>
              <p>
                Take <span>15% OFF</span> on first order
              </p>
              <div className="wrap-code justify-content-center">
                <div className="text">Enter the code:</div>{" "}
                <div className="coppyText" id="coppyText">
                  CODE15OFF{" "}
                </div>{" "}
                <div className="btn-coppy-text" id="btn-coppy-text">
                  {" "}
                  <i className="icon-copy" />
                </div>
              </div>
              <Link to={`/shop-default`} className="tf-btn animate-btn w-100">
                Continue Shopping
              </Link>
            </div>
            <div className="tf-mini-cart-main">
              <div className="tf-mini-cart-sroll">
                <div className="tf-minicart-recommendations">
                  <div className="tf-minicart-recommendations-heading">
                    <div className="tf-minicart-recommendations-title text-xl-2 fw-medium">
                      You may also like
                    </div>
                  </div>
                  <div className="tf-mini-cart-items">
                    {products1.slice(0, 3).map((product, i) => (
                      <div key={i} className="tf-mini-cart-item p-0 radius-16">
                        <div className="tf-mini-cart-image">
                          <Link to={`/product-detail/${product.id}`}>
                            <img
                              className="lazyload"
                              alt="img-product"
                              src={product.imgSrc}
                              width={684}
                              height={972}
                            />
                          </Link>
                        </div>
                        <div className="tf-mini-cart-info justify-content-center">
                          <Link
                            className="title link text-md fw-medium"
                            to={`/product-detail/${product.id}`}
                          >
                            {product.title}
                          </Link>
                          <p className="price-wrap text-sm fw-medium">
                            <span
                              className={`new-price  ${
                                product.oldPrice ? "text-primary" : ""
                              }`}
                            >
                              ${product.price.toFixed(2)}
                            </span>{" "}
                            {product.oldPrice && (
                              <span className="old-price text-decoration-line-through text-dark-1">
                                ${product.oldPrice.toFixed(2)}
                              </span>
                            )}
                          </p>
                          <a
                            href="#shoppingCart"
                            data-bs-toggle="offcanvas"
                            onClick={() => addProductToCart(product.id)}
                            className="tf-btn animate-btn bg-dark-2 w-max-content"
                          >
                            {isAddedToCartProducts(product.id)
                              ? "Already Added"
                              : "Add to Cart"}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
