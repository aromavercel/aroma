"use client";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { jewelryProducts } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { useContextElement } from "@/context/Context";
import { Navigation, Pagination } from "swiper/modules";

export default function Lookbook() {
  const {
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    setQuickViewItem,
    addProductToCart,
    isAddedToCartProducts,
  } = useContextElement();

  const swiperRef = useRef(null);
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-wrapper-lookbook wow fadeInUp">
          <div className="col-left">
            <div className="slider-wrap-lb">
              <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-lb snbpj1" />
              <div className="inner-sw-lb text-center">
                <h4 className="font-2 title">Shop The Look</h4>
                <Swiper
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  dir="ltr"
                  className="swiper tf-sw-lb"
                  modules={[Navigation, Pagination]}
                  pagination={{
                    clickable: true,
                    el: ".spdj1",
                  }}
                  navigation={{
                    prevEl: ".snbpj1",
                    nextEl: ".snbnj1",
                  }}
                >
                  {jewelryProducts.map((product) => (
                    <SwiperSlide key={product.id} className="swiper-slide">
                      <div className="card-product style-2">
                        <div className="card-product-wrapper asp-ratio-0 rounded-0">
                          <Link
                            href="/product-detail/${product.id}"
                            className="product-img"
                          >
                            <img
                              className="img-product lazyload"
                              data-src={product.imgSrc}
                              alt={product.title}
                              src={product.imgSrc}
                              width={product.width}
                              height={product.height}
                            />
                            <img
                              className="img-hover lazyload"
                              data-src={product.title}
                              alt={product.imgSrc}
                              src={product.imgSrc}
                              width={product.width}
                              height={product.height}
                            />
                          </Link>

                          {(product.discount || product.badge) && (
                            <div className="on-sale-wrap pos1 type-2 flex-column">
                              {product.discount && (
                                <span className="on-sale-item rounded-0">
                                  {product.discount}
                                </span>
                              )}
                              {product.badge && (
                                <span className="on-sale-item rounded-0 bg-brown-3">
                                  {product.badge}
                                </span>
                              )}
                            </div>
                          )}

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
                        </div>

                        <div className="card-product-info font-2">
                          <Link
                            href="/product-detail/${product.id}"
                            className="name-product link text-md fw-medium font-2"
                          >
                            {product.title}
                          </Link>
                          <p className="price-wrap fw-medium">
                            <span className="price-new text-primary text-md">
                              ${product.price.toFixed(2)}
                            </span>{" "}
                            <span className="price-old text-dark text-md">
                              ${product.oldPrice.toFixed(2)}
                            </span>
                          </p>
                          <a
                            href="#shoppingCart"
                            data-bs-toggle="offcanvas"
                            onClick={() => addProductToCart(product.id)}
                            className="tf-btn btn-out-line-yellow rounded-0"
                          >
                            {isAddedToCartProducts(product.id)
                              ? "Already Added"
                              : "Add to Cart"}
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}

                  <div className="d-flex d-xl-none sw-dot-default sw-pagination-lb justify-content-center spdj1" />
                </Swiper>
              </div>
              <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-lb snbnj1" />
            </div>
          </div>
          <div className="col-right">
            <div className="image-lookbook">
              <img
                className="lazyload"
                src="/images/banner/banner-lookbook.jpg"
                alt=""
                width={740}
                height={846}
              />
              <div
                className="tf-pin-btn2 active sw-btn pin-1"
                onClick={() => swiperRef.current.slideTo(0)}
                data-slide={0}
              >
                <span />
              </div>
              <div
                className="tf-pin-btn2 sw-btn pin-2"
                data-slide={1}
                onClick={() => swiperRef.current.slideTo(1)}
              >
                <span />
              </div>
              <div
                className="tf-pin-btn2 sw-btn pin-3"
                data-slide={2}
                onClick={() => swiperRef.current.slideTo(2)}
              >
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
