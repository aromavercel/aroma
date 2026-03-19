"use client";
import { slides6 } from "@/data/heroSlides";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-sportwear slider-default">
      <Swiper
        className="swiper tf-sw-slideshow slider-effect-fade"
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        dir="ltr"
        autoplay
        loop
      >
        {slides6.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="image">
                <img
                  src={slide.imgSrc}
                  alt="slider"
                  className="lazyload"
                  width={1920}
                  height={1009}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="row">
                    <div className="col-xxl-4 col-md-6 col-12">
                      <div className="content-slider">
                        <div className="box-title-slider">
                          <h2 className="heading display-xl text-white fw-medium fade-item fade-item-1">
                            {slide.title}
                          </h2>
                          <p className="sub text-md text-white fade-item fade-item-2">
                            {slide.description}
                          </p>
                        </div>
                        <div className="box-btn-slider fade-item fade-item-3">
                          <Link
                            to={`/shop-default`}
                            className="tf-btn btn-white hover-primary"
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
            <div className="sw-dots style-white border-red sw-pagination-slider justify-content-center" />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
