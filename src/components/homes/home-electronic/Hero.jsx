"use client";
import { slides2 } from "@/data/heroSlides";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="tf-slideshow slider-electronic slider-default">
      <Swiper
        className="swiper tf-sw-slideshow slider-effect-fade"
        modules={[Autoplay, Pagination]}
        pagination={{
          clickable: true,
          el: ".spd11",
        }}
        dir="ltr"
      >
        {slides2.map((slide, index) => (
          <SwiperSlide
            key={index}
            className={`swiper-slide${slide.reverse ? " reverse-slide" : ""}`}
          >
            <div className={`slider-wrap ${slide.bgType}`}>
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
                  <div className="row">
                    <div
                      className={
                        slide.reverse
                          ? "offset-lg-8 col-lg-4 col-sm-6 offset-6 col-12"
                          : "col-lg-12 col-12 col-sm-6"
                      }
                    >
                      <div className="content-slider">
                        <div className="box-title-slider">
                          <p className="sub text-md fw-medium fade-item fade-item-1 text-dark-3">
                            {slide.subTitle}
                          </p>
                          <h2
                            className="heading fw-medium fade-item fade-item-2 text-dark-3"
                            dangerouslySetInnerHTML={{
                              __html: slide.heading,
                            }}
                          />
                        </div>
                        <div className="box-btn-slider fade-item fade-item-3">
                          <Link
                            to={`/shop-default`}
                            className="tf-btn btn-dark2 animate-btn"
                          >
                            Shop Now
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
            <div className="sw-dots sw-pagination-slider justify-content-center spd11" />
          </div>
        </div>
      </Swiper>
    </div>
  );
}
