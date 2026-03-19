"use client";
import { iconFeatures } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <div className="flat-spacing-18 bg-light-grey">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper tf-sw-iconbox-row"
          {...{
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            pagination: { el: ".sw-pagination-iconbox", clickable: true },
            breakpoints: {
              575: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
              992: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 2 },
              1200: { slidesPerView: 4, spaceBetween: 42, slidesPerGroup: 2 },
            },
          }}
          modules={[Pagination]}
        >
          {iconFeatures.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <div className="tf-icon-box style-3">
                <div className="box-icon bg-light-pink-6">
                  <i className={`icon ${elm.iconClass} text-white`} />
                </div>
                <div className="content text-start">
                  <div className="title fw-normal">{elm.title}</div>
                  <p className="desc">{elm.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center" />
        </Swiper>
      </div>
    </div>
  );
}
