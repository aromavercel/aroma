"use client";
import { products23 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import CountdownTimer from "@/components/common/Countdown";

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
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Top Picks This Month</h4>
          <p className="desc text-main text-md">
            Explore our most popular pieces that customers can't get enough of
          </p>
        </div>
        <div className="hover-sw-nav hover-sw-2 wow fadeInUp">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper wrap-sw-over"
            {...{
              slidesPerView: 2,
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
                768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {products23.map((product) => (
              <SwiperSlide className="swiper-slide" key={product.id}>
                <div className="card-product style-2 style-box-bg style-border-2 border-type-5">
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
                        width={453}
                        height={491}
                      />
                      <img
                        className="img-hover lazyload"
                        data-src={product.imgHover || product.imgSrc}
                        alt="image-product"
                        src={product.imgHover || product.imgSrc}
                        width={453}
                        height={491}
                      />
                      {product.discount && (
                        <div className="countdown-box style-2">
                          <div className="js-countdown">
                            <CountdownTimer style={1} />
                          </div>
                        </div>
                      )}
                    </Link>
                    {product.discount && (
                      <>
                        {Array.isArray(product.discount) ? (
                          <div className="on-sale-wrap type-2 flex-column">
                            {product.discount.map((item, index) => (
                              <span
                                key={index}
                                className={`on-sale-item ${item.toLowerCase()}`}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="on-sale-wrap">
                            <span className="on-sale-item">
                              {product.discount}
                            </span>
                          </div>
                        )}
                      </>
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
                            {isAddedtoWishlist(product.id)
                              ? "Remove Wishlist"
                              : "Add to Wishlist"}
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#quickView"
                          onClick={() => setQuickViewItem(product)}
                          data-bs-toggle="modal"
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
                    {" "}
                    <div className="inner-info-product">
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
                          <span className="price-old text-sm old-line">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="product-progress-sale">
                      <div
                        className="progress-sold progress"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <div
                          className={`progress-bar ${
                            product.available >= 50 ? "bg-green-2" : ""
                          }`}
                          style={{ width: product.progressWidth }}
                        />
                      </div>
                      <p className="text-avaiable text-sm">
                        Available:{" "}
                        <span
                          className={`fw-medium fw-medium ${
                            product.available >= 50
                              ? "text-success-5"
                              : "text-primary"
                          } `}
                        >
                          {product.available}
                        </span>
                      </p>
                    </div>{" "}
                    <div className="box-btn">
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        className="tf-btn btn-out-line-primary"
                        onClick={() => addProductToCart(product.id)}
                      >
                        {isAddedToCartProducts(product.id)
                          ? "Already Added"
                          : "Quick Add"}
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-top-pick justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-top-pick" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-top-pick" />
        </div>
      </div>
    </section>
  );
}
