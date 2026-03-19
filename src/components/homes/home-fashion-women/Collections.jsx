"use client";
import { categories6 } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <div>
      <Swiper
        dir="ltr"
        className="swiper tf-swiper"
        {...{
          slidesPerView: 1,
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
            575: { slidesPerView: 2, slidesPerGroup: 2 },
            1200: { slidesPerView: 3, slidesPerGroup: 3 },
          },
        }}
        modules={[Pagination, Navigation]}
      >
        {categories6.map((category, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="fs-cls lg hover-img">
              <div className="img-style image">
                <img
                  src={category.imgSrc}
                  alt="category"
                  className="lazyload"
                  width={960}
                  height={1230}
                />
              </div>
              <div className="content wow fadeInUp">
                <Link
                  to={`/shop-default`}
                  className="tf-btn font-2 btn-white hover-icon-2 hover-dark"
                >
                  {category.title}
                  <i className="icon-arrow-right icon" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="d-flex d-xl-none sw-dot-default sw-pagination-cls justify-content-center" />
      </Swiper>
    </div>
  );
}
