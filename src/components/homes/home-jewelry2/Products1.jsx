"use client";
import { useContextElement } from "@/context/Context";
import { jewelryProducts2 } from "@/data/products";

import { Link } from "react-router-dom";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import OfferMarquee from "./OfferMarquee";

export default function Products1() {
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
    <section className="flat-spacing-3 pt-0">
      <div className="container">
        <div className="flat-title style-between align-items-end wow fadeInUp">
          <div className="box-title">
            <h3 className="title fw-normal font-9">Best Sellers</h3>
          </div>
          <div className="box-nav-swiper style-2 d-none d-xl-flex">
            <div className="swiper-button-prev nav-swiper style-1 nav-prev-hot relative" />
            <div className="swiper-button-next nav-swiper style-1 nav-next-hot relative" />
          </div>
        </div>
        <div>
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
                nextEl: ".nav-next-hot",
                prevEl: ".nav-prev-hot",
              },
              pagination: { el: ".sw-pagination-hot", clickable: true },
              breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {jewelryProducts2.map((product, i) => (
              <SwiperSlide key={i} className="swiper-slide">
                <div className="card-product">
                  <div className="card-product-wrapper asp-ratio-0 rounded-0">
                    <Link
                      to={`/product-detail/${product.id}`}
                      className="product-img"
                    >
                      <img
                        className="img-product lazyload"
                        data-src={product.imgSrc}
                        alt="image-product"
                        width={684}
                        height={848}
                        src={product.imgSrc}
                      />
                      <img
                        className="img-hover lazyload"
                        alt="image-product"
                        width={513}
                        height={686}
                        src={product.hoverImage}
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
                            {" "}
                            {isAddedtoCompareItem(product.id)
                              ? "Already compared"
                              : "Add to Compare"}
                          </span>
                        </a>
                      </li>
                    </ul>
                    {product.badge && (
                      <div className="marquee-product">
                        <OfferMarquee />
                      </div>
                    )}
                  </div>
                  <div className="card-product-info">
                    <Link
                      to={`/product-detail/${product.id}`}
                      className="name-product link text-md font-9"
                    >
                      {product.title}
                    </Link>
                    <p className="price-wrap fw-medium">
                      <span
                        className={`price-new text-md font-9 ${
                          product.oldPrice ? "" : "text-dark-7 text-md font-9"
                        } `}
                      >
                        ${product.price.toFixed(2)}
                      </span>
                      {product.oldPrice && (
                        <span className="price-oldtext-md font-9">
                          {" "}
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="d-flex sw-dot-default sw-pagination-hot justify-content-center" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
