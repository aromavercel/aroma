"use client";
import { products28 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { useContextElement } from "@/context/Context";
export default function Products() {
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
    <section className="flat-spacing-3 wow fadeInUp">
      <div className="container">
        <div className="flat-title">
          <h3 className="title fw-bold font-3 letter-0">Featured Products</h3>
        </div>
        <div className="hover-sw-nav hover-sw-2">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            {...{
              slidesPerView: 2,
              spaceBetween: 12,
              speed: 800,
              observer: true,
              observeParents: true,
              slidesPerGroup: 2,
              navigation: {
                clickable: true,
                nextEl: ".nav-next-feature",
                prevEl: ".nav-prev-feature",
              },
              pagination: { el: ".sw-pagination-feature", clickable: true },
              breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {products28.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div className="card-product">
                  <div className="card-product-wrapper rounded-0 asp-ratio-0">
                    <Link
                      to={`/product-detail/${product.id}`}
                      className="product-img"
                    >
                      <img
                        className="img-product lazyload"
                        data-src={product.imgSrc}
                        alt="image-product"
                        src={product.imgSrc}
                        width={513}
                        height={606}
                      />
                      <img
                        className="img-hover lazyload"
                        data-src={product.imageHover}
                        alt="image-product"
                        src={product.imageHover}
                        width={513}
                        height={606}
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
                              isAddedtoWishlist(product.id)
                                ? "icon-trash"
                                : "icon-heart2"
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
                          aria-controls="compare"
                          onClick={() => addToCompareItem(product.id)}
                          className="hover-tooltip tooltip-left box-icon"
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
                    {product.discount && (
                      <div className="on-sale-wrap flex-column type-2">
                        {Array.isArray(product.discount) ? (
                          product.discount.map((item, index) => (
                            <span
                              key={index}
                              className={`on-sale-item ${
                                item == "Trending" ? "trending" : ""
                              }`}
                            >
                              {item}
                            </span>
                          ))
                        ) : (
                          <span
                            className={`on-sale-item ${
                              product.discount == "Trending" ? "trending" : ""
                            }`}
                          >
                            {product.discount}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="card-product-info">
                    <Link
                      to={`/product-detail/${product.id}`}
                      className="name-product link fw-medium text-md font-3"
                    >
                      {product.title}
                    </Link>
                    <p className="price-wrap fw-medium">
                      <span className="price-new text-primary">
                        ${product.price.toFixed(2)}
                      </span>{" "}
                      {product.oldPrice && (
                        <span className="price-old">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-feature justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-feature" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-feature" />
        </div>
      </div>
    </section>
  );
}
