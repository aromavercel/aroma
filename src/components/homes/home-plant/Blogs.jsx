"use client";
import { blogPosts3 } from "@/data/blogs";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function Blogs() {
  return (
    <section className="flat-spacing-2 bg-light-green-10">
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h3 className="title fw-semibold font-7">Latest Tips &amp; Trends</h3>
        </div>
        <div className="fl-control-sw2 wow fadeInUp">
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
            {blogPosts3.map((post) => (
              <SwiperSlide className="swiper-slide" key={post.id}>
                <div className="blog-item-v2 border-0 bg-white hover-img">
                  <div className="entry-image hover-img">
                    <Link to={`/blog-single`} className="image-box img-style">
                      <img
                        src={post.imgSrc}
                        alt="image"
                        width={696}
                        height={501}
                      />
                    </Link>
                    <div className="entry-tag">
                      {post.tags.map((tag, index) => (
                        <span className="tag" key={index}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="entry-content">
                    <div className="info-box">
                      <ul className="meta-list">
                        <li className="item">by {post.author}</li>
                        <li className="item">{post.date}</li>
                        <li className="item">{post.comments}</li>
                      </ul>
                      <Link
                        to={`/blog-single`}
                        className="title fw-medium link text-xl text-line-clamp-2"
                      >
                        {post.title}
                      </Link>
                      <p className="desc text-main text-sm text-line-clamp-2">
                        {post.description}
                      </p>
                    </div>
                    <Link
                      to={`/blog-single`}
                      className="btn-readmore text-green-2 link"
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
