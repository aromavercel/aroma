"use client";
import { jewelryItems } from "@/data/collections";

import { Link } from "react-router-dom";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Categories() {
  return (
    <section className="flat-spacing-6 pt-0 overflow-hidden px-30">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper"
        {...{
          slidesPerView: 2,
          spaceBetween: 12,
          speed: 800,
          observer: true,
          observeParents: true,
          slidesPerGroup: 2,
          navigation: {
            clickable: true,
            nextEl: ".nav-next-category",
            prevEl: ".nav-prev-category",
          },
          pagination: { el: ".sw-pagination-category", clickable: true },
          breakpoints: {
            768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
            1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
          },
        }}
        modules={[Pagination, Navigation]}
      >
        {jewelryItems.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="wg-cls rounded-0 hover-img">
              <Link to={`/shop-default`} className="image img-style d-block">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="lazyload"
                  width={687}
                  height={938}
                />
              </Link>
              <div className="cls-content">
                <Link
                  to={`/shop-default`}
                  className="h3 btn-cls fw-normal link font-9 text-dark-7 d-flex gap-4"
                >
                  {item.title}
                  <span className="text-sm">{item.count}</span>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="d-flex d-xl-none sw-dot-default sw-pagination-category justify-content-center" />
      </Swiper>
    </section>
  );
}
