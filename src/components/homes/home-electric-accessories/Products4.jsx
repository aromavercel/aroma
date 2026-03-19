"use client";
import { products22 } from "@/data/products";
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
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="flat-title style-between align-items-end wow fadeInUp">
          <div className="box-title">
            <h4 className="title">Top Picks</h4>
            <p className="desc text-main text-md">
              Explore our most popular pieces that customers can't get enough of
            </p>
          </div>
          <div className="box-nav-swiper style-2 d-none d-xl-flex">
            <div className="swiper-button-prev nav-swiper nav-prev-top-pick relative" />
            <div className="swiper-button-next nav-swiper nav-next-top-pick relative" />
          </div>
        </div>
        <div>
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            {...{
              slidesPerView: 1.5,
              spaceBetween: 12,
              speed: 800,
              observer: true,
              observeParents: true,
              slidesPerGroup: 2,
              navigation: {
                clickable: true,
                nextEl: ".nav-next-top-pick",
                prevEl: ".nav-prev-top-pick",
              },
              pagination: { el: ".sw-pagination-top-pick", clickable: true },
              breakpoints: {
                576: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {products22.map((product, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                {/* item {index + 1} */}
                <div className="card-product style-2 style-border-2 border-type-3">
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
                    {product.trending && (
                      <div className="on-sale-wrap">
                        <span className="on-sale-item trending">trending</span>
                      </div>
                    )}
                    {product.onSale && !product.trending && (
                      <div className="on-sale-wrap">
                        <span className="on-sale-item">20% Off</span>
                      </div>
                    )}

                    <ul className="list-product-btn">
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
                        <span className="price-old">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </p>
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      className="tf-btn btn-out-line-primary"
                      onClick={() => addProductToCart(product.id)}
                    >
                      {isAddedToCartProducts(product.id)
                        ? "Already Added"
                        : "Add to Cart"}
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-top-pick justify-content-center" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
