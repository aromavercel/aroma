"use client";

import { useContextElement } from "@/context/Context";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductCard16({ product }) {
  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  const [currentImage, setCurrentImage] = useState(product.imgSrc);

  useEffect(() => {
    setCurrentImage(product.imgSrc);
  }, [product]);
  return (
    <div className="card-product card-product-size">
      <div className="card-product-wrapper rounded-0">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="img-product lazyload"
            src={currentImage}
            alt="image-product"
            width={507}
            height={507}
          />
          <img
            className="img-hover lazyload"
            data-src={product.hoverImage}
            src={product.hoverImage}
            alt="image-product"
            width={800}
            height={800}
          />
        </Link>

        <ul className="list-product-btn">
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
              data-bs-toggle="modal"
              onClick={() => addToCompareItem(product.id)}
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
      </div>

      <div className="card-product-info text-center">
        <Link
          to={`/product-detail/${product.id}`}
          className="name-product link fw-medium text-md font-11 text-dark-8"
        >
          {product.title}
        </Link>
        <p className="price-wrap fw-normal font-11 text-dark-8 body-text">
          FROM{" "}
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>

        <ul className="list-color-product justify-content-center">
          {product.swatches.map((swatch, idx) => (
            <li
              key={idx}
              onMouseOver={() => setCurrentImage(swatch.image)}
              className={`list-color-item border-color-black color-swatch hover-tooltip tooltip-bot ${
                currentImage == swatch.image ? "active" : ""
              }`}
            >
              <span className="tooltip color-filter">{swatch.label}</span>
              <span className={`swatch-value ${swatch.colorClass}`} />
              <img
                className="lazyload"
                data-src={swatch.image}
                src={swatch.image}
                alt="image-product"
                width={507}
                height={507}
              />
            </li>
          ))}
        </ul>

        <a
          href="#shoppingCart"
          data-bs-toggle="offcanvas"
          className="tf-btn mt_18 rounded-0 btn-outline-brown"
        >
          <span className="text-md fw-medium"> Add to Cart </span>
        </a>
      </div>
    </div>
  );
}
