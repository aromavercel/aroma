import React from "react";

export default function ProductHeading({
  showProgress = true,
  inStock = true,
}) {
  return (
    <div className={`tf-product-heading ${inStock ? "" : "pb-0 border-0"}`}>
      <span className="brand-product">KOTON</span>
      <h5 className="product-name fw-medium">Linen Blend Pants</h5>
      <div className="product-rate">
        <div className="list-star">
          <i className="icon icon-star" />
          <i className="icon icon-star" />
          <i className="icon icon-star" />
          <i className="icon icon-star" />
          <i className="icon icon-star" />
        </div>
        <span className="count-review">(5 reviews)</span>
      </div>
      <div className="product-price">
        <div className="display-sm price-new price-on-sale">$60.00</div>
        <div className="display-sm price-old">$80.00</div>
        <span className="badge-sale">20% Off</span>
      </div>
      {inStock ? (
        <div className="product-stock">
          <span className="stock in-stock">In Stock</span>
          <svg
            className="icon"
            width={18}
            height={18}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.2759 10.9242C15.2556 10.6149 14.9236 10.4281 14.6488 10.5714C14.4098 10.6961 13.6603 11.0196 13.0698 11.0196C12.6156 11.0196 12.3132 10.8694 12.3132 10.1362C12.3132 8.12636 15.0124 6.52078 12.6056 3.51218C12.3295 3.16719 11.773 3.41746 11.8469 3.85238C11.8484 3.86145 11.9887 4.77182 11.5632 5.27582C11.3635 5.51218 11.061 5.62711 10.6384 5.62711C9.17454 5.62711 9.27646 1.94027 11.1223 0.795793C11.5328 0.541367 11.2702 -0.0948905 10.8012 0.0119845C10.683 0.0387033 7.88684 0.701328 6.39105 3.62798C5.28035 5.80099 5.88191 7.29977 6.32116 8.39418C6.71371 9.3722 6.89283 9.81857 6.01364 10.4273C5.68251 10.6566 5.42618 10.6328 5.42618 10.6328C4.60384 10.6328 3.82489 9.42402 3.59437 8.95879C3.40712 8.57837 2.83721 8.67311 2.78314 9.09372C2.75993 9.27457 2.24057 13.5513 4.51026 16.1312C5.76076 17.5525 7.50054 18.0581 9.40742 17.9948C11.1702 17.9357 12.5768 17.3395 13.5883 16.2228C15.4639 14.152 15.2844 11.0549 15.2759 10.9242Z"
              fill="#F2721C"
            />
            <path
              d="M4.44845 10.1357C4.04521 9.74669 3.72761 9.22817 3.59412 8.95877C3.40688 8.57834 2.83696 8.67309 2.78289 9.0937C2.75969 9.27454 2.24032 13.5513 4.51001 16.1312C5.2812 17.0077 6.27795 17.5784 7.48458 17.8379C4.95987 16.3506 4.24181 13.0162 4.44845 10.1357Z"
              fill="#EA5513"
            />
            <path
              d="M3.73448 4.51577C3.70506 4.49735 3.66772 4.49735 3.6383 4.51577C2.64745 5.13712 2.64446 6.58633 3.6383 7.20955C3.66723 7.22769 3.70471 7.22825 3.73448 7.20955C4.72533 6.58816 4.72821 5.13898 3.73448 4.51577Z"
              fill="#F2721C"
            />
            <path
              d="M4.12025 4.85809C4.01204 4.72502 3.88239 4.60855 3.73448 4.51577C3.70506 4.49735 3.66772 4.49735 3.6383 4.51577C2.64745 5.13712 2.64446 6.58633 3.6383 7.20955C3.66723 7.22769 3.70471 7.22825 3.73448 7.20955C3.88242 7.11677 4.01208 7.00026 4.12029 6.8672C3.64157 6.28237 3.64072 5.44386 4.12025 4.85809Z"
              fill="#EA5513"
            />
            <path
              d="M10.8011 0.0119845C10.6829 0.0387033 7.88676 0.701328 6.39096 3.62798C4.90723 6.53083 6.48163 8.24741 6.63386 9.34639L6.63403 9.34629C6.69 9.74974 6.54569 10.0588 6.01356 10.4272C5.69392 10.6486 5.40494 10.6816 5.10034 10.5723V10.5727C5.10034 10.5727 6.17507 11.6058 7.26087 10.8972C8.33686 10.1951 8.02601 9.11809 7.85986 8.63131L7.86025 8.63103C7.46365 7.57951 7.11673 6.19027 8.09319 4.27988C8.67292 3.14557 9.44797 2.35153 10.1868 1.80263C10.426 1.38835 10.7395 1.0331 11.1223 0.795758C11.5326 0.541367 11.2701 -0.0948905 10.8011 0.0119845Z"
              fill="#EA5513"
            />
          </svg>
          <span className="text-dark">30 sold in last 24 hours</span>
        </div>
      ) : (
        <>
          <div className="product-stock">
            <span className="stock out-stock">Out of Stock</span>
          </div>
          <button className="tf-btn btn-out-stock">
            This product is currently unavailable
          </button>
        </>
      )}
      {showProgress && (
        <div className="product-progress-sale">
          <div className="title-hurry-up">
            <span className="text-primary fw-medium">HURRY UP!</span> Only{" "}
            <span className="count">4</span> items left!
          </div>
          <div className="progress-sold">
            <div
              className="value"
              style={{ width: "70%" }}
              data-progress={70}
            />
          </div>
        </div>
      )}
    </div>
  );
}
