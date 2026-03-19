"use client";
import { products24 } from "@/data/products";
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
    <section className="">
      <div className="container">
        <div className="flat-title style-between wow fadeInUp">
          <div className="box-title">
            <h4 className="title text-brown">Today’s Best Offer</h4>
            <p className="desc text-main text-md">
              Grab fresh deals at unbeatable prices!
            </p>
          </div>
          <div className="wg-countdown-2 color-1">
            <span
              className="js-countdown"
              data-timer={46556}
              data-labels="Days,Hours,Mins,Secs"
            >
              <CountdownTimer style={2} />
            </span>
          </div>
        </div>
        <div className="fl-control-sw2">
          <Swiper
            dir="ltr"
            className="sw-height swiper tf-swiper"
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
            modules={[Pagination, Navigation]}
          >
            {products24.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div className="card-product style-space radius-16 line">
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
                    {product.discount && (
                      <div className="on-sale-wrap">
                        <span className="on-sale-item">{product.discount}</span>
                      </div>
                    )}
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
                  </div>
                  <div className="card-product-info text-center">
                    <Link
                      to={`/product-detail/${product.id}`}
                      className="name-product link fw-medium text-md"
                    >
                      {product.title}
                    </Link>
                    <p className="price-wrap fw-medium">
                      <span className="price-new text-primary text-xl-2">
                        ${product.priceString}
                      </span>{" "}
                      {product.oldPrice && (
                        <span className="price-old text-sm old-line">
                          ${product.oldPriceString}
                        </span>
                      )}
                    </p>
                    <p className="price-recent-per text-xs">
                      {product.priceRecent}
                    </p>
                    <div className="product-progress-sale">
                      <div
                        className="progress-sold progress"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className={`progress-bar ${
                            product.available >= 30
                              ? "bg-green-2"
                              : "bg-primary"
                          } `}
                          style={{ width: product.progressWidth }}
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
