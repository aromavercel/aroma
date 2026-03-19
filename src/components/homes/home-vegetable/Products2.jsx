"use client";
import { products24 } from "@/data/products";
import React from "react";
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

  return (
    <section>
      <div className="container">
        <div className="flat-title text-start wow fadeInUp">
          <h4 className="title text-brown">Weekly Discount</h4>
          <p className="desc text-main text-md">
            Stock up and save with exclusive weekend offers — only for a limited
            time!
          </p>
        </div>
        <div className="fl-control-sw2">
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
                nextEl: ".nav-next-discount",
                prevEl: ".nav-prev-discount",
              },
              pagination: { el: ".sw-pagination-discount", clickable: true },
              breakpoints: {
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {products24.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div className="card-product style-space-2 radius-16 line">
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
                          className="bg-surface hover-tooltip tooltip-left box-icon quickview"
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
                            {isAddedtoCompareItem(product.id)
                              ? "Already compared"
                              : "Add to Compare"}
                          </span>
                        </a>
                      </li>
                    </ul>
                    {product.discount && (
                      <div className="on-sale-wrap">
                        <span className="on-sale-item">{product.discount}</span>
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
                        <span className="price-old old-line">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </p>
                    <p className="price-recent-per text-xs">
                      {product.priceRecent}
                    </p>
                    <a
                      href="#shoppingCart"
                      data-bs-toggle="offcanvas"
                      className="tf-btn btn-primary primary-2 animate-btn mt-0"
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
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-discount justify-content-center" />
          </Swiper>
          <div className="swiper-button-next d-none d-xl-flex nav-swiper nav-next-discount" />
          <div className="swiper-button-prev d-none d-xl-flex nav-swiper nav-prev-discount" />
        </div>
      </div>
    </section>
  );
}
