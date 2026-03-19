"use client";
import { slides3 } from "@/data/heroSlides";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <section className="tf-slideshow slider-furniture slider-style-2">
        <Swiper
          className="swiper tf-sw-slideshow slider-effect-fade"
          modules={[EffectFade, Autoplay, Pagination]}
          pagination={{
            clickable: true,
            el: ".sph",
          }}
          autoplay
          loop
          effect="fade"
          dir="ltr"
        >
          {slides3.map((slide, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="slider-wrap">
                <div className="box-content-left">
                  <div className="container">
                    <div className="content-slider text-center">
                      <div className="box-title-slider">
                        <h2 className="heading letter-0 text-white fw-medium fade-item fade-item-1">
                          {slide.title}
                        </h2>
                        <p className="sub text-white text-md text-line-clamp-1 fade-item fade-item-2">
                          {slide.subtitle}
                        </p>
                      </div>
                      <div className="box-btn-slider fade-item fade-item-3">
                        <Link
                          to={`/shop-default`}
                          className="tf-btn btn-out-line-white"
                        >
                          Shop Collection
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="image">
                  <img
                    src={slide.imgSrc}
                    alt={slide.imgAlt}
                    className="lazyload"
                    width={960}
                    height={953}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="wrap-pagination">
            <div className="container">
              <div className="sw-dots style-white sw-pagination-slider justify-content-center sph" />
            </div>
          </div>
        </Swiper>
      </section>
    </>
  );
}
