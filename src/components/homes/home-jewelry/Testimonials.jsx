"use client";

import { useState } from "react";
import { Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    src: "/images/brand/forbes.png",
    width: 119,
    height: 31,
    active: true,
    quote: `Your jewelry pieces stand out for their intricate design and
                    timeless elegance. Each piece embodies sophistication,
                    making them perfect for our features.`,
  },
  {
    src: "/images/brand/vogue.png",
    width: 118,
    height: 31,
    active: false,
    quote: `Your jewelry pieces stand out for their intricate design and
                    timeless elegance. Each piece embodies sophistication,
                    making them perfect for our features.`,
  },
  {
    src: "/images/brand/elle.png",
    width: 77,
    height: 31,
    active: false,
    quote: `Your jewelry pieces stand out for their intricate design and
                    timeless elegance. Each piece embodies sophistication,
                    making them perfect for our features.`,
  },
];

export default function Testimonials() {
  const [swiperThumb, setSwiperThumb] = useState(null);
  return (
    <div className="flat-spacing-3 pt-0">
      <div className="container">
        <div className="slider-thumb-wrap tes-jewelry-wrap overflow-hidden wow fadeInUp">
          <Swiper
            modules={[Thumbs]}
            thumbs={{ swiper: swiperThumb }}
            className="swiper-container slider-content-thumb"
            style={{ maxWidth: "100%" }}
            dir="ltr"
          >
            {testimonials.map((elm, i) => (
              <SwiperSlide className="swiper-slide">
                <div className="wg-testimonial-2 text-center">
                  <i className="icon icon-diamond text-yellow-3" />
                  <p className="text font-2 display-md lette-space-0">
                    {elm.quote}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            slidesPerView={3}
            onSwiper={setSwiperThumb}
            modules={[Thumbs]}
            className="slider-btn-thumbs"
            slideActiveClass="active"
            style={{ maxWidth: "min(100% , 450px)" }}
            dir="ltr"
            spaceBetween={40}
          >
            {testimonials.map((elm, i) => (
              <SwiperSlide className="btn-thumbs">
                <img
                  alt="brand"
                  src={elm.src}
                  width={elm.width}
                  height={elm.height}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
