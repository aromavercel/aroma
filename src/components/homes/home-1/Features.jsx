"use client";
import { iconFeatures } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features({
  parentClass = "line-top flat-spacing-5",
  titleClass = "title",
}) {
  return (
    <div className={parentClass}>
      <div className="container">
        <div className="mw-1 m-auto">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper wow fadeInUp"
            {...{
              slidesPerView: 1,
              spaceBetween: 12,
              speed: 800,
              observer: true,
              observeParents: true,
              pagination: { el: ".sw-pagination-iconbox", clickable: true },
              breakpoints: {
                575: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                768: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 2 },
                1200: { slidesPerView: 4, spaceBetween: 42, slidesPerGroup: 2 },
              },
            }}
            modules={[Pagination]}
          >
            {iconFeatures.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="tf-icon-box style-2">
                  <div className="box-icon">
                    <i className={`icon ${item.iconClass}`} />
                  </div>
                  <div className="content">
                    <div className={titleClass}>{item.title}</div>
                    <p className="desc">{item.description}</p>
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
