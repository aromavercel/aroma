"use client";
import { categoryItems3 } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <section className="flat-spacing pb-0">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h3 className="fw-bold display-lg-4 title font-8 text-dark-orange">
            Browse by Baby Needs
          </h3>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper wow fadeInUp"
          {...{
            slidesPerView: 2,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            slidesPerGroup: 2,
            navigation: {
              clickable: true,
              nextEl: ".nav-next-categories",
              prevEl: ".nav-prev-categories",
            },
            pagination: { el: ".sw-pagination-categories", clickable: true },
            breakpoints: {
              575: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 2 },
              768: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 3 },
              1200: { slidesPerView: 6, spaceBetween: 24, slidesPerGroup: 3 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {categoryItems3.map((item) => (
            <SwiperSlide key={item.id} className="swiper-slide">
              <div className="wg-cls style-circle2 bg-light-blue-3 style-circle hover-img">
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
                  <Link to={`/shop-default`} className="link text-md fw-medium">
                    {item.title}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <span className="d-flex d-xl-none sw-dot-default sw-pagination-categories justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
