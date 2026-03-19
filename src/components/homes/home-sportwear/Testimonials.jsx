"use client";
import { testimonials9 } from "@/data/testimonials";
import React, { useState } from "react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  const [swiperThumb, setSwiperThumb] = useState(null);
  return (
    <div className="flat-spacing-3">
      <div className="container">
        <div className="wrapper-thumbs-tes-4 flat-thumbs-tes">
          <div className="box-left">
            <Swiper
              dir="ltr"
              className="swiper tf-thumb-tes"
              data-space-lg={24}
              data-space={12}
              modules={[Thumbs]}
              onSwiper={setSwiperThumb}
            >
              {testimonials9.map((elm, i) => (
                <SwiperSlide className="swiper-slide hover-img">
                  <div key={i} className="img-sw-thumb img-style">
                    <img
                      className="lazyload"
                      alt="img"
                      src={elm.imgSrc}
                      width={755}
                      height={897}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="box-right">
            <Swiper
              dir="ltr"
              className="swiper tf-tes-main"
              modules={[Thumbs, Navigation]}
              thumbs={{ swiper: swiperThumb }}
              navigation={{
                prevEl: ".snbp12",
                nextEl: ".snbn12",
              }}
            >
              {testimonials9.map((testimonial, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="box-testimonial-main wow fadeInUp">
                    <div className="box-content">
                      <span className="text-primary quote icon-quote4" />
                      <div className="list-star-default">
                        {[...Array(5)].map((_, i) => (
                          <i className="text-yellow-2 icon-star" key={i} />
                        ))}
                      </div>
                      <div className="text-md fw-medium text-uppercase">
                        {testimonial.title}
                      </div>
                      <p className="text-review display-xs">
                        {testimonial.review}
                      </p>
                    </div>
                    <div className="box-author">
                      <div className="img d-md-none">
                        <img
                          alt="author"
                          src={testimonial.imgSrc}
                          width={755}
                          height={897}
                        />
                      </div>
                      <div className="info">
                        <div className="name text-md fw-medium">
                          {testimonial.author}
                        </div>
                        <a href="#" className="meta link">
                          <span className="text-main">Purchase item:</span>{" "}
                          <span className="fw-medium">
                            {testimonial.product}
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="box-nav-swiper">
                <div className="swiper-button-prev nav-swiper size-30 style-line nav-prev-tes snbp12" />
                <div className="swiper-button-next nav-swiper size-30 style-line nav-next-tes snbn12" />
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
