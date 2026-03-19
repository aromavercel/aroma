"use client";
import { sliderItems3 } from "@/data/heroSlides";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-default">
      <Swiper
        className="swiper tf-sw-slideshow slider-effect-fade"
        modules={[Autoplay, EffectFade, Pagination]}
        loop
        pagination={{
          clickable: true,
          el: ".spdh2",
        }}
        autoplay
        effect="fade"
        dir="ltr"
      >
        {sliderItems3.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="image">
                <img
                  src={item.imgSrc}
                  alt="slider"
                  className="lazyload"
                  width={1920}
                  height={909}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="content-slider text-center">
                        <div className="box-title-slider">
                          <h2 className="heading display-xl-2 text-white fw-medium fade-item fade-item-1 font-2">
                            {item.title}
                          </h2>
                        </div>
                        <div className="box-btn-slider fade-item fade-item-3">
                          <Link
                            to={`/shop-default`}
                            className="tf-btn btn-large fw-normal btn-yellow font-2 rounded-0 animate-btn"
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
            <div className="sw-dots style-grey border-red sw-pagination-slider justify-content-center spdh2" />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
