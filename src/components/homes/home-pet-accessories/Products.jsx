"use client";
import { products15 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";

export default function Products() {
  const [activeTab, setActiveTab] = useState("Dogs");
  const [filtered, setFiltered] = useState(products15);

  const tabs = [
    { id: 1, name: "Dogs" },
    { id: 2, name: "Cats" },
    { id: 3, name: "Birds" },
  ];
  useEffect(() => {
    setFiltered(
      products15.filter((elm) => elm.tabFilterCategories.includes(activeTab))
    );
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

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
    <section>
      <div className="container">
        <div className="flat-animate-tab overflow-visible">
          <div className="flat-title-tab-categories text-center wow fadeInUp">
            <h4 className="title font-5">Top Picks</h4>
            <div className="tab-slide">
              <ul
                className="menu-tab-fill justify-content-center"
                role="tablist"
              >
                <li className="item-slide-effect" />
                {tabs.map((tab) => (
                  <li key={tab.id} className="nav-tab-item">
                    <a
                      className={`display-xs tab-link ${
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
          </div>
          <div className="tab-content">
            <div className="tab-pane active show" id="dogs" role="tabpanel">
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
                    nextEl: ".nav-next-dogs",
                    prevEl: ".nav-prev-dogs",
                  },
                  pagination: { el: ".sw-pagination-dogs", clickable: true },
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
                    <div className="card-product style-1">
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
                            width={513}
                            height={513}
                          />
                          <img
                            className="img-hover lazyload"
                            data-src={product.imgHover}
                            alt="image-product"
                            src={product.imgHover}
                            width={513}
                            height={513}
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
                                {" "}
                                {isAddedtoCompareItem(product.id)
                                  ? "Already compared"
                                  : "Add to Compare"}
                              </span>
                            </a>
                          </li>
                        </ul>
                        {product.saleTag && (
                          <div className="on-sale-wrap">
                            <span
                              className={`on-sale-item${
                                product.saleTag === "Trending"
                                  ? " trending"
                                  : ""
                              }`}
                            >
                              {product.saleTag}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="card-product-info pb-0">
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
                            <span className="price-old text-dark">
                              ${product.oldPrice.toFixed(2)}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="d-flex d-xl-none sw-dot-default sw-pagination-dogs justify-content-center" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
