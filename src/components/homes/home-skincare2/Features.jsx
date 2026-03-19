"use client";
import { iconFeatures3 } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <div className="bg-gradient-8">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper flat-spacing-18"
          {...{
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 800,
            preventInteractionOnTransition: false,
            touchStartPreventDefault: false,
            pagination: { el: ".sw-pagination-iconbox", clickable: true },
            breakpoints: {
              575: { slidesPerView: 2, spaceBetween: 12 },
              992: { slidesPerView: 4, spaceBetween: 24 },
            },
          }}
          modules={[Pagination]}
        >
          {iconFeatures3.map((feature, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="tf-icon-box style-3">
                <div className="box-icon">
                  <i className={`icon ${feature.iconClass}`} />
                </div>
                <div className="content">
                  <div className="title">{feature.title}</div>
                  <p className="desc">{feature.description}</p>
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
