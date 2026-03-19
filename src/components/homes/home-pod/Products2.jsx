"use client";
import { products29 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { useContextElement } from "@/context/Context";
export default function Products2() {
  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();
  const tabNames = ["What's Hot?", "Best Sellers", "Just Arrivals"];
  const [activeTab, setActiveTab] = useState("What's Hot?"); // Default to first tab active
  const [filtered, setFiltered] = useState(products29);
  useEffect(() => {
    setFiltered(
      products29.filter((elm) => elm.tabFilterCategories.includes(activeTab))
    );
  }, [activeTab]);

  return (
    <div className="">
      <div className="container">
        <div className="flat-animate-tab flat-controltab-nav overflow-visible">
          <div className="flat-title">
            <ul className="menu-tab-line style2 style-lg style-lg3">
              {tabNames.map((name, index) => (
                <li
                  key={index}
                  className="nav-tab-item"
                  role="presentation"
                  onClick={() => setActiveTab(name)}
                >
                  <a
                    className={`font-3 tab-link ${
                      activeTab === name ? "active" : ""
                    }`}
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane active show" id="hot" role="tabpanel">
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
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 12,
                      slidesPerGroup: 3,
                    },
                    1200: {
                      slidesPerView: 4,
                      spaceBetween: 24,
                      slidesPerGroup: 4,
                    },
                  },
                }}
                modules={[Pagination, Navigation]}
              >
                {filtered.map((product) => (
                  <SwiperSlide className="swiper-slide" key={product.id}>
                    <div className={`card-product ${product.style || ""}`}>
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
                              onClick={() => addProductToCart(product.id)}
                              data-bs-toggle="offcanvas"
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
                          <div className="on-sale-wrap">
                            <span className="on-sale-item">
                              {product.discount}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="card-product-info pb-0">
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
                <div className="d-flex d-xl-none sw-dot-default sw-pagination-hot justify-content-center" />
              </Swiper>
              <div className="box-nav-swiper style-2">
                <div className="swiper-button-prev nav-swiper nav-prev-hot relative" />
                <div className="swiper-button-next nav-swiper nav-next-hot relative" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
