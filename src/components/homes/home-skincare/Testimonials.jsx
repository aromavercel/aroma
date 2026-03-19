"use client";

import { testimonials6 } from "@/data/testimonials";
import { useState } from "react";
import { Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  const [thumbSwiper, setThumbSwiper] = useState(null);
  return (
    <div className="flat-spacing-2 bg-light-orange-4">
      <div className="container">
        <div
          className="wrapper-thumbs-tes-3 flat-thumbs-tes"
          data-effect="fade"
        >
          <div className="box-left wow fadeInUp">
            <Swiper
              dir="ltr"
              modules={[Pagination, Thumbs]}
              thumbs={{ swiper: thumbSwiper }}
              pagination={{
                clickable: true,
                el: ".spdt2",
              }}
              className="swiper tf-tes-main"
            >
              {testimonials6.map((testimonial, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <div className="box-testimonial-main text-center">
                    <span className="quote icon-quote3" />
                    <div className="content">
                      <div className="list-star-default justify-content-center">
                        <i className="icon-star" />
                        <i className="icon-star" />
                        <i className="icon-star" />
                        <i className="icon-star" />
                        <i className="icon-star" />
                      </div>
                      <p className="text-review">{testimonial.quote}</p>
                      <div className="name text-md fw-semibold">
                        {testimonial.name}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <span className="sw-dot-default sw-pagination-tes justify-content-center spdt2" />
            </Swiper>
          </div>
          <div className="box-right">
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbSwiper}
              dir="ltr"
              className="swiper tf-thumb-tes"
              data-space-lg={24}
              data-space={12}
            >
              {testimonials6.map((elm, i) => (
                <SwiperSlide
                  key={i}
                  className="swiper-slide hover-shine hover-img"
                >
                  <div className="shine-item img-sw-thumb img-style">
                    <img
                      className="lazyload"
                      alt="img"
                      src={elm.imgSrc}
                      width={534}
                      height={533}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
