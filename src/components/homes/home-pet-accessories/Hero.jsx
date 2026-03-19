"use client";
import { sliderItems2 } from "@/data/heroSlides";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-pet slider-default">
      <Swiper
        className="swiper tf-sw-slideshow slider-effect-fade"
        modules={[EffectFade, Pagination, Autoplay]}
        effect="fade"
        loop
        autoplay
        pagination={{
          clickable: true,
          el: ".spdh1",
        }}
        dir="ltr"
      >
        {sliderItems2.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="image">
                <img
                  src={item.imgSrc}
                  alt="slider"
                  className="lazyload"
                  width={1920}
                  height={793}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="row">
                    <div className={item.colClass}>
                      <div className="content-slider">
                        <div className="box-title-slider">
                          <h2
                            className="heading display-xl font-5 fade-item fade-item-1"
                            dangerouslySetInnerHTML={{ __html: item.title }}
                          />
                          <p className="sub text-md fade-item fade-item-2">
                            {item.subtitle}
                          </p>
                        </div>
                        <div className="box-btn-slider fade-item fade-item-3">
                          <Link
                            to={`/shop-default`}
                            className="tf-btn animate-btn"
                          >
                            {item.btnText}
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
            <div className="sw-dots style-2 sw-pagination-slider justify-content-center spdh1" />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
