"use client";
import { sliderItems5 } from "@/data/heroSlides";
import React from "react";
import { EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-baby slider-default">
      <Swiper
        className="swiper tf-sw-slideshow slider-effect-fade"
        effect="fade"
        loop
        modules={[EffectFade, Pagination]}
        pagination={{
          clickable: true,
          el: ".spdh2",
        }}
        dir="ltr"
      >
        {sliderItems5.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="image">
                <img
                  src={slide.imgSrc}
                  alt="slider"
                  className="lazyload"
                  width={slide.imgWidth}
                  height={slide.imgHeight}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <h2 className="heading display-2xl-2 fw-bold text-dark-orange font-8 fade-item fade-item-1">
                        {slide.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <br className="d-none d-xl-block" />{" "}
                        {slide.title.split(" ").slice(-1)}
                      </h2>
                      <p className="sub text-md fade-item fade-item-2 text-dark-3">
                        {slide.description}
                      </p>
                    </div>
                    <div className="box-btn-slider fade-item fade-item-3">
                      <Link
                        to={`/shop-default`}
                        className="tf-btn btn-orange-2 animate-btn"
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
            <div className="sw-dots style-2 type-2 sw-pagination-slider justify-content-center spdh2" />
          </div>
        </div>
      </Swiper>
      <div className="clouds">
        <img
          alt=""
          src="/images/section/cloud1.svg"
          width={1920}
          height={328}
        />
      </div>
    </section>
  );
}
