"use client";

import { slides7 } from "@/data/heroSlides";

import { Link } from "react-router-dom";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-jewelry slider-default flat-spacing-4 pt-0">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow slider-effect-fade rounded-0"
        data-effect="fade"
        modules={[EffectFade, Pagination, Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={1500}
        pagination={{
          el: ".hpdots",
          clickable: true,
        }}
        effect="fade"
        loop={true}
      >
        {slides7.map((slide, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="slider-wrap">
              <div className="image">
                <img
                  src={slide.image}
                  alt="slider"
                  className="lazyload"
                  width={1860}
                  height={817}
                />
              </div>
              <div className="box-content">
                <div className="container">
                  <div className="row">
                    <div className="col-9 col-sm-6 col-xl-5">
                      <div className="content-slider">
                        <div className="box-title-slider">
                          <div
                            className="heading font-9 fade-item fade-item-1"
                            dangerouslySetInnerHTML={{ __html: slide.title }}
                          />
                        </div>
                        <div className="box-btn-slider fade-item fade-item-3">
                          <Link
                            to={`/shop-default`}
                            className="tf-btn btn-large fw-normal btn-yellow font-9 rounded-0 animate-btn bg-brown-11"
                          >
                            NEW ARRIVALS
                            <i className="icon icon-arrow-right" />
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
            <div className="sw-dots style-dark sw-pagination-slider  hpdots justify-content-center" />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
