"use client";
import { blogItems3 } from "@/data/blogs";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Blogs() {
  return (
    <section className="flat-spacing-3 pb-0">
      <div className="container">
        <div className="flat-title-v2 style-2 text-center justify-items-center wow fadeInUp">
          <Link
            to={`/blog-grid-01`}
            className="tf-btn btn-out-line-green btn-small text-uppercase"
          >
            OUR BLOG
          </Link>
          <h4 className="text-capitalize">
            Ride the Future: E-Bike Insights &amp; Trendseds
          </h4>
        </div>
        <div className="fl-control-sw wow fadeInUp">
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
                nextEl: ".nav-next-blog",
                prevEl: ".nav-prev-blog",
              },
              pagination: { el: ".sw-pagination-blog", clickable: true },
              breakpoints: {
                577: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {blogItems3.map((item, index) => (
              <SwiperSlide key={index} className="swiper-slide">
                <div className="news-item hover-img">
                  <Link
                    to={`/blog-single/${item.id}`}
                    className="image-box img-style"
                  >
                    <img
                      src={item.imgSrc}
                      alt={item.alt}
                      width={464}
                      height={464}
                    />
                  </Link>
                  <div className="content">
                    <Link
                      to={`/blog-single/${item.id}`}
                      className="title fw-medium link text-xl text-line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    <Link
                      to={`/blog-single/${item.id}`}
                      className="btn-readmore link"
                    >
                      Read more <i className="icon icon-arr-right" />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-blog justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-blog" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-blog" />
        </div>
      </div>
    </section>
  );
}
