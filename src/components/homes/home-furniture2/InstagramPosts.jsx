"use client";
import { furnitureGallery } from "@/data/products";

import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { INSTAGRAM_PROFILE_URL } from "@/data/socialLinks";

export default function InstagramPosts() {
  return (
    <section className="">
      <div className="flat-title wow fadeInUp">
        <h3 className="title fw-normal font-11">SIGA NO INSTAGRAM</h3>
      </div>
      <div className="wrap-gallery">
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          {...{
            slidesPerView: 2,
            spaceBetween: 0,
            speed: 800,
            observer: true,
            observeParents: true,
            slidesPerGroup: 2,
            pagination: { el: ".sw-pagination-gallery", clickable: true },
            breakpoints: {
              768: { slidesPerView: 4 },
              1200: { slidesPerView: 6 },
            },
          }}
          modules={[Pagination]}
        >
          {furnitureGallery.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="gallery-item rounded-0 hover-img hover-overlay">
                <div className="image img-style">
                  <img
                    src={item.imgSrc}
                    alt=""
                    className="lazyload"
                    width={480}
                    height={480}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}

          <span className="d-flex d-xl-none sw-dot-default sw-pagination-gallery justify-content-center" />
        </Swiper>
        <a
          href={INSTAGRAM_PROFILE_URL}
          className="social-item social-instagram wrap-gallery-icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="icon icon-instagram" />
        </a>
      </div>
    </section>
  );
}
