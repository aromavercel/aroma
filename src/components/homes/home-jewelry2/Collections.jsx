"use client";
import { collections2 } from "@/data/collections";

import { Link } from "react-router-dom";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Collections() {
  return (
    <div className="px-30 flat-spacing-3 pt-0">
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
            nextEl: ".nav-next-cls",
            prevEl: ".nav-prev-cls",
          },
          pagination: { el: ".sw-pagination-cls", clickable: true },
          breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 15, slidesPerGroup: 2 },
            1200: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
          },
        }}
        modules={[Pagination, Navigation]}
      >
        {collections2.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="wg-cls-2 hover-img">
              <Link
                to={`/shop-default`}
                className="img-style img-box rounded-0"
              >
                <img
                  src={item.imageSrc}
                  alt="banner-cls"
                  className="lazyload"
                  width={1373}
                  height={783}
                />
              </Link>
              <div className="content">
                <div className="box-title">
                  <h4 className="title font-9 fw-normal">
                    <Link to={`/shop-default`} className="link">
                      {item.title}
                    </Link>
                  </h4>
                </div>
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-line-dark fw-normal"
                >
                  <span className="text-md">{item.buttonText}</span>
                  <i className="icon icon-arrow-top-left fs-7" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <span className="d-flex d-xl-none sw-dot-default sw-pagination-cls justify-content-center" />
      </Swiper>
    </div>
  );
}
