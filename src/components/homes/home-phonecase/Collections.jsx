"use client";

import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { products39 } from "@/data/products";

export default function Collections() {
  return (
    <div className="mx_40 my_24">
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
            nextEl: ".nav-next-cls",
            prevEl: ".nav-prev-cls",
          },
          pagination: { el: ".sw-pagination-cls", clickable: true },
          breakpoints: {
            768: { slidesPerView: 1, spaceBetween: 12, slidesPerGroup: 2 },
            1024: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
          },
        }}
        modules={[Pagination, Navigation]}
      >
        {products39.map((item, index) => (
          <SwiperSlide className="swiper-slide" key={index}>
            <div className="banner-shop hover-img style-left-center">
              <Link
                to={`/product-detail/${item.id}`}
                className="img-style d-block"
              >
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="lazyload"
                  width={1362}
                  height={870}
                />
              </Link>
              <div className="content">
                <div className="box-title wow fadeInUp">
                  <span className="tag text-sm text-white animate-btn">
                    {item.tag}
                  </span>
                  <Link
                    to={`/product-detail/${item.id}`}
                    className="title link"
                  >
                    {item.title}
                  </Link>
                  <div className="box-price">
                    <span className="price-new display-xs fw-medium text-primary">
                      ${item.price.toFixed(2)}
                    </span>{" "}
                    <span className="price-old">
                      ${item.oldPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Link
                  to={`/product-detail/${item.id}`}
                  className="wow fadeInUp tf-btn btn-cls btn-out-line-dark hover-icon-2"
                >
                  See Details <i className="icon icon-arrow-top-left" />
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="d-flex d-lg-none sw-dot-default sw-pagination-cls justify-content-center" />
      </Swiper>
    </div>
  );
}
