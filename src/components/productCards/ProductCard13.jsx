"use client";
import React from "react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import CountdownTimer from "../common/Countdown";

export default function ProductCard13({ product }) {
  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  return (
    <div className="swiper-slide">
      <div className="card-product style-2 style-border-2 style-box-bg line-purple">
        <div className="card-product-wrapper asp-ratio-0">
          <Link to={`/product-detail/${product.id}`} className="product-img">
            <img
              className="img-product lazyload"
              data-src={product.imgSrc}
              alt="image-product"
              src={product.imgSrc}
              width="465"
              height="480"
            />
            <img
              className="img-hover lazyload"
              data-src={product.imgHover}
              alt="image-product"
              src={product.imgHover}
              width="465"
              height="480"
            />
          </Link>
          {product.saleLabel && (
            <div className="on-sale-wrap flex-column">
              <span
                className={`on-sale-item ${
                  product.saleLabel == "Trending" ? "trending" : ""
                } ${product.additionalLabel ? "flex-column" : ""}`}
              >
                {product.saleLabel}
              </span>
              {product.additionalLabel && (
                <span className="on-sale-item limited">
                  {product.additionalLabel}
                </span>
              )}
            </div>
          )}

          <ul className="list-product-btn">
            <li>
              <a
                href="#shoppingCart"
                data-bs-toggle="offcanvas"
                onClick={() => addProductToCart(product.id)}
                className="hover-tooltip box-icon"
              >
                <span className="icon icon-cart2" />
                <span className="tooltip">
                  {isAddedToCartProducts(product.id)
                    ? "Already Added"
                    : "Add to Cart"}
                </span>
              </a>
            </li>
            <li
              className={`wishlist ${
                isAddedtoWishlist(product.id) ? "addwishlist" : ""
              }`}
            >
              <a
                onClick={() => addToWishlist(product.id)}
                className="hover-tooltip box-icon"
              >
                <span
                  className={`icon ${
                    isAddedtoWishlist(product.id) ? "icon-trash" : "icon-heart2"
                  } `}
                />
                <span className="tooltip">
                  {" "}
                  {isAddedtoWishlist(product.id)
                    ? "Remove Wishlist"
                    : "Add to Wishlist"}
                </span>
              </a>
            </li>
            <li>
              <a
                href="#quickView"
                data-bs-toggle="modal"
                onClick={() => setQuickViewItem(product)}
                className="hover-tooltip box-icon quickview"
              >
                <span className="icon icon-view" />
                <span className="tooltip">Quick View</span>
              </a>
            </li>
            <li className="compare">
              <a
                href="#compare"
                data-bs-toggle="modal"
                onClick={() => addToCompareItem(product.id)}
                aria-controls="compare"
                className="hover-tooltip box-icon"
              >
                <span className="icon icon-compare" />
                <span className="tooltip">
                  {isAddedtoCompareItem(product.id)
                    ? "Already compared"
                    : "Add to Compare"}
                </span>
              </a>
            </li>
          </ul>
          {product.countdownTimer && (
            <div className="countdown-box style-3">
              <i className="icon icon-clock2" />
              <div
                className="js-countdown"
                data-timer={product.countdownTimer}
                data-labels="D  :,H  :,M  :,S"
              >
                <CountdownTimer style={1} />
              </div>
            </div>
          )}
        </div>
        <div className="card-product-info text-center">
          <Link
            to={`/product-detail/${product.id}`}
            className="name-product link fw-medium text-md"
          >
            {product.title}
          </Link>
          <p className="price-wrap fw-medium">
            <span className="price-new text-primary text-xl-2">
              ${product.price.toFixed(2)}
            </span>{" "}
            {product.oldPrice && (
              <span className="price-old text-sm old-line">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </p>
          <div className="product-progress-sale">
            <div
              className="progress-sold progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="progress-bar bg-purple"
                style={{ width: `${product.progress}%` }}
              />
            </div>
            <div className="box-quantity d-flex justify-content-between">
              <p className="text-sold text-sm">
                Sold:{" "}
                <span className="fw-medium text-primary">{product.sold}</span>
              </p>
              <p className="text-avaiable text-sm">
                Available:{" "}
                <span className="fw-medium">{product.available}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
