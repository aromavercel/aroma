"use client";
import { products20 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import { useContextElement } from "@/context/Context";
import CountdownTimer from "@/components/common/Countdown";
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
    <section className="flat-spacing">
      <div className="container">
        <div className="flat-title style-between wow fadeInUp">
          <div className="box-title">
            <h4 className="title">Hot Deals</h4>
            <p className="desc text-main text-md">
              Explore our most popular pieces that customers can't get enough of
            </p>
          </div>
          <div className="wg-countdown-2">
            <span className="js-countdown">
              <CountdownTimer style={2} />
            </span>
          </div>
        </div>
        <div className="hover-sw-nav">
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
                nextEl: ".nav-next-deal",
                prevEl: ".nav-prev-deal",
              },
              pagination: { el: ".sw-pagination-deal", clickable: true },
              breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Navigation, Pagination]}
          >
            {products20.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div className="card-product style-2 style-border-2">
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
                        data-src={product.imgHover}
                        alt="image-product"
                        src={product.imgHover}
                        width={465}
                        height={480}
                      />
                    </Link>
                    {product.onSale && (
                      <div className="on-sale-wrap">
                        <span className="on-sale-item">20% Off</span>
                      </div>
                    )}
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
                          onClick={() => addToCompareItem(product.id)}
                          aria-controls="compare"
                          className="hover-tooltip box-icon"
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
                      className="name-product link fw-medium text-md"
                    >
                      {product.title}
                    </Link>
                    <p className="price-wrap fw-medium">
                      <span className="price-new text-primary">
                        ${product.price.toFixed(2)}
                      </span>{" "}
                      {product.oldPrice && (
                        <span className="price-old text-sm">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </p>
                    <div className="product-progress-sale">
                      <div
                        className="progress-sold progress"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className="progress-bar bg-purple"
                          style={{ width: `${product.salePercentage}%` }}
                        />
                      </div>
                      <div className="box-quantity d-flex justify-content-between">
                        <p className="text-sold text-sm">
                          Sold:{" "}
                          <span className="fw-medium text-primary">
                            {product.sold}
                          </span>
                        </p>
                        <p className="text-avaiable text-sm">
                          Available:{" "}
                          <span className="fw-medium fw-medium">
                            {product.available}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-deal justify-content-center" />
          </Swiper>
          <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-deal" />
          <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-deal" />
        </div>
      </div>
    </section>
  );
}
