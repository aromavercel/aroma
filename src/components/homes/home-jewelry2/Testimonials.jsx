"use client";
import { testimonials13 } from "@/data/testimonials";

import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  return (
    <section className="flat-spacing-30 bg-brown-12">
      <div className="container">
        <div className="flat-title style-between align-items-end wow fadeInUp">
          <div className="box-title">
            <h3 className="title fw-normal font-9">Customer Reviews</h3>
          </div>
          <div className="box-nav-swiper style-2 d-none d-xl-flex">
            <div className="swiper-button-prev nav-swiper style-1 nav-prev-testimonial relative" />
            <div className="swiper-button-next nav-swiper style-1 nav-next-testimonial relative" />
          </div>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          {...{
            slidesPerView: 1,
            spaceBetween: 12,
            speed: 800,
            observer: true,
            observeParents: true,
            slidesPerGroup: 1,
            navigation: {
              clickable: true,
              nextEl: ".nav-next-testimonial",
              prevEl: ".nav-prev-testimonial",
            },
            pagination: { el: ".sw-pagination-tes", clickable: true },
            breakpoints: {
              768: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
              1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 3 },
            },
          }}
          modules={[Pagination, Navigation]}
        >
          {testimonials13.map((testimonial, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-testimonial bg-white rounded-0">
                <div className="content">
                  <div className="content-top">
                    <div className="box-author">
                      <p className="name-author text-sm fw-medium font-9">
                        {testimonial.name}
                      </p>
                      <div className="box-verified text-main font-9">
                        <i className="icon-verifi" />
                        <p className="text-xs fst-italic">Verified Buyer</p>
                      </div>
                    </div>
                    <div className="list-star-default">
                      {[...Array(5)].map((_, i) => (
                        <i className="icon-star" key={i} />
                      ))}
                    </div>
                    <p className="text-review text-sm text-main font-9">
                      {testimonial.review}
                    </p>
                  </div>
                  <span className="br-line d-block" />
                  <div className="box-avt">
                    <div className="avatar">
                      <img
                        alt="product"
                        width={96}
                        height={96}
                        src={testimonial.image}
                      />
                    </div>
                    <div className="box-price">
                      <p className="name-item text-xs">
                        <span className="font-9">Item purchased:</span>
                        <a
                          href="#"
                          className="fw-medium text-sm link text-line-clamp-1"
                        >
                          {testimonial.itemName}
                        </a>
                      </p>
                      <p className="price text-md fw-medium font-9">
                        {testimonial.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <span className="sw-dot-default sw-pagination-tes justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
