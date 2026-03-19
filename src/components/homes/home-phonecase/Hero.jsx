"use client";
import { sliderData } from "@/data/heroSlides";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-phonecase slider-default">
      <Swiper
        className="swiper tf-sw-slideshow slider-effect-fade"
        modules={[EffectFade, Autoplay, Pagination]}
        effect="fade"
        autoplay
        pagination={{
          clickable: true,
          el: ".spdh1",
        }}
        dir="ltr"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="image">
                <img
                  src={slide.imgSrc}
                  alt="slider"
                  className="lazyload"
                  width={1840}
                  height={888}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="row">
                    <div className={slide.colClass}>
                      <div className="content-slider">
                        <div className="box-title-slider">
                          <h2
                            className={`heading display-xl-2 ${slide.titleClass} fw-medium fade-item fade-item-1`}
                          >
                            {slide.title}
                          </h2>
                          <p
                            className={`sub text-xl ${slide.descriptionClass} fade-item fade-item-2`}
                          >
                            {slide.description}
                          </p>
                        </div>
                        <div className="box-btn-slider fade-item fade-item-3">
                          <Link
                            to={`/shop-sub-collection`}
                            className={slide.btnClass}
                          >
                            Shop Collection
                            <i className="icon icon-arrow-top-left" />
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
            <div className="sw-dots style-2 sw-pagination-slider justify-content-center spdh1" />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
