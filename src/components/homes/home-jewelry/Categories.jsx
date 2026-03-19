"use client";
import { categoryItems2 } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section className="flat-spacing-3 overflow-hidden">
      <div className="container">
        <div className="flat-title style-line wow fadeInUp">
          <div className="line-title" />
          <h4 className="title lette-space-0 font-2">
            Discover Our Categories
          </h4>
        </div>
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
          {categoryItems2.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-cls rounded-0 style-02 hover-img">
                <Link to={`/shop-default`} className="image img-style d-block">
                  <img
                    src={item.imgSrc}
                    alt=""
                    className="lazyload"
                    width={513}
                    height={665}
                  />
                </Link>
                <div className="cls-content text-center">
                  <Link
                    to={`/shop-default`}
                    className="btn-cls fw-medium link font-2"
                  >
                    <span className="text">{item.text}</span>
                    <i className="icon icon-arrow1-top-left" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-category justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
