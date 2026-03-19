"use client";
import { products33 } from "@/data/products";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";

export default function Products3() {
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
    <section className="s-banner-bundle s2-banner-bundle flat-spacing-27">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-xl-5">
            <div className="banner-bundle hover-img">
              <div className="image-banner radius-16 overflow-hidden shine-item img-style">
                <img
                  src="/images/banner/baby-2.jpg"
                  alt=""
                  className="lazyload"
                  width={586}
                  height={645}
                />
              </div>
              <div className="item">
                <img
                  alt=""
                  src="/images/section/item-baby2.png"
                  width="219"
                  height="237"
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-xl-7">
            <div className="bundle-wrap wow fadeInUp">
              <div className="flat-title mb-0">
                <h3 className="display-lg-4 fw-bold title text-dark-orange font-8">
                  Bundle &amp; Save
                </h3>
                <p className="desc text-md">
                  Get more for less with our curated baby bundles
                </p>
              </div>
              <div className="fl-control-sw2 wrap-pos-nav wow fadeInUp">
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
                    pagination: {
                      el: ".sw-pagination-bundle",
                      clickable: true,
                    },
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
                  {products33.map((product) => (
                    <SwiperSlide className="swiper-slide" key={product.id}>
                      <div className={`card-product ${product.style || ""}`}>
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
                              width={330}
                              height={435}
                            />
                            <img
                              className="img-hover lazyload"
                              data-src={product.imageHover}
                              alt="image-product"
                              src={product.imageHover}
                              width={330}
                              height={435}
                            />
                          </Link>
                          <ul className="list-product-btn">
                            <li>
                              <a
                                href="#shoppingCart"
                                onClick={() => addProductToCart(product.id)}
                                data-bs-toggle="offcanvas"
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
                                isAddedtoWishlist(product.id)
                                  ? "addwishlist"
                                  : ""
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
                                onClick={() => setQuickViewItem(product)}
                                data-bs-toggle="modal"
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
                          {product.discount && (
                            <div className="on-sale-wrap">
                              <span className="on-sale-item">
                                {product.discount}
                              </span>
                            </div>
                          )}
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
                            {product.oldPrice && (
                              <span className="price-old">
                                ${product.oldPrice.toFixed(2)}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  <div className="d-flex d-xl-none sw-dot-default sw-pagination-bundle justify-content-center" />
                </Swiper>
                <>
                  <div className="d-none d-xxl-flex swiper-button-prev nav-swiper nav-prev-bundle" />
                  <div className="d-none d-xxl-flex swiper-button-next nav-swiper nav-next-bundle" />
                </>
              </div>
              <div className="box-btn text-center">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-orange-2 animate-btn"
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
