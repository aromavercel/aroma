"use client";
import { skincareSlides } from "@/data/heroSlides";

import { Link } from "react-router-dom";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  return (
    <section className="tf-slideshow slider-baby slider-default">
      <Swiper
        dir="ltr"
        className="swiper tf-sw-slideshow slider-effect-fade"
        loop
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={2000}
        pagination={{
          el: ".sw-pagination-slider",
          clickable: true,
        }}
      >
        {skincareSlides.map((slide, index) => (
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
                  <div className="content-slider">
                    <div className="box-title-slider">
                      <h2
                        className="heading fs-84 fw-normal fst-italic text-dark-8 font-3 fade-item fade-item-1"
                        dangerouslySetInnerHTML={{ __html: slide.title }}
                      />
                      <p
                        className="sub text-md fade-item fade-item-2 text-dark-3 text-grey-6"
                        dangerouslySetInnerHTML={{ __html: slide.subtitle }}
                      />
                    </div>
                    <div className="box-btn-slider fade-item fade-item-3">
                      <Link
                        to={`/shop-default`}
                        className="tf-btn btn-orange-2 animate-btn"
                      >
                        Shop Now &amp; Shine
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.354 11.6459C22.4006 11.6923 22.4375 11.7475 22.4627 11.8083C22.4879 11.869 22.5009 11.9341 22.5009 11.9999C22.5009 12.0657 22.4879 12.1308 22.4627 12.1915C22.4375 12.2523 22.4006 12.3075 22.354 12.3539L18.354 16.3539C18.3075 16.4004 18.2523 16.4373 18.1916 16.4624C18.1308 16.4876 18.0657 16.5005 18 16.5005C17.8672 16.5005 17.7399 16.4478 17.646 16.3539C17.5521 16.26 17.4994 16.1327 17.4994 15.9999C17.4994 15.8671 17.5521 15.7398 17.646 15.6459L20.793 12.4999H2C1.86739 12.4999 1.74021 12.4472 1.64645 12.3535C1.55268 12.2597 1.5 12.1325 1.5 11.9999C1.5 11.8673 1.55268 11.7401 1.64645 11.6463C1.74021 11.5526 1.86739 11.4999 2 11.4999H20.793L17.646 8.3539C17.5521 8.26001 17.4994 8.13268 17.4994 7.9999C17.4994 7.86712 17.5521 7.73979 17.646 7.6459C17.7399 7.55201 17.8672 7.49927 18 7.49927C18.1328 7.49927 18.2601 7.55201 18.354 7.6459L22.354 11.6459Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="wrap-pagination">
          <div className="container">
            <div className="sw-dots sw-pagination-slider justify-content-center" />
          </div>
        </div>
      </Swiper>
    </section>
  );
}
