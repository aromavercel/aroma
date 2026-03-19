"use client";
import { products18 } from "@/data/products";
import React, { useEffect, useState } from "react";
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
  const [activeTab, setActiveTab] = useState("What’s Hot?");
  const [filtered, setFiltered] = useState(products18);

  const tabs = [
    { id: 1, name: "What’s Hot?" },
    { id: 2, name: "Best Sellers" },
    { id: 3, name: "Just Arrivals" },
  ];
  useEffect(() => {
    setFiltered(
      products18.filter((elm) => elm.tabFilterCategories.includes(activeTab))
    );
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flat-spacing-3">
      <div className="container">
        <div className="flat-animate-tab flat-controltab-nav">
          <div className="flat-title">
            <ul
              className="menu-tab-line font-2 style2 style-lg style-lg2"
              role="tablist"
            >
              {tabs.map((tab) => (
                <li key={tab.id} className="nav-tab-item">
                  <a
                    className={` tab-link ${
                      activeTab === tab.name ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(tab.name)}
                    style={{ cursor: "pointer" }}
                  >
                    {tab.name}
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
                  <SwiperSlide key={product.id} className="swiper-slide">
                    <div className="card-product style-1">
                      <div className="card-product-wrapper asp-ratio-0 rounded-0">
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
                            height={686}
                          />
                          <img
                            className="img-hover lazyload"
                            data-src={product.imgHover}
                            alt="image-product"
                            src={product.imgHover}
                            width={513}
                            height={686}
                          />
                        </Link>
                        <div className="on-sale-wrap pos1 type-2 flex-column">
                          {product.onSale && (
                            <span className="on-sale-item rounded-0">-20%</span>
                          )}
                          {product.limited && (
                            <span className="on-sale-item rounded-0 bg-brown-3">
                              Limited
                            </span>
                          )}
                        </div>
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
                      </div>
                      <div className="card-product-info">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="name-product link text-md fw-medium font-2"
                        >
                          {product.title}
                        </Link>
                        <p className="price-wrap fw-medium">
                          <span className="price-new text-primary text-md">
                            ${product.price.toFixed(2)}
                          </span>{" "}
                          {product.oldPrice && (
                            <span className="price-old text-dark text-md">
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
