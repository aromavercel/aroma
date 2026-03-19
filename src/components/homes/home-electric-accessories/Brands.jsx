"use client";
import { brandItems } from "@/data/brands";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Brands() {
  return (
    <section className="flat-spacing">
      <div className="container">
        <div className="flat-title style-between align-items-end wow fadeInUp">
          <div className="box-title">
            <h4 className="title">Shop by Brands</h4>
            <p className="desc text-main text-md">
              Explore our most popular pieces that customers can't get enough of
            </p>
          </div>
          <div className="box-nav-swiper style-2 d-none d-xl-flex">
            <div className="swiper-button-prev nav-swiper nav-prev-brand relative" />
            <div className="swiper-button-next nav-swiper nav-next-brand relative" />
          </div>
        </div>
        <Swiper
          dir="ltr"
          className="wow fadeInUp swiper tf-swiper sw-brand border-0"
          {...{
            slidesPerView: 2,
            spaceBetween: 6,
            speed: 800,
            observer: true,
            slidesPerGroup: 2,
            pagination: { el: ".sw-pagination-brand", clickable: true },
            navigation: {
              clickable: true,
              nextEl: ".nav-next-brand",
              prevEl: ".nav-prev-brand",
            },
            breakpoints: {
              575: { slidesPerView: 3 },
              991: { slidesPerView: 4 },
              1200: { slidesPerView: 6 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {brandItems.map((elm, i) => (
            <SwiperSlide key={i} className="swiper-slide">
              <div className="brand-item line radius-8">
                <img alt="brand" src={elm.imgSrc} width={360} height={171} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="d-flex d-xl-none sw-dot-default sw-pagination-brand justify-content-center" />
      </div>
    </section>
  );
}
