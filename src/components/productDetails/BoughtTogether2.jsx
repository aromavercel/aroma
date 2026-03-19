"use client";

export default function BoughtTogether2() {
  return (
    <div className="tf-product-fbt-wrap">
      <form
        className="tf-product-form-fbt"
        onSubmit={(e) => e.preventDefault()}
      >
        <h6 className="title text-center">Frequently Bought Together</h6>
        <div className="content-fbt">
          <div className="list-fbt">
            <div className="fbt-image">
              <img
                alt="img-fbt"
                src="/images/products/fashion/women-black-1.jpg"
                width={828}
                height={1241}
              />
            </div>
            <span className="fbt-plus">
              <span className="icon icon-plus2" />
            </span>
            <div className="fbt-image">
              <img
                alt="img-fbt"
                src="/images/products/fashion/women-black-1.jpg"
                width={828}
                height={1241}
              />
            </div>
            <span className="fbt-plus">
              <span className="icon icon-plus2" />
            </span>
            <div className="fbt-image">
              <img
                alt="img-fbt"
                src="/images/products/fashion/women-black-1.jpg"
                width={828}
                height={1241}
              />
            </div>
          </div>
          <div className="fbt-swatches">
            <div className="fbt-info">
              <div className="bundle-check">
                <input
                  type="checkbox"
                  defaultChecked="checked"
                  className="tf-check"
                />
              </div>
              <div className="bundle-title text-md fw-medium">
                Single Breasted Blazer
              </div>
              <div className="bundle-variant tf-select">
                <select>
                  <option>White / S</option>
                  <option>White / S</option>
                  <option>White / M</option>
                  <option>White / L</option>
                  <option>Black / M</option>
                  <option>Black / L</option>
                  <option>Blue / S</option>
                  <option>Blue / M</option>
                  <option>Blue / L</option>
                  <option>Blue / XL</option>
                </select>
              </div>
              <div className="bundle-price text-md fw-medium">
                <span className="new-price">$130.00</span>
                <span className="old-price">$120.00</span>
              </div>
            </div>
            <div className="fbt-info">
              <div className="bundle-check">
                <input
                  type="checkbox"
                  defaultChecked="checked"
                  className="tf-check"
                />
              </div>
              <div className="bundle-title text-md fw-medium">
                Single Breasted Blazer
              </div>
              <div className="bundle-variant tf-select">
                <select>
                  <option>White / S</option>
                  <option>White / S</option>
                  <option>White / M</option>
                  <option>White / L</option>
                  <option>Black / M</option>
                  <option>Black / L</option>
                  <option>Blue / S</option>
                  <option>Blue / M</option>
                  <option>Blue / L</option>
                  <option>Blue / XL</option>
                </select>
              </div>
              <div className="bundle-price text-md fw-medium">
                <span className="new-price">$130.00</span>
                <span className="old-price">$120.00</span>
              </div>
            </div>
            <div className="fbt-info">
              <div className="bundle-check">
                <input
                  type="checkbox"
                  defaultChecked="checked"
                  className="tf-check"
                />
              </div>
              <div className="bundle-title text-md fw-medium">
                Single Breasted Blazer
              </div>
              <div className="bundle-variant tf-select">
                <select>
                  <option>White / S</option>
                  <option>White / S</option>
                  <option>White / M</option>
                  <option>White / L</option>
                  <option>Black / M</option>
                  <option>Black / L</option>
                  <option>Blue / S</option>
                  <option>Blue / M</option>
                  <option>Blue / L</option>
                  <option>Blue / XL</option>
                </select>
              </div>
              <div className="bundle-price text-md fw-medium">
                <span className="new-price">$130.00</span>
                <span className="old-price">$120.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="fbt-total-price text-xl fw-medium">
          <span>Total Price: </span>
          <div className="d-flex align-items-center">
            <span className="price-new">$240.00</span>
            <span className="price-old">$240.00</span>
          </div>
        </div>
        <button className="tf-btn btn-primary animate-btn">
          Add selected to Cart
        </button>
      </form>
    </div>
  );
}
