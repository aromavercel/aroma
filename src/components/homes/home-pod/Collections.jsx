"use client";
import { categories11 } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <section className="flat-spacing-21 pb-0">
      <div className="slider-layout-right wow fadeInUp">
        <div className="flat-title">
          <h3 className="title fw-bold text-dark text-start font-3 letter-0">
            Featured Collections
          </h3>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper tf-sw-right"
          {...{
            slidesPerView: 2,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            slidesPerGroup: 2,
            navigation: {
              clickable: true,
              nextEl: ".nav-next-cls",
              prevEl: ".nav-prev-cls",
            },
            pagination: { el: ".sw-pagination-cls", clickable: true },
            breakpoints: {
              768: { slidesPerView: 2.5, spaceBetween: 12, slidesPerGroup: 2 },
              992: { slidesPerView: 3.5, spaceBetween: 24, slidesPerGroup: 3 },
              1200: { slidesPerView: 4.5, spaceBetween: 24, slidesPerGroup: 3 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {categories11.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-cls rounded-0 style-abs type-3 hover-img">
                <Link to={`/shop-default`} className="image img-style d-block">
                  <img
                    src={item.imgSrc}
                    alt={item.label}
                    className="lazyload"
                    width={item.width}
                    height={item.height}
                  />
                </Link>
                <div className="cls-btn text-center">
                  <Link
                    to={`/shop-default`}
                    className="tf-btn text-md rounded-0 fw-medium btn-white hover-dark"
                  >
                    {item.label}
                    <i className="icon icon-arr-right" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-cls justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
