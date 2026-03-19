"use client";
import { useContextElement } from "@/context/Context";
import { styledProducts } from "@/data/products";

import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Lookbook() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
        <div className="flat-wrapper-lookbook wow fadeInUp wrapper-lookbook-1">
          <div className="col-right">
            <div className="image-lookbook">
              <img
                className="lazyload"
                src="/images/banner/banner-lookbook-1.jpg"
                alt=""
                width={1065}
                height={1113}
              />
              <div
                onClick={() => swiperRef.current?.slideTo(0)}
                className={`tf-pin-btn2 ${
                  activeIndex == 0 ? "active" : ""
                }  sw-btn pin-2`}
              >
                <span />
              </div>
              <div
                onClick={() => swiperRef.current?.slideTo(1)}
                className={`tf-pin-btn2  ${
                  activeIndex == 1 ? "active" : ""
                }  sw-btn pin-1`}
              >
                <span />
              </div>
            </div>
          </div>
          <div className="col-left">
            <div className="slider-wrap-lb">
              <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-lb" />
              <div className="inner-sw-lb text-center">
                <h4 className="font-9 title">Shop The Look</h4>
                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper; // store swiper instance
                  }}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // update active index
                  dir="ltr"
                  modules={[Pagination, Navigation]}
                  pagination={{ clickable: true, el: ".sw-pagination-lb" }}
                  navigation={{
                    nextEl: ".nav-next-lb",
                    prevEl: ".nav-prev-lb",
                  }}
                  className="swiper tf-sw-lb"
                >
                  {styledProducts.map((product) => (
                    <SwiperSlide className="swiper-slide" key={product.id}>
                      <div className="card-product style-2">
                        <div className="card-product-wrapper asp-ratio-0 rounded-0">
                          <Link
                            to={`/product-detail/${product.id}`}
                            className="product-img"
                          >
                            <img
                              className="img-product lazyload"
                              data-src={product.imgSrc}
                              alt="image-product"
                              width={540}
                              height={644}
                              src={product.imgSrc}
                            />
                            <img
                              className="img-hover lazyload"
                              data-src={product.hoverImage}
                              alt="image-product"
                              width={540}
                              height={644}
                              src={product.hoverImage}
                            />
                          </Link>
                          <ul className="list-product-btn">
                            <li
                              className={`wishlist ${
                                isAddedtoWishlist(product.id)
                                  ? "addwishlist"
                                  : ""
                              }`}
                            >
                              <a
                                onClick={() => addToWishlist(product.id)}
                                className={`hover-tooltip  box-icon`}
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
                                className={`hover-tooltip  box-icon quickview`}
                              >
                                <span className="icon icon-view" />
                                <span className="tooltip">Quick View</span>
                              </a>
                            </li>
                            <li className="compare">
                              <a
                                href="#compare"
                                onClick={() => addToCompareItem(product.id)}
                                data-bs-toggle="modal"
                                className={`hover-tooltip  box-icon`}
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

                        <div className="card-product-info font-2">
                          <Link
                            to={`/product-detail/${product.id}`}
                            className="name-product link text-md fw-medium font-9"
                          >
                            {product.title}
                          </Link>
                          <p className="price-wrap fw-medium">
                            <span className="price-new text-md font-9">
                              {product.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </span>
                            {product.oldPrice && (
                              <span className="price-old text-md font-9">
                                {product.oldPrice.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </span>
                            )}
                          </p>
                          <a
                            href="#shoppingCart"
                            data-bs-toggle="offcanvas"
                            onClick={() => addProductToCart(product.id)}
                            className="tf-btn btn-out-line-yellow rounded-0 font-9"
                          >
                            {isAddedToCartProducts(product.id)
                              ? "Already Added"
                              : "Add to Cart"}
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  <div className="d-flex d-xl-none sw-dot-default sw-pagination-lb justify-content-center" />
                </Swiper>
              </div>
              <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-lb" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
