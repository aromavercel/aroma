"use client";
import { iconBoxes } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features2() {
  return (
    <>
      <div className="bg-white mx_40 my_20 radius-16 flat-iconbox line-2">
        <div className="container-5">
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
              pagination: { el: ".sw-pagination-iconbox", clickable: true },
              breakpoints: {
                575: { slidesPerView: 2, spaceBetween: 24 },
                1200: { slidesPerView: 3, spaceBetween: 60 },
                1440: { slidesPerView: 3, spaceBetween: 120 },
              },
            }}
            modules={[Pagination]}
          >
            {iconBoxes.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`tf-icon-box-v2 justify-content-center ${item.justify}`}
                >
                  <i className="icon icon-sun" />
                  <div className="title">{item.title}</div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="mx_40 my_20 d-xl-none mt-0">
        <div className="container">
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal mt-0"></div>
        </div>
      </div>
    </>
  );
}
