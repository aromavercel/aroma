import React from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "@/components/common/Countdown";
export default function BannerCountdown() {
  return (
    <section className="s-banner-cd-baby">
      <div className="container">
        <div className="banner-container bg-light-purple-8 wow fadeInUp">
          <div className="content">
            <div className="box-title">
              <h4 className="fw-bold font-8 text-blue">Limited Time Deal</h4>
              <p className="text-md">
                Don't miss out on exclusive discounts! Grab your favorite items
                before they're gone.
              </p>
            </div>
            <div className="box-btn">
              <Link
                to={`/shop-default`}
                className="tf-btn btn-orange-2 animate-btn hover-icon"
              >
                Shop Now
                <i className="icon icon-arr-right" />
              </Link>
            </div>
          </div>
          <div className="wg-countdown">
            <span
              className="js-countdown"
              data-timer={46556}
              data-labels="Days,Hours,Mins,Secs"
            >
              <CountdownTimer style={2} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
