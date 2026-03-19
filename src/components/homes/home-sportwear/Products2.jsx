"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { sportProducts2 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Products2() {
  const [activeTab, setActiveTab] = useState("What’s Hot?");
  const [filtered, setFiltered] = useState(sportProducts2);

  const tabs = [
    { id: 1, name: "What’s Hot?" },
    { id: 2, name: "Best Sellers" },
    { id: 3, name: "Just Arrivals" },
  ];
  useEffect(() => {
    setFiltered(
      sportProducts2.filter((elm) =>
        elm.tabFilterCategories.includes(activeTab)
      )
    );
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };
  return (
    <div>
      <div className="container-2">
        <div className="flat-animate-tab overflow-visible">
          <div className="flat-title-tab-2 text-center wow fadeInUp">
            <ul
              className="menu-tab-fill-lg justify-content-sm-center"
              role="tablist"
            >
              {tabs.map((tab) => (
                <li key={tab.id} className="nav-tab-item">
                  <a
                    className={`tab-link display-md ${
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
            <div className="tab-pane active show" id="hot" role="tabpanel">
              <div className="hover-sw-nav hover-sw-2">
                <Swiper
                  dir="ltr"
                  className="swiper tf-swiper wrap-sw-over"
                  {...{
                    slidesPerView: 2,
                    spaceBetween: 12,
                    speed: 1000,
                    observer: true,
                    observeParents: true,
                    slidesPerGroup: 2,
                    navigation: {
                      clickable: true,
                      nextEl: ".nav-next-hot",
                      prevEl: ".nav-prev-hot",
                    },
                    pagination: { el: ".sw-pagination-hot", clickable: true },
                    breakpoints: {
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 12,
                        slidesPerGroup: 3,
                      },
                      1200: {
                        slidesPerView: 4,
                        spaceBetween: 24,
                        slidesPerGroup: 4,
                      },
                    },
                  }}
                  modules={[Pagination, Navigation]}
                >
                  {filtered.map((product, i) => (
                    <SwiperSlide key={i} className="swiper-slide">
                      <ProductCard1 product={product} />
                    </SwiperSlide>
                  ))}

                  <div className="d-flex d-xl-none sw-dot-default sw-pagination-hot justify-content-center" />
                </Swiper>
                <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-hot" />
                <div className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-hot" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
