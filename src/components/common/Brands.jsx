"use client";
import { brandItems } from "@/data/brands";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Brands({ parentClass = "" }) {
  return (
    <div className={parentClass}>
      <div className="container">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper sw-brand"
          {...{
            slidesPerView: 2,
            spaceBetween: 0,
            speed: 800,
            observer: true,
            observeParents: true,
            slidesPerGroup: 2,
            pagination: { el: ".sw-pagination-brand", clickable: true },
            breakpoints: {
              575: { slidesPerView: 3 },
              991: { slidesPerView: 4 },
              1200: { slidesPerView: 6 },
            },
          }}
          modules={[Pagination]}
        >
          {brandItems.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className="brand-item wow fadeInLeft"
                {...(item.wowDelay && { "data-wow-delay": item.wowDelay })}
              >
                <img alt="brand" src={item.imgSrc} width={360} height={171} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="d-flex d-xl-none sw-dot-default sw-pagination-brand justify-content-center" />
      </div>
    </div>
  );
}
