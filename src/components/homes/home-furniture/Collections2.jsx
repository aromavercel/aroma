"use client";
import { categories5 } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Collections2() {
  return (
    <div>
      <div className="container">
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
            navigation: {
              clickable: true,
              nextEl: ".nav-next-cls",
              prevEl: ".nav-prev-cls",
            },
            pagination: { el: ".sw-pagination-cls", clickable: true },
            breakpoints: {
              768: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
              1200: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {categories5.map((category, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-cls-2 hover-img">
                <Link to={`/shop-default`} className="img-style img-box">
                  <img
                    src={category.imgSrc}
                    alt={category.imgAlt}
                    className="lazyload"
                    width={1062}
                    height={932}
                  />
                </Link>
                <div className="content">
                  <div className="box-title">
                    <h6 className="title">
                      <Link to={`/shop-default`} className="link">
                        {category.title}
                      </Link>
                    </h6>
                    <p className="text-md text-main">{category.description}</p>
                  </div>
                  <Link to={`/shop-default`} className="tf-btn animate-btn">
                    Shop Now
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <span className="d-flex d-xl-none sw-dot-default sw-pagination-cls justify-content-center" />
        </Swiper>
      </div>
    </div>
  );
}
