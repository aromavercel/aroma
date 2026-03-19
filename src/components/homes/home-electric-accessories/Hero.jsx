"use client";
import { sliderItems4 } from "@/data/heroSlides";
import React from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-electric-access slider-default flat-spacing-2 pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Swiper
              className="swiper tf-sw-slideshow slider-effect-fade"
              modules={[Autoplay, Pagination, EffectFade]}
              effect="fade"
              dir="ltr"
              loop
              autoplay
              pagination={{
                clickable: true,
                el: ".spdh",
              }}
            >
              {sliderItems4.map((item, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <div className="slider-wrap">
                    <div className="image">
                      <img
                        src={item.src}
                        alt="slider"
                        className="lazyload"
                        width={1440}
                        height={621}
                      />
                    </div>
                    <div className="box-content">
                      <div className="container">
                        <div className="row">
                          <div className="col-9 col-sm-6 col-xl-5">
                            <div className="content-slider">
                              <div className="box-title-slider">
                                <h4 className="heading display-md fw-medium fade-item fade-item-1">
                                  {item.title}
                                </h4>
                                <p className="sub text-md fade-item fade-item-2">
                                  {item.description}
                                </p>
                              </div>
                              <div className="box-btn-slider fade-item fade-item-3">
                                <Link
                                  to={`/shop-default`}
                                  className="tf-btn btn-dark2 animate-btn"
                                >
                                  Explore More
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
                  <div className="sw-dots style-dark sw-pagination-slider justify-content-center spdh" />
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
