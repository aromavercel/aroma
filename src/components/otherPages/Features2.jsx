"use client";
import { features2 } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features2() {
  return (
    <section className="flat-spacing-3 pt-0">
      <div className="container">
        <div className="flat-title-2 d-xl-flex justify-content-xl-between">
          <div className="box-title">
            <p className="display-md-2 fw-medium">Style Curated Just for You</p>
            <p className="text-xl">Style Curated Just for You</p>
          </div>
          <div className="box-text">
            <p className="text-md">
              Our skilled stylists have thoughtfully assembled seasonal outfits
              that are both <br className="d-none d-xl-block" />
              trendy and timeless. With a variety of looks, they’re here to
              inspire your next <br className="d-none d-xl-block" />
              fashion-forward ensemble.
            </p>
          </div>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          {...{
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            pagination: { el: ".sw-pagination-iconbox", clickable: true },
            breakpoints: {
              575: { slidesPerView: 2, spaceBetween: 12 },
              992: { slidesPerView: 3, spaceBetween: 24 },
            },
          }}
          modules={[Pagination]}
        >
          {features2.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="tf-icon-box style-border">
                <div className="box-icon">
                  <i className={`icon ${item.icon}`} />
                </div>
                <div className="content">
                  <h6>{item.title}</h6>
                  <p className="text-sm text-line-clamp-4">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
