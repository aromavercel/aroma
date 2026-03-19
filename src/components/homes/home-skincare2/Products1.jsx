"use client";
import { useContextElement } from "@/context/Context";
import { skincareProductData } from "@/data/products";

import { Link } from "react-router-dom";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products1() {
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
    <section className="flat-spacing-30 pt-0 section-bought-together">
      <div className="container">
        <h3 className="title fw-normal fst-italic font-3 letter-0 md-px-0">
          Bought Together
        </h3>
        <div className="wrapper">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            {...{
              slidesPerView: 1,
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
                575: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 1 },
                1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 1 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {skincareProductData.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div className="card-product style-wishlist style-3 card-product-size">
                  <div className="card-product-wrapper">
                    <Link
                      to={`/product-detail/${product.id}`}
                      className="product-img"
                    >
                      <img
                        className="img-product lazyload"
                        data-src={product.imgSrc}
                        alt={`image-product-${product.id}`}
                        src={product.imgSrc}
                        width={513} // You might need to adjust width/height based on actual images
                        height={513}
                      />
                      <img
                        className="img-hover lazyload"
                        data-src={product.hoverImage}
                        alt={`image-product-hover-${product.id}`}
                        src={product.hoverImage}
                        width={513}
                        height={513}
                      />
                    </Link>
                    <ul className="list-product-btn">
                      <li>
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
                    <div className="sub fw-medium text-grey-3 text-xs">
                      {product.category}
                    </div>
                    <Link
                      to={`/product-detail/${product.id}`}
                      className="name-product link fw-normal text-xl"
                    >
                      {product.title}
                    </Link>
                    <p className="price-wrap fw-medium d-flex justify-content-center align-items-center gap-8">
                      <span className="price-new text-red-3 text-xl">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.oldPrice && (
                        <span className="price-old text-sm">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </p>
                    <div className="line-top" />
                    <ul className="list-infor">
                      {product.inforItems &&
                        product.inforItems.map((item, index) => (
                          <li className="item" key={index}>
                            {" "}
                            {/* Using index as key if items are static */}
                            <svg
                              width={21}
                              height={22}
                              viewBox="0 0 21 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.504 1.81775C15.5773 1.81775 19.6916 5.93207 19.6916 11.0053C19.6916 16.0786 15.5773 20.1929 10.504 20.1929C5.43073 20.1929 1.31641 16.0786 1.31641 11.0053C1.31641 5.93207 5.43073 1.81775 10.504 1.81775ZM8.59609 13.9895L6.34674 11.7383C5.96353 11.3549 5.96345 10.7296 6.34674 10.3463C6.73011 9.96297 7.35817 9.96537 7.73875 10.3463L9.32453 11.9333L13.2694 7.9884C13.6528 7.60503 14.2781 7.60503 14.6614 7.9884C15.0448 8.37169 15.0442 8.99758 14.6614 9.38041L10.0194 14.0224C9.63659 14.4052 9.01069 14.4058 8.6274 14.0224C8.61663 14.0116 8.60624 14.0007 8.59609 13.9895Z"
                                fill="#BD6717"
                              />
                            </svg>
                            <div className="text-md fs-14 text-grey-3">
                              {item}
                            </div>
                          </li>
                        ))}
                    </ul>
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      onClick={() => addProductToCart(product.id)}
                      className="tf-btn btn-outline-orange"
                    >
                      {isAddedToCartProducts(product.id)
                        ? "Already Added"
                        : "Add to Cart"}
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-hot justify-content-center" />
          </Swiper>
        </div>
      </div>
    </section>
  );
}
