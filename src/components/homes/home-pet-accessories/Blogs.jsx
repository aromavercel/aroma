"use client";
import { blogItems4 } from "@/data/blogs";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Blogs() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title font-5">Why Shop with Us?</h4>
          <p className="desc text-main text-md">
            Discover the best for your furry friends
          </p>
        </div>
        <div className="hover-sw-nav hover-sw-2">
          <Swiper
            dir="ltr"
            className="swiper tf-swiper"
            {...{
              slidesPerView: 1,
              spaceBetween: 12,
              speed: 1000,
              observer: true,
              observeParents: true,
              slidesPerGroup: 1,
              navigation: {
                clickable: true,
                nextEl: ".nav-next-news",
                prevEl: ".nav-prev-news",
              },
              pagination: { el: ".sw-pagination-news", clickable: true },
              breakpoints: {
                577: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {blogItems4.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="wg-offer style-2 hover-img">
                  <Link
                    to={`/blog-single/${item.id}`}
                    className="image d-block img-style"
                  >
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="lazyload"
                      width={464}
                      height={350}
                    />
                  </Link>
                  <div className="box-title text-center">
                    <Link
                      to={`/blog-single/${item.id}`}
                      className="link text-xl fw-medium"
                    >
                      {item.title}
                    </Link>
                    <p className="text-md text-main">{item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-news justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-news" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-news" />
        </div>
      </div>
    </section>
  );
}
