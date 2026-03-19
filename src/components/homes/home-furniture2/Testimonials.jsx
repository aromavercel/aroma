"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import { EffectFade, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const thumbs = [
  {
    src: "/images/testimonial/tes-furniture3.jpg",
    width: 603,
    height: 598,
  },
  {
    src: "/images/testimonial/tes-furniture2.jpg",
    width: 1080,
    height: 1080,
  },
];

const testimonials = [
  {
    review:
      '"Beautiful craftsmanship and fast delivery! The sofa looks even better in person — super comfortable and exactly what I was hoping for."',
    name: "EMILY R.",
    product: "Linen Wrap Top",
    img: "/images/testimonial/tes-furniture1.jpg",
  },
  {
    review:
      "I love the dress I purchased! The fabric is so soft, and the fit is perfect. I’ve gotten so many compliments on it. Will definitely shop here again!",
    name: "Jessica M.",
    product: "Linen Wrap Top",
    img: "/images/testimonial/tes-furniture1.jpg",
  },
];

export default function Testimonials() {
  const [thumbSwiper, setThumbSwiper] = useState(null);
  return (
    <div className="flat-spacing-13 pt-0">
      <div className="container">
        <div
          className="wrapper-thumbs-tes flat-thumbs-tes bg-white rounded-0"
          data-effect="fade"
        >
          {/* Thumbnail Swiper */}
          <div className="box-left">
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbSwiper}
              dir="ltr"
              className="swiper tf-thumb-tes"
            >
              {thumbs.map((thumb, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="img-sw-thumb">
                    <img
                      className="lazyload"
                      data-src={thumb.src}
                      alt="img"
                      width={thumb.width}
                      height={thumb.height}
                      src={thumb.src}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Testimonial Swiper */}
          <div className="box-right wow fadeInUp">
            <Swiper
              modules={[Thumbs, Navigation]}
              navigation={{
                nextEl: ".nav-next-tes",
                prevEl: ".nav-prev-tes",
              }}
              thumbs={{ swiper: thumbSwiper }}
              dir="ltr"
              className="swiper tf-tes-main"
              data-space-lg={24}
              data-space={12}
            >
              {testimonials.map((item, index) => (
                <SwiperSlide className="swiper-slide" key={index}>
                  <div className="box-testimonial-main">
                    <span className="quote">
                      <svg
                        width={64}
                        height={64}
                        viewBox="0 0 64 64"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7143 36.0714H0.5V9.64282H26.9285V36.4533L17.9766 54.357H5.38037L14.1615 36.795L14.5233 36.0714H13.7143Z"
                          stroke="#A47551"
                        />
                        <path
                          d="M50.2846 36.0714H37.0703V9.64282H63.4988V36.4533L54.5469 54.357H41.9507L50.7318 36.795L51.0936 36.0714H50.2846Z"
                          stroke="#A47551"
                        />
                      </svg>
                    </span>
                    <div className="font-11 fw-medium body-text">
                      OUR CUSTOMER’S REVIEW
                    </div>
                    <div className="content">
                      <div className="list-star-default">
                        {Array(5)
                          .fill()
                          .map((_, i) => (
                            <i key={i} className="icon-star text-yellow-4" />
                          ))}
                      </div>
                      <p className="text-review display-xs font-11">
                        {item.review}
                      </p>
                      <div className="box-author">
                        <div className="img d-md-none">
                          <img
                            alt="author"
                            width={915}
                            height={884}
                            src={item.img}
                          />
                        </div>
                        <div className="info">
                          <div className="name font-11 fw-medium body-text">
                            {item.name}
                          </div>
                          <a href="#" className="meta link">
                            Purchase item:
                            <span className="fw-medium">{item.product}</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Navigation */}
              <div className="box-nav-swiper">
                <div className="swiper-button-prev nav-swiper size-30 nav-prev-tes" />
                <div className="swiper-button-next nav-swiper size-30 nav-next-tes" />
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
