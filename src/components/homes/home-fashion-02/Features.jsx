"use client";
import { iconFeatures } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <div className="line-top flat-spacing-7">
      <div className="container">
        <div className="mw-1 m-auto">
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
                769: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 2 },
                1200: { slidesPerView: 4, spaceBetween: 50, slidesPerGroup: 2 },
              },
            }}
            modules={[Pagination]}
          >
            {iconFeatures.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="tf-icon-box style-3 wow fadeInLeft">
                  <div className="box-icon">
                    <i className={`icon ${item.iconClass}`} />
                  </div>
                  <div className="content">
                    <div className="title text-uppercase">{item.title}</div>
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
