"use client";
import { products27 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { useContextElement } from "@/context/Context";
export default function Products4() {
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
    <section className="s-banner-bundle bundle-suppermarket flat-spacing-3 pt-0">
      <div className="container">
        <div className="row">
          <div className="col-md-5 col-xl-5">
            <div className="image-wrap radius-16  hover-shine hover-img">
              <div className="image img-style shine-item overflow-hidden">
                <img
                  alt=""
                  className=" ls-is-cached lazyloaded"
                  src="/images/banner/food.jpg"
                  width="879"
                  height="770"
                />
              </div>
              <div className="content-list">
                <ul className="list-recipe">
                  <li>
                    <span className="fw-medium text-xl">Beef Steak</span>
                  </li>
                  <li className="br--line" />
                  <li>
                    <p className="text-sm text-main">Cook time: 1 hour</p>
                  </li>
                  <li className="br--line" />
                  <li>
                    <p className="text-sm text-main">Difficult: 2/5</p>
                  </li>
                </ul>
                <a href="#" className="tf-btn btn-line-dark fw-normal">
                  <span className="text-sm">See recipe</span>
                  <i className="icon-arrow-top-left fs-8" />
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-7 col-xl-7">
            <div className="bundle-wrap">
              <div className="flat-title mb-0 wow fadeInUp">
                <h4 className="title text-brown">Don’t Know What to Eat?</h4>
                <p className="desc text-md">
                  Let us inspire you! Discover delicious recipe <br />
                  ideas for every meal.
                </p>
              </div>
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
                    nextEl: ".nav-next-bundle",
                    prevEl: ".nav-prev-bundle",
                  },
                  pagination: { el: ".spdp4", clickable: true },
                  breakpoints: {
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                      slidesPerGroup: 3,
                    },
                  },
                }}
                modules={[Pagination, Navigation]}
              >
                {products27.map((product) => (
                  <SwiperSlide className="swiper-slide" key={product.id}>
                    <div className="card-product">
                      <div className="card-product-wrapper asp-ratio-0 radius-8 line">
                        <Link
                          to={`/product-detail/${product.id}`}
                          className="product-img"
                        >
                          <img
                            className="img-product lazyload"
                            data-src={product.imgSrc}
                            alt="image-product"
                            src={product.imgSrc}
                            width={330}
                            height={330}
                          />
                          <img
                            className="img-hover lazyload"
                            data-src={product.imgSrc}
                            alt="image-product"
                            src={product.imgSrc}
                            width={330}
                            height={330}
                          />
                        </Link>
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
                              className="bg-surface hover-tooltip tooltip-left box-icon"
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
                      <div className="card-product-info">
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
                          <span className="price-old text-dark">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className=" sw-dot-default sw-pagination-bundle justify-content-center spdp4" />
              </Swiper>
              <p className="text-md text-center">
                *All these portions are made enough for 4 people
              </p>
              <div className="box-btn text-center">
                <Link
                  to={`/shop-default`}
                  className="tf-btn animate-btn btn-primary primary-2"
                >
                  Add Bundle to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
