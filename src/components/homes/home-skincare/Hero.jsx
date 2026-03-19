"use client";
import { slides5 } from "@/data/heroSlides";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-skincare slider-default">
      <Swiper
        className="swiper tf-sw-slideshow slider-effect-fade"
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 3000,
        }}
        speed={2500}
        loop
        pagination={{
          clickable: true,
          el: ".spdh2",
        }}
        dir="ltr"
      >
        {slides5.map((slide, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="slider-wrap">
              <div className="image">
                <img
                  src={slide.imgSrc}
                  alt=""
                  className="lazyload"
                  width={1920}
                  height={945}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="content-slider text-center">
                    <div className="box-title-slider">
                      <h2 className="heading display-xl-2 text-white fw-medium fade-item fade-item-1 ">
                        {slide.heading}
                      </h2>
                      <p className="sub text-xl-2 text-white fade-item fade-item-2">
                        {slide.subText}
                      </p>
                    </div>
                    <div className="box-btn-slider fade-item fade-item-3">
                      <Link
                        to={`/shop-default`}
                        className="tf-btn btn-white animate-btn animate-dark"
                      >
                        Shop Collection
                        <i className="icon icon-arr-right" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="wrap-pagination">
          <div className="container">
            <div className="sw-dots sw-pagination-slider justify-content-center spdh2" />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
