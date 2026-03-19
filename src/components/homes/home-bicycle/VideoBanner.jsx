import React from "react";
import { Link } from "react-router-dom";
export default function VideoBanner() {
  return (
    <div className="s-banner-colection banner-cls-bicycle style-abs">
      <div className="container">
        <div className="banner-content">
          <video autoPlay loop muted playsInline preload="auto">
            <source src="/images/video/bicycle.mp4" type="video/mp4" />
          </video>
          <div className="box-content wow fadeInUp">
            <div className="box-title-banner">
              <p className="title display-md fw-medium text-white">
                Unleash Your Ride
              </p>
              <p className="sub text-md text-white">
                Experience the thrill of top performance
              </p>
            </div>
            <div className="box-btn-banner">
              <Link
                to={`/shop-default`}
                className="tf-btn animate-btn btn-space1 btn-green-2"
              >
                Explore now
                <i className="icon icon-arr-right3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
