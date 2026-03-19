import React from "react";
import { Link } from "react-router-dom";

import CountdownTimer from "@/components/common/Countdown";
export default function Banner() {
  return (
    <section className="s-banner-countdown banner-cd-phonecase">
      <div className="banner-wrap">
        <div className="banner-content text-center">
          <div className="box-title">
            <h4>Limited-Time Sale</h4>
            <p className="sub text-md">Get your favorite cases at a discount</p>
          </div>
          <div className="box-countdown">
            <div className="wg-countdown">
              <span
                className="js-countdown d-flex justify-content-center"
                data-timer={900610}
                data-labels="Days,Hours,Mins,Secs"
              >
                <CountdownTimer style={2} />
              </span>
            </div>
          </div>
          <div className="box-btn">
            <Link to={`/shop-default`} className="tf-btn fw-normal animate-btn">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="image">
          <img
            src="/images/banner/cd-phonecase.jpg"
            alt=""
            className="lazyload effect-paralax"
            width={1840}
            height={738}
          />
        </div>
      </div>
    </section>
  );
}
