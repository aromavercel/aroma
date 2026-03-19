"use client";
import { videoProducts } from "@/data/products";
import React, { useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Products2() {
  return (
    <section>
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Inspired by You</h4>
        </div>
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
              nextEl: ".nav-next-video",
              prevEl: ".nav-prev-video",
            },
            pagination: { el: ".sw-pagination-video", clickable: true },
            breakpoints: {
              576: { slidesPerView: 1.5, spaceBetween: 12, slidesPerGroup: 1 },
              768: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
              1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 3 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {videoProducts.map((product) => (
            <SwiperSlide className="swiper-slide" key={product.id}>
              <div className="cls-video">
                <video
                  className="hover-video"
                  width={464}
                  height={649}
                  playsInline
                  loop
                  autoPlay
                  muted
                >
                  <source src={product.videoSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="cls-content">
                  <div className="box-product">
                    <div className="img-product">
                      <img
                        alt={product.title}
                        className="lazyload"
                        src={product.imgSrc}
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className="info-product">
                      <Link
                        to={`/product-detail/${product.id}`}
                        className="name link fw-medium text-md text-white text-line-clamp-2"
                      >
                        {product.title}
                      </Link>
                      <p className="price-wrap fw-medium text-md text-white">
                        <span className="price-new">
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
                  <a
                    href="#quickView"
                    data-bs-toggle="modal"
                    className="icon hover-tooltip"
                  >
                    <i className="icon-view" />
                    <span className="tooltip">Quick view</span>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-video justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
