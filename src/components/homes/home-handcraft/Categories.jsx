import { Link } from "react-router-dom";
import React from "react";
const offerItems = [
  {
    image: "/images/section/offer-5.jpg",
    title: "Handmade",
    count: "10 items",
  },
  {
    image: "/images/section/offer-6.jpg",
    title: "Ceramic",
    count: "10 items",
  },
  {
    image: "/images/section/offer-7.jpg",
    title: "Bamboo",
    count: "10 items",
  },
];

export default function Categories() {
  return (
    <section className="flat-spacing-3">
      <div className="container">
        <div className="tf-grid-layout md-col-3">
          {offerItems.map((item, index) => (
            <div className="wg-offer hover-img" key={index}>
              <Link to={`/shop-default`} className="image d-block img-style">
                <img
                  src={item.image}
                  alt=""
                  className="lazyload"
                  width={696}
                  height={693}
                />
              </Link>
              <div className="content text-center wow fadeInUp">
                <div className="box-title gap-4">
                  <div>
                    <Link
                      to={`/shop-default`}
                      className="link text-xl font-9 fw-medium"
                    >
                      {item.title}
                    </Link>
                  </div>
                  <p className="text-xl text-grey-3">{item.count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
