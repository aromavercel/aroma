"use client";
import { blogPosts7 } from "@/data/blogs";

import { Link } from "react-router-dom";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Blogs() {
  return (
    <section className="flat-spacing-29">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <div className="title display-lg-3 font-9 fw-normal">
            Latest Tips &amp; Trends
          </div>
          <p className="desc text-main text-md font-9">
            Discover expert advice, style inspiration, and product updates on
            our blog.
          </p>
        </div>
        <div className="hover-sw-nav wrap-pos-nav">
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
            {blogPosts7.map((post, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="blog-item-v2">
                  <div className="entry-image hover-img">
                    <Link to={`/blog-single`} className="image-box img-style">
                      <img
                        src={post.image}
                        alt="image"
                        width={696}
                        height={644}
                      />
                    </Link>
                    <div className="entry-tag">
                      <span className="tag font-9">Fashion, Liftstyle</span>
                    </div>
                  </div>
                  <div className="entry-content">
                    <div className="info-box">
                      <ul className="meta-list">
                        <li className="item font-9">by {post.author}</li>
                        <li className="item font-9">{post.date}</li>
                        <li className="item font-9">{post.comments}</li>
                      </ul>
                      <Link
                        to={`/blog-single`}
                        className="title fw-medium link text-xl text-line-clamp-2 font-9"
                      >
                        {post.title}
                      </Link>
                      <p className="desc text-main text-sm text-line-clamp-2 font-9">
                        {post.description}
                      </p>
                    </div>
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
