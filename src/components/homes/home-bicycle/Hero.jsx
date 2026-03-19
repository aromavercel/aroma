"use client";
import { sliderItems } from "@/data/heroSlides";
import React from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-bicycle slider-default">
      <Swiper
        className="swiper tf-sw-slideshow slider-effect-fade"
        modules={[Autoplay]}
        autoplay
        loop
        dir="ltr"
      >
        {sliderItems.map((item, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="slider-wrap">
              <div className="image">
                <img
                  src={item.imgSrc}
                  alt="slider"
                  className="lazyload"
                  width={1920}
                  height={1035}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-10">
                      <div className="content-slider style-2">
                        <div className="box-title-slider">
                          <h2 className="heading display-xl-2 fw-medium fade-item fade-item-2">
                            {item.title}
                          </h2>
                          <p className="sub text-xl-2 text-main fade-item fade-item-3 text-main">
                            {item.subText}
                          </p>
                        </div>
                        <div className="box-btn-slider fade-item fade-item-4">
                          <Link
                            to={`/shop-default`}
                            className="tf-btn btn-space1 animate-btn btn-green-2"
                          >
                            Shop Collection
                            <i className="icon icon-arr-right3" />
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
            <div className="sw-dots style-2 sw-pagination-slider justify-content-center" />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
