import React from "react";
import Description from "./Description";
import Material from "./Material";
import ReturnPolicies from "./ReturnPolicies";
import AdditionalInfo from "./AdditionalInfo";
import Reviews from "./Reviews";

export default function Description1() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#description"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="description"
            role="button"
          >
            <span>Descriptions</span>
            <span className="icon icon-arrow-down" />
          </div>
          <div id="description" className="collapse">
            <div className="accordion-body widget-desc">
              <Description />
            </div>
          </div>
        </div>
        <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#material"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="material"
            role="button"
          >
            <span>Materials</span>
            <span className="icon icon-arrow-down" />
          </div>
          <div id="material" className="collapse">
            <div className="accordion-body widget-material">
              <Material />
            </div>
          </div>
        </div>
        <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#returnPolicies"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="returnPolicies"
            role="button"
          >
            <span>Return Policies</span>
            <span className="icon icon-arrow-down" />
          </div>
          <div id="returnPolicies" className="collapse">
            <div className="accordion-body">
              <ReturnPolicies />
            </div>
          </div>
        </div>
        <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#additionalInfo"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="additionalInfo"
            role="button"
          >
            <span>Additional Information</span>
            <span className="icon icon-arrow-down" />
          </div>
          <div id="additionalInfo" className="collapse">
            <div className="accordion-body">
              <AdditionalInfo />
            </div>
          </div>
        </div>
        <div className="widget-accordion wd-product-descriptions">
          <div
            className="accordion-title collapsed"
            data-bs-target="#reviews"
            data-bs-toggle="collapse"
            aria-expanded="true"
            aria-controls="reviews"
            role="button"
          >
            <span>Reviews</span>
            <span className="icon icon-arrow-down" />
          </div>
          <div id="reviews" className="collapse">
            <div className="accordion-body wd-customer-review">
              <Reviews />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
