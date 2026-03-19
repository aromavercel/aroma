"use client";

import { useContextElement } from "@/context/Context";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductCard15({ product }) {
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
    <div className="card-product style-2">
      <div className="card-product-wrapper">
        <Link to={`/product-detail/${product.id}`} className="product-img">
          <img
            className="img-product lazyload"
            src={currentImage}
            alt="image-product"
            width={513}
            height={648}
          />
          <img
            className="img-hover lazyload"
            data-src={product.hoverImage}
            src={product.hoverImage}
            alt="image-product"
            width={513}
            height={648}
          />
        </Link>

        {product.saleBadge && (
          <div className="on-sale-wrap">
            <span className="on-sale-item">{product.saleBadge}</span>
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
          className="name-product link fw-normal text-md fs-18 text-white font-10"
        >
          {product.title}
        </Link>
        <p className="price-wrap fw-medium">
          <span className="price-new text-primary">
            {product.price.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </span>
          {product.oldPrice && (
            <span className="price-old text-grey-4 old-line">
              {product.oldPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          )}
        </p>

        <ul className="list-color-product justify-content-center">
          {product.swatches.map((swatch, idx) => (
            <li
              key={idx}
              onMouseOver={() => setCurrentImage(swatch.image)}
              className={`list-color-item style-img color-swatch hover-tooltip tooltip-bot ${
                currentImage == swatch.image ? "line active" : ""
              }`}
            >
              <span className="tooltip color-filter">{swatch.label}</span>
              <span className="swatch-value">
                <img
                  className="swatch-img lazyload"
                  data-src={swatch.image}
                  src={swatch.image}
                  alt="image-product"
                  width={64}
                  height={64}
                />
              </span>
              <img
                className="lazyload"
                data-src={swatch.image}
                src={swatch.image}
                alt="image-product"
                width={513}
                height={648}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
