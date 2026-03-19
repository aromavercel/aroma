"use client";
import { categoryData } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section className="flat-spacing-11">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Categories</h4>
        </div>
        <Swiper
          dir="ltr"
          className="wow fadeInUp swiper tf-swiper xl-px-26"
          {...{
            slidesPerView: 2,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            slidesPerGroup: 2,
            navigation: {
              clickable: true,
              nextEl: ".nav-next-cate",
              prevEl: ".nav-prev-cate",
            },
            pagination: { el: ".sw-pagination-cate", clickable: true },
            breakpoints: {
              575: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 2 },
              768: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 3 },
              1200: { slidesPerView: 6, spaceBetween: 64, slidesPerGroup: 3 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {categoryData.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-cls style-circle hover-img">
                <Link to={`/shop-default`} className="image img-style d-block">
                  <img
                    src={item.imgSrc}
                    alt="categories"
                    className="lazyload"
                    width={534}
                    height={534}
                  />
                </Link>
                <div className="cls-content text-center">
                  <Link to={`/shop-default`} className="link text-xl fw-medium">
                    {item.title}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <span className="d-flex d-xl-none sw-dot-default sw-pagination-cate justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
