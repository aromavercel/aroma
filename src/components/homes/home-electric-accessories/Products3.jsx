"use client";
import { products21 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";

export default function Products3() {
  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();
  const [activeTab, setActiveTab] = useState("New Arrivals");
  const [filtered, setFiltered] = useState(products21);

  const tabs = [
    { id: 1, name: "New Arrivals" },
    { id: 2, name: "Featured" },
    { id: 3, name: "Trending" },
  ];
  useEffect(() => {
    setFiltered(
      products21.filter((elm) => elm.tabFilterCategories.includes(activeTab))
    );
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <section>
      <div className="container">
        <div className="flat-animate-tab">
          <div className="flat-title style-between align-items-end">
            <div className="box-title">
              <h4 className="title">Just For You</h4>
              <p className="desc text-main text-md">
                Explore our most popular pieces that customers can't get enough
                of
              </p>
            </div>
            <ul className="menu-tab-line style-md2">
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
            <div className="tab-pane hover-sw-nav active show">
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
                    nextEl: ".nav-next-new",
                    prevEl: ".nav-prev-new",
                  },
                  pagination: { el: ".sw-pagination-new", clickable: true },
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
                {filtered.map((product, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    {/* item {index + 1} */}
                    <div className="card-product style-2 style-border-2 border-type-2">
                      <div className="card-product-wrapper asp-ratio-0">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="product-img"
                        >
                          <img
                            className="img-product lazyload"
                            data-src={product.imgSrc}
                            alt="image-product"
                            src={product.imgSrc}
                            width={465}
                            height={480}
                          />
                          <img
                            className="img-hover lazyload"
                            data-src={product.imgSrc}
                            alt="image-product"
                            src={product.imgSrc}
                            width={465}
                            height={480}
                          />
                        </Link>
                        <ul className="list-product-btn">
                          <li>
                            <a
                              href="#shoppingCart"
                              data-bs-toggle="offcanvas"
                              onClick={() => addProductToCart(product.id)}
                              className="hover-tooltip box-icon"
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
                              className="hover-tooltip box-icon"
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
                              className="hover-tooltip box-icon quickview"
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
                              className="hover-tooltip box-icon"
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
                        {product.oldPrice && (
                          <div className="on-sale-wrap">
                            <span className="on-sale-item">20% Off</span>
                          </div>
                        )}
                      </div>
                      <div className="card-product-info text-center">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="name-product link fw-medium text-md"
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
                <div className="d-flex d-xl-none sw-dot-default sw-pagination-new justify-content-center" />
              </Swiper>
              <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-new" />
              <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-new" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
