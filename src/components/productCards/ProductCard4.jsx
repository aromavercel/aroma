"use client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import CountdownTimer from "../common/Countdown";

export default function ProductCard4({ product }) {
  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  const [activeSize, setActiveSize] = useState("50ml");

  return (
    <div className="card-product style-5 text-center">
      <div className="card-product-wrapper asp-ratio-0">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="img-product lazyload"
            data-src={product.imgSrc}
            alt="image-product"
            src={product.imgSrc}
            width={513}
            height={518}
          />
          <img
            className="img-hover lazyload"
            data-src={product.imgHover}
            alt="image-product"
            src={product.imgHover}
            width={513}
            height={518}
          />
        </Link>
        {product.discount && (
          <div className="on-sale-wrap">
            <span
              className={`on-sale-item ${
                product.discount === "Trending" ? "trending" : ""
              }`}
            >
              {product.discount}
            </span>
          </div>
        )}
        {product.countdownTimer && (
          <div className="countdown-box">
            <span className="js-countdown">
              <CountdownTimer style={1} />
            </span>
          </div>
        )}
        <ul className="list-product-btn">
          <li
            className={`wishlist ${
              isAddedtoWishlist(product.id) ? "addwishlist" : ""
            }`}
          >
            <a
              onClick={() => addToWishlist(product.id)}
              className="box-icon bg-surface hover-tooltip tooltip-left"
            >
              <span
                className={`icon ${
                  isAddedtoWishlist(product.id) ? "icon-trash" : "icon-heart2"
                } `}
              />
              <span className="tooltip">
                {isAddedtoWishlist(product.id)
                  ? "Remove Wishlist"
                  : "Add to Wishlist"}
              </span>
            </a>
          </li>
          <li>
            <a
              href="#quickView"
              onClick={() => setQuickViewItem(product)}
              data-bs-toggle="modal"
              className="box-icon bg-surface quickview hover-tooltip tooltip-left"
            >
              <span className="icon icon-view" />
              <span className="tooltip">Quick View</span>
            </a>
          </li>
          <li className="compare">
            <a
              href="#compare"
              onClick={() => addToCompareItem(product.id)}
              data-bs-toggle="modal"
              className="box-icon bg-surface hover-tooltip tooltip-left"
            >
              <span className="icon icon-compare" />
              <span className="tooltip">
                {" "}
                {isAddedtoCompareItem(product.id)
                  ? "Already compared"
                  : "Add to Compare"}
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className="card-product-info">
        <Link
          to={`/product-detail/${product.id}`}
          className="name-product link fw-medium body-text"
        >
          {product.title}
        </Link>
        <p className="price-wrap fw-medium">
          <span
            className={`price-new ${product.oldPrice ? "text-primary" : ""} `}
          >
            ${product.price.toFixed(2)}
          </span>{" "}
          {product.oldPrice && (
            <span className="price-old">${product.oldPrice.toFixed(2)}</span>
          )}
        </p>
        <ul className="list-color-product list-capacity-product justify-content-center">
          <li
            className={`list-color-item color-swatch ${
              activeSize == "50ml" ? "active" : ""
            }`}
            onMouseOver={() => setActiveSize("50ml")}
          >
            <span className="text-quantity">50ml</span>
            <img
              className="lazyload"
              data-src={product.imgHover}
              alt="image-product"
              src={product.imgHover}
              width={513}
              height={518}
            />
          </li>
          <li
            className={`list-color-item color-swatch ${
              activeSize == "100ml" ? "active" : ""
            }`}
            onMouseOver={() => setActiveSize("100ml")}
          >
            <span className="text-quantity">100ml</span>
            <img
              className="lazyload"
              data-src={product.imgHover}
              alt="image-product"
              src={product.imgHover}
              width={513}
              height={518}
            />
          </li>
        </ul>
        <div className="btn-addcart">
          <a
            href="#shoppingCart"
            data-bs-toggle="offcanvas"
            onClick={() => {
              if (!product.isSoldOut) {
                addProductToCart(product.id);
              }
            }}
            className={`tf-btn btn-dark3 fw-normal hover-primary ${
              product.isSoldOut ? "disabled" : ""
            }`}
          >
            {product.isSoldOut
              ? "Sold out"
              : isAddedToCartProducts(product.id)
              ? "Already Added"
              : "Add to Cart"}
          </a>
        </div>
        <div
          className={`${
            product.isSoldOut ? "out-stock" : "in-stock"
          } stock text-line-clamp-1`}
        >
          <span className="dot" /> {product.stockStatus}
        </div>
      </div>
    </div>
  );
}
