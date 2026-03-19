"use client";
import { fashionSlides } from "@/data/heroSlides";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="tf-slideshow slider-fashion-2">
      <Swiper
        className="swiper tf-sw-slideshow"
        spaceBetween={15}
        breakpoints={{
          0: { slidesPerView: 1.5 },
          575: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2,
          },
          992: {
            slidesPerView: 3,
          },
        }}
        dir="ltr"
      >
        {fashionSlides.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="fs-cls hover-img">
              <div className="img-style image">
                <img
                  src={item.imgSrc}
                  alt={item.alt}
                  className="lazyload"
                  width={610}
                  height={840}
                />
              </div>
              <div className="content">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-white hover-icon-2 hover-dark"
                >
                  {item.buttonText}
                  <i className="icon-arrow-right icon" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
