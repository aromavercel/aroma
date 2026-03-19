"use client";
import { useContextElement } from "@/context/Context";
import { handcraftProducts } from "@/data/products";

import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products1() {
  const tabs = ["New Arrivals", "Best Sellers", "Deals"];
  const [activeTab, setActiveTab] = useState(tabs[0]);

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
    <section className="flat-spacing-2 bg-yellow-6">
      <div className="container">
        <div className="flat-animate-tab flat-controltab-nav">
          <div className="flat-title">
            <ul className="menu-tab-line style-lg3 type-active-1">
              {tabs.map((tab, index) => (
                <li key={index} className="nav-tab-item">
                  <a
                    className={`fw-normal font-9 tab-link ${
                      activeTab === tab ? "active" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane active show" id="arrivals" role="tabpanel">
              <Swiper
                dir="ltr"
                className="swiper tf-swiper"
                {...{
                  slidesPerView: 2,
                  spaceBetween: 12,
                  speed: 800,
                  observer: true,
                  observeParents: true,
                  slidesPerGroup: 1,
                  navigation: {
                    clickable: true,
                    nextEl: ".nav-next-hot",
                    prevEl: ".nav-prev-hot",
                  },
                  pagination: { el: ".sw-pagination-hot", clickable: true },
                  breakpoints: {
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                      slidesPerGroup: 1,
                    },
                    1200: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                      slidesPerGroup: 1,
                    },
                  },
                }}
                modules={[Navigation, Pagination]}
              >
                {handcraftProducts
                  .filter((el) => el.tabFilteringOptions.includes(activeTab))
                  .map((product, i) => (
                    <SwiperSlide key={i} className="swiper-slide">
                      <div className="card-product style-wishlist style-3 card-product-size none-hover">
                        <div className="card-product-wrapper">
                          <Link
                            to={`/product-detail/${product.id}`}
                            className="product-img"
                          >
                            <img
                              className="img-product lazyload"
                              alt="image-product"
                              src={product.imgSrc}
                              width={513}
                              height={650}
                            />
                            <img
                              className="img-hover lazyload"
                              alt="image-product"
                              src={product.imgSrc}
                              width={513}
                              height={650}
                            />
                          </Link>
                          <ul className="list-product-btn">
                            <li
                              className={` ${
                                isAddedtoWishlist(product.id)
                                  ? "addwishlist"
                                  : ""
                              }`}
                            >
                              <a
                                onClick={() => addToWishlist(product.id)}
                                className="box-icon hover-tooltip wishlist box-shadow1"
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
                                className="box-icon hover-tooltip quickview box-shadow1"
                              >
                                <span className="icon icon-view" />
                                <span className="tooltip">Quick View</span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#compare"
                                data-bs-toggle="modal"
                                aria-controls="compare"
                                onClick={() => addToCompareItem(product.id)}
                                className="box-icon hover-tooltip compare box-shadow1"
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
                            className="name-product link fw-medium text-md font-9"
                          >
                            {product.title}
                          </Link>
                          <p className="price-wrap fw-medium">
                            <span className="price-new">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="price-old">
                              {" "}
                              ${product.oldPrice.toFixed(2)}
                            </span>
                          </p>
                          <a
                            href="#shoppingCart"
                            data-bs-toggle="offcanvas"
                            onClick={() => addProductToCart(product.id)}
                            className="tf-btn btn-out-line-dark mt_10"
                          >
                            <span className="text-md fw-medium">
                              {isAddedToCartProducts(product.id)
                                ? "Already Added"
                                : "Add to Cart"}
                            </span>
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                <div className="d-flex d-xl-none sw-dot-default sw-pagination-hot justify-content-center" />
              </Swiper>
              <div className="box-nav-swiper style-2">
                <div className="swiper-button-prev d-xl-flex style-1 nav-swiper nav-prev-hot relative" />
                <div className="swiper-button-next d-xl-flex style-1 nav-swiper nav-next-hot relative" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
