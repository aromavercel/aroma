"use client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import CountdownTimer from "../common/Countdown";

export default function ProductCard7({ product }) {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);

  const {
    setQuickAddItem,
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
    <div className="card-product style-2 style-border-2 border-type-4">
      <div className="card-product-wrapper asp-ratio-0">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="img-product lazyload"
            alt="image-product"
            src={currentImage}
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
        {product.countdownTimer && (
          <div className="countdown-box">
            <span className="js-countdown">
              <CountdownTimer style={1} />
            </span>
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
                {" "}
                {isAddedtoCompareItem(product.id)
                  ? "Already compared"
                  : "Add to Compare"}
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className="card-product-info text-center">
        <Link
          to={`/product-detail/${product.id}`}
          className="name-product link fw-medium text-md"
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
            <span className="price-old old-line">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </p>
        {product.colors.length > 0 && (
          <ul className="list-color-product justify-content-center mt-0">
            {product.colors.map((color, index) => (
              <li
                className={`list-color-item color-swatch hover-tooltip tooltip-bot ${
                  currentImage == color.img ? "active" : ""
                } ${color.value == "bg-white" ? "line" : ""}`}
                key={index}
                onMouseOver={() => setCurrentImage(color.img)}
              >
                <span className="tooltip color-filter">{color.label}</span>
                <span className={`swatch-value ${color.value}`} />
                <img
                  className="lazyload"
                  data-src={color.img}
                  alt="image-product"
                  src={color.img}
                  width="465"
                  height="480"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
