import { blogPosts9 } from "@/data/blogs";
import React from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Blogs() {
  return (
    <section>
      <div className="container">
        <div className="flat-title wow fadeInUp">
          <h3 className="title display-lg-4 fw-bold text-dark-orange font-8">
            Stay Updated on Baby Trends
          </h3>
        </div>
        <div className="fl-control-sw2">
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
                nextEl: ".nav-next-tip",
                prevEl: ".nav-prev-tip",
              },
              pagination: { el: ".sw-pagination-tip", clickable: true },
              breakpoints: {
                577: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
                1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 4 },
              },
            }}
            modules={[Pagination, Navigation]}
          >
            {blogPosts9.map((item, index) => (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="blog-item-v2">
                  <div className="entry-image hover-img">
                    <Link
                      to={`/blog-single/${item.id}`}
                      className="image-box img-style"
                    >
                      <img
                        src={item.img}
                        alt="image"
                        width={696}
                        height={501}
                      />
                    </Link>
                    <div className="entry-tag">
                      {item.tags.map((tag, i) => (
                        <span className="tag" key={i}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="entry-content">
                    <div className="info-box">
                      <ul className="meta-list">
                        <li className="item">by {item.author}</li>
                        <li className="item">{item.date}</li>
                        <li className="item">{item.comments}</li>
                      </ul>
                      <Link
                        to={`/blog-single/${item.id}`}
                        className="title fw-medium link text-xl text-line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      <p className="desc text-main text-sm text-line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
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
            <div className="d-flex d-xl-none sw-dot-default sw-pagination-tip justify-content-center" />
          </Swiper>
          <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-tip" />
          <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-tip" />
        </div>
      </div>
    </section>
  );
}
