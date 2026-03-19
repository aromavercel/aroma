"use client";
import { iconFeatures2 } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <div className="line-top flat-spacing-5">
      <div className="container">
        <div className="mw-1 mx-auto">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            {...{
              slidesPerView: 1,
              spaceBetween: 12,
              speed: 800,
              preventInteractionOnTransition: false,
              touchStartPreventDefault: false,
              pagination: { el: ".sw-pagination-iconbox", clickable: true },
              breakpoints: {
                575: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                768: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 2 },
                1200: { slidesPerView: 4, spaceBetween: 42, slidesPerGroup: 2 },
              },
            }}
            modules={[Pagination]}
          >
            {iconFeatures2.map((feature, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="tf-icon-box style-2">
                  <div className="box-icon">
                    <i className={`icon ${feature.iconClass}`} />
                  </div>
                  <div className="content">
                    <div className="title font-9">{feature.title}</div>
                    <p className="desc font-2">{feature.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center" />
          </Swiper>
        </div>
      </div>
    </div>
  );
}
