"use client";

import { blogItems2 } from "@/data/blogs";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Blogs() {
  return (
    <section className="">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Latest Tips &amp; Trends</h4>
          <p className="desc text-main text-md">
            Discover expert advice, style inspiration, and product updates on
            our blog.
          </p>
        </div>
        <div className="fl-control-sw wow fadeInUp">
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
                nextEl: ".nav-next-new",
                prevEl: ".nav-prev-new",
              },
              pagination: { el: ".sw-pagination-new", clickable: true },
              breakpoints: {
                577: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {blogItems2.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="news-item hover-img">
                  <Link to={`/blog-single/${item.id}`} className="img-style">
                    <img
                      src={item.imgSrc}
                      alt={item.alt}
                      width={696}
                      height={696}
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
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-new justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-new" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-new" />
        </div>
      </div>
    </section>
  );
}
