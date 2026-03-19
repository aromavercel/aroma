"use client";
import { handcraftSlides } from "@/data/heroSlides";

import { Link } from "react-router-dom";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <div className="slider-style-3 slider-default mt_40">
      <Swiper
        dir="ltr"
        className="swiper tf-swiper slider-effect-fade"
        {...{
          slidesPerView: 1,
          spaceBetween: 0,
          loop: true,
          centeredSlides: true,
          speed: 800,
          pagination: { el: ".sw-pagination-slider", clickable: true },
          breakpoints: {
            768: { slidesPerView: 1.32, spaceBetween: 24 },
            1200: { slidesPerView: 1.32, spaceBetween: 40 },
          },
        }}
        onSwiper={(swiper) => {
          swiper.slideTo(1);
        }}
        modules={[Pagination]}
      >
        {handcraftSlides.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="image">
                <img
                  src={slide.image}
                  alt="slider"
                  className="lazyload"
                  width={1440}
                  height={704}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <div
                        className="sub mb_10 fade-item fade-item-1 fw-medium body-text font-9"
                        dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                      />
                      <div
                        className="heading font-9 fade-item fade-item-2 fw-normal display-xl-2 text-dark-8"
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      />
                    </div>
                    <div className="box-btn-slider fade-item fade-item-3">
                      <Link
                        to={`/shop-default`}
                        className="tf-btn btn-large font-2 text-uppercase animate-btn bg-brown-14 border-0"
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="wrap-pagination">
        <div className="container">
          <div className="d-flex sw-dots style-dark sw-pagination-slider justify-content-center" />
        </div>
      </div>
    </div>
  );
}
