"use client";
import { pickleballSlides } from "@/data/heroSlides";

import { Link } from "react-router-dom";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-pickleball slider-style-2">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow slider-effect-fade"
        pagination={{ el: ".sw-dots", clickable: true }}
        effect="fade"
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        speed={2000}
        loop={true}
        modules={[EffectFade, Autoplay, Pagination]}
      >
        {pickleballSlides.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="box-content-left bg-gradient-5">
                <div className="container">
                  <div className="content-slider text-center">
                    <div className="box-title-slider">
                      <h2
                        className="heading letter-0 text-white fw-normal font-10 fade-item fade-item-1"
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      />
                    </div>
                    <div className="box-btn-slider fade-item fade-item-2">
                      <Link
                        to={`/shop-default`}
                        className="tf-btn btn-large animate-btn bg-yellow-5 border-0 text-dark"
                      >
                        Shop Collection
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="image">
                <img
                  src={slide.image}
                  alt=""
                  className="lazyload"
                  width={1440}
                  height={1349}
                />
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
