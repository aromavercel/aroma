"use client";
import { iconFeatures } from "@/data/features";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Features() {
  return (
    <div className="line-top flat-spacing-7">
      <div className="container">
        <div className="mw-1 m-auto wow fadeInUp">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper sw-auto tf-sw-iconbox-row"
            {...{
              slidesPerView: 1,
              spaceBetween: 12,
              speed: 800,
              observer: true,
              observeParents: true,
              pagination: { el: ".sw-pagination-iconbox", clickable: true },
              breakpoints: {
                575: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                768: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 2 },
                1200: {
                  slidesPerView: "auto",
                  spaceBetween: 59,
                  slidesPerGroup: 2,
                },
              },
            }}
            modules={[Pagination]}
          >
            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-3">
                <div className="box-icon line-black">
                  <i className="icon icon-shipping" />
                </div>
                <div className="content">
                  <div className="title text-uppercase">Free Shipping</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-3">
                <div className="box-icon line-black">
                  <i className="icon icon-gift" />
                </div>
                <div className="content">
                  <div className="title text-uppercase">Gift Package</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-3">
                <div className="box-icon line-black">
                  <i className="icon icon-return" />
                </div>
                <div className="content">
                  <div className="title text-uppercase">Free Returns</div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-3">
                <div className="box-icon line-black">
                  <i className="icon icon-support" />
                </div>
                <div className="content">
                  <div className="title text-uppercase">PREMIUM SUPPORT</div>
                </div>
              </div>
            </SwiperSlide>

            <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center" />
          </Swiper>
        </div>
      </div>
    </div>
  );
}
