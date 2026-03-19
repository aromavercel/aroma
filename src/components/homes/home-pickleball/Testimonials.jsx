"use client";
import { paddleTestimonials } from "@/data/testimonials";

import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  useEffect(() => {
    setTimeout(() => {
      document
        .querySelector(".tes-swiper .swiper-wrapper")
        ?.classList.add("mb_32");
    }, 1000);
  }, []);

  return (
    <section className="flat-spacing-20 pt-0">
      <div className="container-full">
        <div className="bg-gradient-7 xl-radius-50 overflow-hidden flat-spacing-30 relative radius-16">
          <div className="container">
            <div className="flat-title relative mb_5">
              <h3 className="title fw-normal letter-0 font-10 text-white">
                Happy Customers
              </h3>
            </div>
            <div className="fl-control-sw2 wrap-pos-nav sw-over-product wow fadeInUp">
              <Swiper
                dir="ltr"
                className="swiper tf-swiper tes-swiper wrap-sw-over"
                {...{
                  slidesPerView: 1,
                  spaceBetween: 12,
                  speed: 800,
                  observer: true,
                  observeParents: true,
                  slidesPerGroup: 1,
                  navigation: {
                    clickable: true,
                    nextEl: ".nav-next-top-pick",
                    prevEl: ".nav-prev-top-pick",
                  },
                  pagination: {
                    el: ".sw-pagination-top-pick",
                    clickable: true,
                  },
                  breakpoints: {
                    768: {
                      slidesPerView: 2,
                      spaceBetween: 12,
                      slidesPerGroup: 1,
                    },
                    1200: {
                      slidesPerView: 3,
                      spaceBetween: 24,
                      slidesPerGroup: 1,
                    },
                  },
                }}
                modules={[Pagination, Navigation]}
              >
                {paddleTestimonials.map((testimonial, index) => (
                  <SwiperSlide className="swiper-slide" key={index}>
                    <div className="wg-testimonial bg-white">
                      <div className="content">
                        <div className="content-top">
                          <div className="box-author">
                            <p className="name-author text-sm fw-medium">
                              {testimonial.name}
                            </p>
                            <div className="box-verified text-main">
                              <i className="icon-verifi" />
                              <p className="text-xs fst-italic">
                                Verified Buyer
                              </p>
                            </div>
                          </div>
                          <div className="list-star-default">
                            {[...Array(5)].map((_, i) => (
                              <i className="icon-star" key={i} />
                            ))}
                          </div>
                          <p className="text-review text-sm text-main">
                            {testimonial.review}
                          </p>
                        </div>
                        <span className="br-line d-block" />
                        <div className="box-avt">
                          <div className="avatar">
                            <img
                              alt="product"
                              width={testimonial.imageSize}
                              height={testimonial.imageSize}
                              src={testimonial.image}
                            />
                          </div>
                          <div className="box-price">
                            <p className="name-item text-xs">
                              <span className="">Item purchased:</span>
                              <a
                                href="#"
                                className="fw-medium text-sm link text-line-clamp-1"
                              >
                                {testimonial.itemName}
                              </a>
                            </p>
                            <p className="price text-md fw-medium">
                              {testimonial.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="d-flex  style-white sw-dot-default sw-pagination-top-pick justify-content-center" />
              </Swiper>
              <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-top-pick line-white style-line" />
              <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-top-pick line-white style-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
