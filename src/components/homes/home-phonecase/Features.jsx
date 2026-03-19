import React from "react";

export default function Features() {
  return (
    <section className="flat-spacing-3">
      <div className="container-3">
        <div className="banner-tagline-phonecase hover-img hover-shine">
          <div className="image shine-item img-style">
            <img
              src="/images/banner/phonecase.jpg"
              alt=""
              className="lazyload"
              width={759}
              height={621}
            />
          </div>
          <div className="content wow fadeInUp">
            <h4>What Make Us Different?</h4>
            <ul className="list-tagline">
              <li>
                <div className="icon">
                  <i className="icon-protection" />
                </div>
                <div className="box-text">
                  <h6>Durable Protection</h6>
                  <p className="text-md">
                    Our cases are designed to withstand drops and scratches,
                    keeping your phone safe.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <i className="icon-designs" />
                </div>
                <div className="box-text">
                  <h6>Stylish Designs</h6>
                  <p className="text-md">
                    Choose from a wide range of trendy and unique designs that
                    suit your style.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <i className="icon-fit" />
                </div>
                <div className="box-text">
                  <h6>Perfect Fit</h6>
                  <p className="text-md">
                    Each case is precisely crafted to fit your phone model,
                    ensuring easy access to all buttons and ports.
                  </p>
                </div>
              </li>
              <li>
                <div className="icon">
                  <i className="icon-quality" />
                </div>
                <div className="box-text">
                  <h6>Affordable Quality</h6>
                  <p className="text-md">
                    Enjoy premium protection without breaking the bank.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
