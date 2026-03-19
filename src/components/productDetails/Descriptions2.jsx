import React from "react";
import Description from "./Description";
import Material from "./Material";
import ReturnPolicies from "./ReturnPolicies";
import AdditionalInfo from "./AdditionalInfo";
import Reviews from "./Reviews";

export default function Descriptions2() {
  return (
    <section className="flat-spacing pt-0">
      <div className="container">
        <div className="flat-animate-tab tab-vertical-product-desc">
          <ul className="menu-tab" role="tablist">
            <li className="nav-tab-item" role="presentation">
              <a
                href="#descriptions"
                className="tab-link active"
                data-bs-toggle="tab"
              >
                Descriptions
              </a>
            </li>
            <li className="nav-tab-item" role="presentation">
              <a href="#materials" className="tab-link" data-bs-toggle="tab">
                Materials
              </a>
            </li>
            <li className="nav-tab-item" role="presentation">
              <a
                href="#returnPolices"
                className="tab-link"
                data-bs-toggle="tab"
              >
                Return Polices
              </a>
            </li>
            <li className="nav-tab-item" role="presentation">
              <a
                href="#additionalInfo"
                className="tab-link"
                data-bs-toggle="tab"
              >
                Additional Information
              </a>
            </li>
            <li className="nav-tab-item" role="presentation">
              <a href="#Reviews" className="tab-link" data-bs-toggle="tab">
                Reviews
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane active show wd-product-descriptions"
              id="descriptions"
              role="tabpanel"
            >
              <Description />
            </div>
            <div
              className="tab-pane wd-product-descriptions"
              id="materials"
              role="tabpanel"
            >
              <Material />
            </div>
            <div
              className="tab-pane wd-product-descriptions"
              id="returnPolices"
              role="tabpanel"
            >
              <ReturnPolicies />
            </div>
            <div
              className="tab-pane wd-product-descriptions"
              id="additionalInfo"
              role="tabpanel"
            >
              <AdditionalInfo />
            </div>
            <div
              className="tab-pane wd-product-descriptions wd-vertical-review"
              id="Reviews"
              role="tabpanel"
            >
              <div className="wd-customer-review">
                <Reviews />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
