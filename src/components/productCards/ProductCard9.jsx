"use client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import CountdownTimer from "../common/Countdown";

export default function ProductCard9({ product }) {
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
    <div className={`card-product ${product.style || ""}`}>
      <div className="card-product-wrapper">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="img-product lazyload"
            alt="image-product"
            src={currentImage}
            width={513}
            height={729}
          />
          <img
            className="img-hover lazyload"
            data-src={product.imageHover}
            alt="image-product"
            src={product.imageHover}
            width={513}
            height={729}
          />
        </Link>
        <ul className="list-product-btn">
          <li>
            <a
              href="#shoppingCart"
              data-bs-toggle="offcanvas"
              onClick={() => addProductToCart(product.id)}
              className="hover-tooltip tooltip-left box-icon"
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
              className="hover-tooltip tooltip-left box-icon"
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
              className="hover-tooltip tooltip-left box-icon quickview"
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
              className="hover-tooltip tooltip-left box-icon"
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
        {product.discount && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">{product.discount}</span>
          </div>
        )}

        {product.countdownTimer && (
          <div className="countdown-box">
            <span className="js-countdown">
              <CountdownTimer style={1} />
            </span>
          </div>
        )}
      </div>
      <div className="card-product-info">
        <Link
          to={`/product-detail/${product.id}`}
          className="name-product link fw-medium text-md text-white"
        >
          {product.title}
        </Link>
        <p className="price-wrap fw-medium">
          <span className="price-new text-white text-xl">
            ${product.price.toFixed(2)}
          </span>{" "}
          {product.oldPrice && (
            <span className="price-old text-white line--white">
              ${product.oldPrice.toFixed(2)}
            </span>
          )}
        </p>
        {product.colors && (
          <ul className="list-color-product style-2">
            {product.colors.map((color, index) => (
              <li
                key={index}
                className={`list-color-item hover-tooltip tooltip-bot color-swatch ${
                  currentImage == color.img ? "active" : ""
                } ${color.value == "bg-white" ? "line" : ""}`}
                onMouseOver={() => setCurrentImage(color.img)}
              >
                <span className="tooltip color-filter">{color.title}</span>
                <span className={`swatch-value ${color.value}`} />
                <img
                  className="lazyload"
                  data-src={color.image}
                  alt="image-product"
                  src={color.image}
                  width={513}
                  height={729}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
