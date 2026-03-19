"use client";
import { categories8 } from "@/data/collections";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Collections() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title font-5">Pet Care Essentials</h4>
          <p className="desc text-main text-md">
            Shop by category for toys, grooming kits, and more.
          </p>
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
              nextEl: ".nav-next-pet-care",
              prevEl: ".nav-prev-pet-care",
            },
            pagination: { el: ".sw-pagination-pet-care", clickable: true },
            breakpoints: {
              768: { slidesPerView: 3, spaceBetween: 12, slidesPerGroup: 3 },
              1200: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {categories8.map((category, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-cls hover-img">
                <Link
                  to={`/shop-default`}
                  className="d-block radius-16 image img-style"
                >
                  <img
                    src={category.imgSrc}
                    alt={category.title}
                    className="lazyloaded"
                    width={513}
                    height={497}
                  />
                </Link>
                <div className="cls-content text-center">
                  <Link
                    to={`/shop-default`}
                    className="display-xs fw-medium link"
                  >
                    {category.title}
                  </Link>
                  <span className="count-item text-md">
                    {category.itemCount}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-pet-care justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
