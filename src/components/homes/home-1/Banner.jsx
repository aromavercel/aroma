import React from "react";
import { Link } from "react-router-dom";
import CountdownTimer from "@/components/common/Countdown";

export default function Banner() {
  return (
    <section>
      <div className="container">
        <div className="s-banner-countdown banner-cd-fashion">
          <div className="image">
            <img
              src="/images/banner/fashion-1.jpg"
              alt=""
              className="lazyload"
              width={1440}
              height={488}
            />
          </div>
          <div className="banner-content text-center text-white">
            <div className="box-title wow fadeInUp">
              <p className="season text-md fw-medium">OFERTA ESPECIAL</p>
              <h2 className="fw-medium text-white">FRETE GRÁTIS</h2>
            </div>
            <div className="box-countdown d-flex justify-content-center wow fadeInUp text-dark">
              <div className="wg-countdown-2">
                <span className="js-countdown">
                  <CountdownTimer
                    targetDate={new Date().setHours(new Date().getHours() + 12)}
                    style={2}
                  />
                </span>
              </div>
            </div>
            <div className="box-btn wow fadeInUp">
              <Link
                to={`/shop-collection-list`}
                className="tf-btn btn-white hover-primary"
              >
                Comprar agora!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
