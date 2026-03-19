"use client";
import { sliderItems6 } from "@/data/heroSlides";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-plant slider-default">
      <Swiper
        className="swiper tf-sw-slideshow slider-effect-fade"
        modules={[Autoplay, EffectFade, Pagination]}
        autoplay={{
          delay: 2500,
        }}
        speed={2500}
        loop
        effect="fade"
        pagination={{
          clickable: true,
          el: ".spdh",
        }}
        dir="ltr"
      >
        {sliderItems6.map((item) => (
          <SwiperSlide key={item.id} className="swiper-slide">
            <div className="slider-wrap">
              <div className="image">
                <img
                  src={item.imgSrc}
                  alt="slider"
                  className="lazyload"
                  width={1920}
                  height={808}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="content-slider text-center">
                        <div className="box-title-slider">
                          <h2 className="heading font-7 display-2xl text-white fw-semibold fade-item fade-item-1">
                            {item.title.split("\n").map((line, index) => (
                              <React.Fragment key={index}>
                                {line}
                                <br />
                              </React.Fragment>
                            ))}
                          </h2>
                          <p className="sub text-md text-white fade-item fade-item-2">
                            {item.subtitle}
                          </p>
                        </div>
                        <div className="box-btn-slider fade-item fade-item-3">
                          <Link
                            to={`/shop-default`}
                            className="tf-btn animate-btn btn-orange"
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
            <div className="sw-dots style-grey dot-white sw-pagination-slider justify-content-center spdh" />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
