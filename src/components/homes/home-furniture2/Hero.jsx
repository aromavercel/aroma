"use client";
import { furnitureSlides } from "@/data/heroSlides";

import { Link } from "react-router-dom";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-default">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow slider-effect-fade"
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          el: ".sw-pagination-slider",
          clickable: true,
        }}
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={2000}
      >
        {furnitureSlides.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="image">
                <img
                  src={slide.image}
                  alt="slider"
                  className="lazyload"
                  width={slide.width}
                  height={slide.height}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-5 col-md-6 col-sm-10">
                      <div className="content-slider style-2 rounded-0">
                        <div className="box-title-slider">
                          <h2
                            className="heading display-xl-2 fw-medium font-11 fade-item fade-item-1"
                            dangerouslySetInnerHTML={{ __html: slide.title }}
                          />
                          <p
                            className="sub text-xl text-dark-8 font-11 fade-item fade-item-2"
                            dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                          />
                        </div>
                        <div className="box-btn-slider fade-item fade-item-3">
                          <Link
                            to={`/shop-default`}
                            className="tf-btn btn-large fw-medium animate-btn bg-brown-15 border-0 rounded-0 font-11"
                          >
                            Browse The Collection
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
            <div className="sw-dots style-white sw-pagination-slider justify-content-center" />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
