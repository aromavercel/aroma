"use client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import CountdownTimer from "../common/Countdown";

export default function ProductCard3({ product, countdownStyle = "" }) {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);

  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.imgSrc);
  }, [product]);
  return (
    <div className="card-product style-center">
      <div className="card-product-wrapper">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="img-product lazyload"
            alt="image-product"
            src={currentImage}
            width="684"
            height="972"
          />
          <img
            className="img-hover lazyload"
            data-src={product.imgHover}
            alt="image-product"
            src={product.imgHover}
            width="684"
            height="972"
          />
        </Link>
        {product.saleLabel.length > 0 && (
          <div className="on-sale-wrap">
            {product.saleLabel.map((label, index) => (
              <span className="on-sale-item" key={index}>
                {label}
              </span>
            ))}
          </div>
        )}
        <ul className="list-product-btn">
          <li>
            <a
              href="#shoppingCart"
              data-bs-toggle="offcanvas"
              onClick={() => addProductToCart(product.id)}
              className="bg-surface hover-tooltip tooltip-left box-icon"
            >
              <span className="icon icon-cart2" />
              <span className="tooltip">
                {" "}
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
              className="bg-surface hover-tooltip tooltip-left box-icon"
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
              className="bg-surface hover-tooltip tooltip-left box-icon quickview"
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
              className="bg-surface hover-tooltip tooltip-left box-icon"
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
        {product.countdownTimer && (
          <div className={`countdown-box ${countdownStyle}`}>
            <span className="js-countdown">
              <CountdownTimer style={1} />
            </span>
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
          {" "}
          <span
            className={`price-new ${product.oldPrice ? "text-primary" : ""} `}
          >
            ${product.price.toFixed(2)}
          </span>{" "}
          {product.oldPrice && (
            <span className="price-old old-line">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </p>
        {product.colors.length > 0 && (
          <ul className="list-color-product justify-content-center">
            {product.colors.map((color, index) => (
              <li
                className={`list-color-item color-swatch hover-tooltip tooltip-bot  ${
                  currentImage == color.img ? "active" : ""
                } ${color.value == "bg-white" ? "line" : ""}`}
                key={index}
                onMouseOver={() => setCurrentImage(color.img)}
              >
                <span className="tooltip">{color.label}</span>
                <span className={`swatch-value ${color.value}`} />
                <img
                  className="lazyload"
                  data-src={color.img}
                  alt="image-product"
                  src={color.img}
                  width="684"
                  height="972"
                />
              </li>
            ))}
          </ul>
        )}
        {product.progress && (
          <div className="product-progress-sale">
            <div
              className="progress-sold progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={`progress-bar ${product.progress.color}`}
                style={{ width: product.progress.width }}
              />
            </div>
            <p className="text-avaiable text-sm">
              Available:{" "}
              <span className={`fw-medium ${product.progress.textColor}`}>
                {product.progress.available}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
