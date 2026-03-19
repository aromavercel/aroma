"use client";
import { useContextElement } from "@/context/Context";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function ProductCard11({ product }) {
  const [currentImage, setCurrentImage] = useState(product.imgSrc);

  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,

    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  useEffect(() => {
    setCurrentImage(product.imgSrc);
  }, [product]);

  return (
    <div
      className="card-product style-list"
      data-availability="In stock"
      data-brand="Vineta"
    >
      <div className="card-product-wrapper">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="img-product lazyload"
            alt="image-product"
            src={currentImage}
            width={684}
            height={972}
          />
          <img
            className="img-hover lazyload"
            alt="image-product"
            src={product.imgHover}
            width={684}
            height={972}
          />
        </Link>
      </div>
      <div className="card-product-info">
        <div className="info-list">
          <Link
            to={`/product-detail/${product.id}`}
            className="name-product link fw-medium text-md"
          >
            {product.title}
          </Link>
          <p className="price-wrap fw-medium text-md">
            {" "}
            <span
              className={`price-new ${product.oldPrice ? "text-primary" : ""} `}
            >
              ${product.price?.toFixed(2)}
            </span>{" "}
            {product.oldPrice && (
              <span className="price-old text-dark">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </p>
          <p className="decs text-sm text-main text-line-clamp-2">
            Product Specifications Care for fiber: 30% more recycled polyester.
            We label garments manufactured using environmentally friendly
            technologies and raw materials with the Join Life label.
          </p>
          <ul className="list-color-product">
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
                  width="684"
                  height="972"
                />
              </li>
            ))}
          </ul>
          <ul className="size-box">
            <li className="size-item text-xs">S</li>
            <li className="size-item text-xs">M</li>
            <li className="size-item text-xs">L</li>
            <li className="size-item text-xs">XL</li>
          </ul>
        </div>
        <div className="list-product-btn">
          <a
            href="#shoppingCart"
            data-bs-toggle="offcanvas"
            onClick={() => addProductToCart(product.id)}
            className="tf-btn btn-main-product animate-btn"
          >
            {isAddedToCartProducts(product.id)
              ? "Already Added"
              : "Add to Cart"}
          </a>
          <a
            onClick={() => addToWishlist(product.id)}
            className="box-icon wishlist hover-tooltip"
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
          <a
            href="#compare"
            data-bs-toggle="modal"
            onClick={() => addToCompareItem(product.id)}
            aria-controls="compare"
            className="box-icon compare hover-tooltip"
          >
            <span className="icon icon-compare3" />
            <span className="tooltip">
              {isAddedtoCompareItem(product.id)
                ? "Already compared"
                : "Add to Compare"}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
