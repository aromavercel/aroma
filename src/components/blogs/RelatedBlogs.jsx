"use client";
import { blogPosts4 } from "@/data/blogs";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

export default function RelatedBlogs() {
  return (
    <section className="flat-spacing-25">
      <div className="container">
        <div className="flat-title mb_2 wow fadeInUp">
          <h4 className="title">Latest Tips &amp; Trends</h4>
        </div>
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
          {blogPosts4.map((post, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div className="blog-item hover-img">
                <div className="entry_image">
                  <Link to={`/blog-single/${post.id}`} className="img-style">
                    <img
                      src={post.imgSrc}
                      alt=""
                      className="lazyload"
                      width={928}
                      height={790}
                    />
                  </Link>
                </div>
                <div className="blog-content">
                  <div className="entry-tag">
                    <ul className="style-list">
                      <li>
                        <a className={post.categoryClass}>{post.category}</a>
                      </li>
                    </ul>
                  </div>
                  <Link
                    to={`/blog-single/${post.id}`}
                    className="entry_title d-block text-xl fw-medium link"
                  >
                    {post.title}
                  </Link>
                  <p className="entry_sub text-md text-main">
                    {post.description}
                  </p>
                  <ul className="entry-meta">
                    <li className="entry_author">
                      <div className="avatar">
                        <img
                          src={post.authorImg}
                          alt="avatar"
                          className="lazyload"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className="entry_name">
                        Post by <span className="fw-medium">{post.author}</span>
                      </p>
                    </li>
                    <li className="br-line" />
                    <li className="entry_date">
                      <p className="text-md">{post.date}</p>
                    </li>
                    <li className="br-line" />
                    <li className="entry_comment">
                      <p className="text-md">{post.comments}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <div className="d-flex d-xl-none sw-dot-default sw-pagination-new justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
