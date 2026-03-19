"use client";
import { slides4 } from "@/data/heroSlides";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="tf-slideshow slider-fashion-3 slider-default space-abs-header">
      <Swiper
        className="swiper tf-sw-slideshow slider-effect-fade"
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay
        loop
        pagination={{
          clickable: true,
          el: ".spdh",
        }}
        dir="ltr"
      >
        {slides4.map((slide, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className={`slider-wrap ${slide.bgType}`}>
              <div className="image">
                <img
                  src={slide.imgSrc}
                  alt="slider"
                  className="lazyload"
                  width={1920}
                  height={1040}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-7 col-10">
                      <div className="content-slider style-2 text-center">
                        <div className="box-title-slider">
                          <p className="body-text-2 fw-semibold fade-item fade-item-1 font-2">
                            {slide.description}
                          </p>
                          <div className="heading display-lg-3 fade-item fade-item-2 font-2">
                            {slide.title}
                          </div>
                          <p className="sub text-md fade-item fade-item-3 text-main">
                            {slide.subtitle}
                          </p>
                        </div>
                        <div className="box-btn-slider fade-item fade-item-4">
                          <Link
                            to={`/shop-default`}
                            className="tf-btn animate-btn font-2"
                          >
                            Shop Collection
                            <i className="icon icon-arr-right" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="wrap-pagination">
          <div className="container">
            <div className="sw-dots sw-pagination-slider justify-content-center spdh" />
          </div>
        </div>
      </Swiper>
    </div>
  );
}
