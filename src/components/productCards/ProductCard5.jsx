"use client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import CountdownTimer from "../common/Countdown";

export default function ProductCard5({
  countdownStyleclass = "",
  product,
  styleClass = "",
  tooltipDirection = "left",
}) {
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
    <div
      className={`card-product card-product-size ${
        product.isOutofSale ? "out-of-stock" : ""
      } ${styleClass}`}
    >
      <div className="card-product-wrapper asp-ratio-0">
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
        {product.saleLabel && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">{product.saleLabel}</span>
          </div>
        )}
        {product.isTrending && (
          <div className="on-sale-wrap">
            <span className="on-sale-item trending">Trending</span>
          </div>
        )}
        {product.countdownTimer && (
          <div className={`countdown-box ${countdownStyleclass}`}>
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
              className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
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
              className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
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
              onClick={() => setQuickViewItem(product)}
              data-bs-toggle="modal"
              className={`hover-tooltip tooltip-${tooltipDirection} box-icon quickview`}
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
              className={`hover-tooltip tooltip-${tooltipDirection} box-icon`}
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
        {product.sizes?.length > 0 && (
          <ul className="size-box">
            {product.sizes.map((size, index) => (
              <li className="size-item text-xs text-white" key={index}>
                {size}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card-product-info text-center">
        {product.type && (
          <p className="type text-xs text-dark fw-medium">{product.type}</p>
        )}
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
            <span className="price-old text-dark">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}{" "}
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
                <span className="tooltip color-filter">{color.label}</span>
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
      </div>
    </div>
  );
}
