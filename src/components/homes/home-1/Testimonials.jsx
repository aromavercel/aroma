"use client";
import { testimonials } from "@/data/testimonials";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Testimonials() {
  return (
    <section>
      <div
        className="container"
        style={{ paddingTop: "50px", paddingBottom: "50px" }}
      >
        <div className="flat-title wow fadeInUp">
          <h4 className="title">Feedback de Consumidores</h4>
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
            pagination: { el: ".sw-pagination-tes", clickable: true },
            breakpoints: {
              768: { slidesPerView: 2, spaceBetween: 24, slidesPerGroup: 2 },
              1200: { slidesPerView: 3, spaceBetween: 24, slidesPerGroup: 3 },
            },
          }}
          modules={[Pagination]}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide className="swiper-slide" key={index}>
              <div
                className={`wg-testimonial wow fadeInLeft`}
                {...(item.delay && { "data-wow-delay": item.delay })}
              >
                <div className="content">
                  <div className="content-top">
                    <div className="box-author">
                      <p className="name-author text-sm fw-medium">
                        {item.name}
                      </p>
                      <div className="box-verified text-main">
                        <i className="icon-verifi" />
                        <p className="text-xs fst-italic">
                          Comprador Verificado
                        </p>
                      </div>
                    </div>
                    <div className="list-star-default">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <i key={i} className="icon-star" />
                        ))}
                    </div>
                    <p className="text-review text-sm text-main">
                      {item.review}
                    </p>
                  </div>
                  <span className="br-line d-block" />
                  <div className="box-avt">
                    <div className="avatar">
                      <img
                        alt="author"
                        src={item.image}
                        width={128}
                        height={128}
                      />
                    </div>
                    <div className="box-price">
                      <p className="name-item text-xs">
                        Item comprado:
                        <a
                          href="#"
                          className="fw-medium text-sm link text-line-clamp-1"
                        >
                          {item.product}
                        </a>
                      </p>
                      <p className="price text-md fw-medium">R${item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
          <span className="sw-dot-default sw-pagination-tes justify-content-center" />
        </Swiper>
      </div>
    </section>
  );
}
