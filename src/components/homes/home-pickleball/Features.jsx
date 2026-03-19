"use client";
import { serviceItems } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <div className="">
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper flat-spacing-18 line-bt"
          {...{
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 800,
            preventInteractionOnTransition: false,
            touchStartPreventDefault: false,
            pagination: { el: ".sw-pagination-iconbox", clickable: true },
            breakpoints: {
              575: { slidesPerView: 2, spaceBetween: 12 },
              992: { slidesPerView: 3, spaceBetween: 24 },
            },
          }}
          modules={[Pagination]}
        >
          {serviceItems.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="tf-icon-box style-3 justify-content-center">
                <div className="box-icon">
                  <i className={`icon ${item.iconClass}`} />
                </div>
                <div className="content">
                  <div className="title font-10">{item.title}</div>
                  <p className="text-grey-3">{item.description}</p>
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
