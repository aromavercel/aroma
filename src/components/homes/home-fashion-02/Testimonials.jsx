"use client";
import { testimonials2 } from "@/data/testimonials";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title">
          <h4 className="title">Customer Reviews</h4>
        </div>
      </div>
      <div className="slider-layout-right wow fadeInUp">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper tf-sw-right"
          {...{
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            pagination: { el: ".sw-pagination-testimonial", clickable: true },
            breakpoints: {
              768: { slidesPerView: 1.5, spaceBetween: 12 },
              1200: { slidesPerView: 2.3, spaceBetween: 24 },
            },
          }}
          modules={[Pagination]}
        >
          {testimonials2.map((testimonial, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-testimonial style-row hover-img">
                <div className="content">
                  <div className="content-top">
                    <div className="box-author">
                      <p className="name-author text-sm fw-medium">
                        {testimonial.author}
                      </p>
                      <div className="box-verified text-main">
                        <i className="icon-verifi" />
                        <p className="text-xs fst-italic">Verified Buyer</p>
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
                        alt="author"
                        src={testimonial.authorImg}
                        width={testimonial.authorImgWidth}
                        height={testimonial.authorImgHeight}
                      />
                    </div>
                    <div className="box-price">
                      <p className="name-item text-xs">
                        Item purchased:
                        <a href="#" className="fw-medium text-sm link">
                          {testimonial.item}
                        </a>
                      </p>
                      <p className="price text-md fw-medium">
                        ${testimonial.price}.00
                      </p>
                    </div>
                  </div>
                </div>
                <div className="image img-style">
                  <img
                    src={testimonial.testimonialImg}
                    alt="testimonial"
                    className="lazyload"
                    width={testimonial.testimonialImgWidth}
                    height={testimonial.testimonialImgHeight}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-testimonial justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
