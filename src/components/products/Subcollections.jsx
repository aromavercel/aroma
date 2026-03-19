"use client";
import { categories13 } from "@/data/collections";

import { Link } from "react-router-dom";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Subcollections({ parentClass = "flat-spacing-4" }) {
  return (
    <div className={parentClass}>
      <div className="container">
        <div className="fl-control-sw pos1">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper hover-sw-nav wow fadeInUp"
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
                768: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 3 },
                1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 3 },
              },
            }}
            modules={[Navigation, Pagination]}
          >
            {categories13.map((category) => (
              <SwiperSlide className="swiper-slide" key={category.id}>
                <div className="wg-cls style-abs2 hover-img">
                  <Link to={`/shop-default`} className="image-wrap relative">
                    <div className="image img-style">
                      <img
                        src={category.image}
                        alt=""
                        className="lazyload"
                        width={696}
                        height={696}
                      />
                    </div>
                    <div className="cls-btn text-center">
                      <button className="tf-btn btn-white hover-dark">
                        View all
                      </button>
                    </div>
                    <span className="tf-overlay" />
                  </Link>
                  <div className="cls-content text-center">
                    <Link
                      to={`/shop-default`}
                      className="text-type text-xl-2 fw-medium link"
                    >
                      {category.name}
                    </Link>
                    <span className="count-item body-text-2 text-main">
                      {category.items}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-cls justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-cls" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-cls" />
        </div>
      </div>
    </div>
  );
}
