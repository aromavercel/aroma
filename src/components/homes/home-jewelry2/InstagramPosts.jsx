"use client";

import { galleryItems } from "@/data/products";

import { Link } from "react-router-dom";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function InstagramPosts() {
  return (
    <section className="flat-spacing-3 px-30 pe-0">
      <div className="flat-title wow fadeInUp">
        <h3 className="title fw-normal font-9 letter-0">Follow @Vineta</h3>
      </div>
      <Swiper
        dir="ltr"
        className="swiper tf-swiper"
        {...{
          slidesPerView: 1.5,
          spaceBetween: 15,
          speed: 800,
          observer: true,
          observeParents: true,
          slidesPerGroup: 2,
          pagination: { el: ".sw-pagination-gallery", clickable: true },
          breakpoints: {
            768: { slidesPerView: 2.5 },
            1200: { slidesPerView: 4.5 },
          },
        }}
        modules={[Pagination]}
      >
        {galleryItems.map((item) => (
          <SwiperSlide className="swiper-slide" key={item.id}>
            <div className="gallery-item rounded-0 hover-img hover-overlay">
              <div className="image img-style">
                <img
                  src={item.imgSrc}
                  alt=""
                  className="lazyload"
                  width={620}
                  height={620}
                />
              </div>
              <Link
                to={`/product-detail/${item.id}`}
                className="box-icon hover-tooltip"
              >
                <span className="icon icon-cart2" />
                <span className="tooltip">View Product</span>
              </Link>
            </div>
          </SwiperSlide>
        ))}
        <span className="d-flex d-xl-none sw-dot-default sw-pagination-gallery justify-content-center" />
      </Swiper>
    </section>
  );
}
