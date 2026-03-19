"use client";
import { products17 } from "@/data/products";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function ShopGram() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Shop by @Gram</h4>
        </div>
        <Swiper
          dir="ltr"
          className="swiper tf-swiper"
          {...{
            slidesPerView: 2,
            spaceBetween: 10,
            speed: 1000,
            observer: true,
            observeParents: true,
            slidesPerGroup: 2,
            pagination: { el: ".sw-pagination-gallery", clickable: true },
            breakpoints: {
              768: { slidesPerView: 3 },
              1200: { slidesPerView: 5 },
            },
          }}
          modules={[Pagination]}
        >
          {products17.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="gallery-item hover-img hover-overlay">
                <div className="image img-style">
                  <img
                    src={item.imgSrc}
                    alt=""
                    className="lazyload"
                    width={420}
                    height={420}
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
      </div>
    </section>
  );
}
