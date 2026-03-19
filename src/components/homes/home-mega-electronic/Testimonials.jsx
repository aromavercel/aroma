"use client";
import { testimonials10 } from "@/data/testimonials";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  return (
    <section>
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Customer Favorites</h4>
          <p className="desc text-main text-md">
            Discover expert advice, style inspiration, and product updates on
            our blog.
          </p>
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
            pagination: { el: ".sw-pagination-testimonial", clickable: true },
            breakpoints: {
              577: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
              1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 4 },
            },
          }}
          modules={[Navigation, Pagination]}
        >
          {testimonials10.map((testimonial, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="wg-testimonial style-2 type-2">
                <div className="content">
                  <div className="content-top">
                    <div className="list-star-default">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i className="icon-star text-green" key={i} />
                      ))}
                    </div>
                    <p className="text-sm fw-medium">{testimonial.title}</p>
                    <p className="text-review text-md text-main">
                      {testimonial.review}
                    </p>
                    <div className="box-author">
                      <div className="avt">
                        <img
                          alt=""
                          src={testimonial.author.imgSrc}
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className="name-author text-sm fw-medium">
                        {testimonial.author.name}
                      </p>
                    </div>
                  </div>
                  <span className="br-line d-block" />
                  <div className="bot">
                    <div className="box-avt">
                      <div className="avatar rounded-0">
                        <img
                          alt=""
                          src={testimonial.product.imgSrc}
                          width={108}
                          height={108}
                        />
                      </div>
                      <div className="box-price">
                        <a
                          href="#"
                          className="link name-item text-md fw-medium"
                        >
                          {testimonial.product.name}
                        </a>
                        <p className="price text-md fw-medium">
                          ${testimonial.product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="box-btn">
                      <a
                        href="#"
                        className="tf-btn-icon text-primary line-primary"
                      >
                        <i className="icon icon-arrow-top-left" />
                      </a>
                    </div>
                  </div>
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
