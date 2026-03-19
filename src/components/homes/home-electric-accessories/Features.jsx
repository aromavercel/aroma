"use client";

import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="line-top flat-spacing-5">
      <div className="container">
        <div className="mw-1 mx-auto">
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
                575: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                768: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 2 },
                1200: { slidesPerView: 4, spaceBetween: 42, slidesPerGroup: 2 },
              },
            }}
            modules={[Pagination]}
          >
            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-2">
                <div className="box-icon">
                  <i className="icon icon-shipping text-primary" />
                </div>
                <div className="content">
                  <div className="title">FREE DELIVERY</div>
                  <p className="desc">Enjoy free delivery on all orders</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-2">
                <div className="box-icon">
                  <i className="icon icon-payment text-primary" />
                </div>
                <div className="content">
                  <div className="title">SERCURED PAYMENT</div>
                  <p className="desc">Sercured payment</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-2">
                <div className="box-icon">
                  <i className="icon icon-return text-primary" />
                </div>
                <div className="content">
                  <div className="title">EASY RETURNS</div>
                  <p className="desc">Within 14 days for a return</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <div className="tf-icon-box style-2">
                <div className="box-icon">
                  <i className="icon icon-support text-primary" />
                </div>
                <div className="content">
                  <div className="title">24/7 SUPPORT</div>
                  <p className="desc">Outstanding premium support</p>
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
