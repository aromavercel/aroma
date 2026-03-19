"use client";
import ProductCard1 from "@/components/productCards/ProductCard1";
import { products9 } from "@/data/products";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Products() {
  const [activeTab, setActiveTab] = useState("Top Sellers");
  const [filtered, setFiltered] = useState(products9);

  const tabs = [
    { id: 1, name: "Top Sellers" },
    { id: 2, name: "On Sale" },
    { id: 3, name: "Trending" },
  ];
  useEffect(() => {
    setFiltered(
      products9.filter((elm) => elm.tabFilterCategories.includes(activeTab))
    );
  }, [activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flat-spacing-3">
      <div className="container">
        <div className="flat-animate-tab">
          <div className="flat-title wow fadeInUp">
            <ul className="menu-tab-line style-lg justify-content-center">
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
            <div className="tab-pane active show">
              <div className="tf-grid-layout tf-col-2 md-col-3 xl-col-4">
                {/* Card Product 1 */}

                {filtered.map((product, i) => (
                  <ProductCard1
                    product={product}
                    key={i}
                    styleClass={product.style}
                    tooltipDirection="top"
                  />
                ))}
              </div>
              <div className="text-center box-btn">
                <Link
                  to={`/shop-default`}
                  className="tf-btn btn-out-line-dark-2 fs-14 lh-20"
                >
                  Show All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
