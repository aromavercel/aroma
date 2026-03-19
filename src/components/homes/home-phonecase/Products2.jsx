"use client";
import ProductCard6 from "@/components/productCards/ProductCard6";
import { products14 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2() {
  const [activeTab, setActiveTab] = useState("Personalized");
  const [filtered, setFiltered] = useState(products14);

  const tabs = [
    { id: 1, name: "iPhone" },
    { id: 2, name: "Android" },
    { id: 3, name: "Personalized" },
  ];
  useEffect(() => {
    if (activeTab == "Personalized") {
      setFiltered(products14);
    } else {
      setFiltered(products14.filter((elm) => elm.device == activeTab));
    }
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <section className="bg-white mx_40 radius-16 flat-spacing-12">
      <div className="container-3">
        <div className="flat-animate-tab">
          <div className="flat-title-tab text-center wow fadeInUp">
            <div className="box-title">
              <p className="text-md fw-medium text-uppercase text-primary">
                Discover our top picks
              </p>
              <h4 className="title">Just Arrivals</h4>
            </div>
            <ul className="menu-tab-line style-md justify-content-center">
              {tabs.map((tab) => (
                <li key={tab.id} className="nav-tab-item">
                  <a
                    className={`font-2 tab-link ${
                      activeTab === tab.name ? "active" : ""
                    }`}
                    onClick={() => handleTabClick(tab.name)}
                    style={{ cursor: "pointer" }}
                  >
                    {tab.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="tab-content">
            <div className="tab-pane active show" id="iPhone" role="tabpanel">
              <Swiper
                dir="ltr"
                className="swiper tf-swiper"
                {...{
                  slidesPerView: 2,
                  spaceBetween: 12,
                  speed: 800,
                  observer: true,
                  observeParents: true,
                  navigation: {
                    clickable: true,
                    nextEl: ".nav-next-iphone",
                    prevEl: ".nav-prev-iphone",
                  },
                  pagination: {
                    el: ".sw-pagination-iphone",
                    clickable: true,
                    type: "progressbar",
                  },
                  breakpoints: {
                    768: { slidesPerView: 3, spaceBetween: 12 },
                    1200: { slidesPerView: 4, spaceBetween: 24 },
                  },
                }}
                modules={[Pagination, Navigation]}
              >
                {filtered.map((product, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <ProductCard6 product={product} />
                  </SwiperSlide>
                ))}

                <div className="sw-pagination-iphone position-relative" />
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
