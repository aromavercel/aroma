"use client";
import React, { useState } from "react";
import Slider1 from "./sliders/Slider1";
import BoughtTogether from "./BoughtTogether";
import { Link } from "react-router-dom";

import ColorSelect1 from "./ColorSelect1";
import SizePicker from "./SizeSelect";
import { useContextElement } from "@/context/Context";
import QuantitySelect from "../common/QuantitySelect";
import StickyProducts from "./StickyProducts";

import CountdownTimer from "../common/Countdown";
export default function Details10({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState("Black");
  const {
    addProductToCart,
    isAddedToCartProducts,
    addToWishlist,
    isAddedtoWishlist,
    addToCompareItem,
    isAddedtoCompareItem,
    cartProducts,
    updateQuantity,
  } = useContextElement();
  return (
    <section className="flat-single-product">
      <div className="tf-main-product section-image-zoom">
        <div className="container">
          <div className="row">
            {/* Product Images */}
            <div className="col-md-6">
              <div className="tf-product-media-wrap sticky-top">
                <div className="product-thumbs-slider">
                  <Slider1
                    activeColor={activeColor}
                    firstItem={product.imgSrc}
                    setActiveColor={setActiveColor}
                  />
                </div>
              </div>
            </div>
            {/* /Product Images */}
            {/* Product Info */}
            <div className="col-md-6">
              <div className="tf-zoom-main" />
              <div className="tf-product-info-wrap position-relative">
                <div className="tf-product-info-list other-image-zoom">
                  <div className="tf-product-heading">
                    <span className="brand-product">KOTON</span>
                    <h5 className="product-name fw-medium">{product.title}</h5>
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
                      <div className="display-sm price-new price-on-sale">
                        ${product.price?.toFixed(2)}
                      </div>
                      {product.oldPrice && (
                        <div className="display-sm price-old">
                          {" "}
                          ${product.oldPrice?.toFixed(2)}
                        </div>
                      )}{" "}
                      <span className="badge-sale">20% Off</span>
                    </div>
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
                      <span className="text-dark">
                        30 sold in last 24 hours
                      </span>
                    </div>
                    <div className="product-info-countdown">
                      <div className="countdown-title">
                        <svg
                          className="tf-ani-tada"
                          width={16}
                          height={16}
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_2579_1618)">
                            <path
                              d="M4.68555 3.17525L3.7513 2.23906C3.53458 2.02191 3.2463 1.90234 2.93952 1.90234C2.63273 1.90234 2.34445 2.02194 2.12777 2.23906L1.45055 2.91775C1.00477 3.36441 1.00477 4.09122 1.45055 4.53791L2.38677 5.47606C2.47833 5.56781 2.59842 5.61369 2.71858 5.61369C2.83836 5.61369 2.9582 5.56803 3.0497 5.47675C3.23295 5.29388 4.50189 4.02078 4.68489 3.83816C4.86811 3.65531 4.86842 3.35853 4.68555 3.17525Z"
                              fill="#105C6E"
                            />
                            <path
                              d="M8 0.09375C7.74112 0.09375 7.53125 0.303625 7.53125 0.5625V2.0625C7.53125 2.32137 7.74112 2.53125 8 2.53125C8.25888 2.53125 8.46875 2.32137 8.46875 2.0625V0.5625C8.46875 0.303625 8.25888 0.09375 8 0.09375Z"
                              fill="#26879C"
                            />
                            <path
                              d="M9.15625 0H6.84375C6.58487 0 6.375 0.209875 6.375 0.46875C6.375 0.727625 6.58487 0.9375 6.84375 0.9375H9.15625C9.41512 0.9375 9.625 0.727625 9.625 0.46875C9.625 0.209875 9.41512 0 9.15625 0Z"
                              fill="#DE513C"
                            />
                            <path
                              d="M8 0H6.84375C6.58487 0 6.375 0.209875 6.375 0.46875C6.375 0.727625 6.58487 0.9375 6.84375 0.9375H8V0Z"
                              fill="#FC6249"
                            />
                            <path
                              d="M13.0826 3.70676C11.7251 2.34639 9.92 1.59717 7.99997 1.59717C6.07994 1.59717 4.27488 2.34639 2.91731 3.70676C1.56 5.06689 0.8125 6.87523 0.8125 8.7986C0.8125 10.722 1.56 12.5303 2.91731 13.8904C4.27488 15.2508 6.07994 16 7.99997 16C9.92 16 11.7251 15.2508 13.0826 13.8904C14.4399 12.5303 15.1874 10.722 15.1874 8.7986C15.1874 6.87523 14.4399 5.06689 13.0826 3.70676Z"
                              fill="#DE513C"
                            />
                            <path
                              d="M7.99997 1.59717C6.07994 1.59717 4.27488 2.34639 2.91731 3.70676C1.56 5.06689 0.8125 6.87523 0.8125 8.7986C0.8125 10.722 1.56 12.5303 2.91731 13.8904C4.27488 15.2508 6.07994 16 7.99997 16V1.59717Z"
                              fill="#FC6249"
                            />
                            <path
                              d="M7.99989 3.39185C5.02433 3.39185 2.60352 5.81728 2.60352 8.79856C2.60352 11.7798 5.02433 14.2053 7.99989 14.2053C10.9755 14.2053 13.3963 11.7798 13.3963 8.79856C13.3963 5.81728 10.9755 3.39185 7.99989 3.39185Z"
                              fill="#96D1D9"
                            />
                            <path
                              d="M7.99989 3.39185C5.02433 3.39185 2.60352 5.81728 2.60352 8.79856C2.60352 11.7798 5.02433 14.2053 7.99989 14.2053V3.39185Z"
                              fill="#F4F2E6"
                            />
                            <path
                              d="M8 4.56272C8.25888 4.56272 8.46875 4.35285 8.46875 4.09397V3.41247C8.31422 3.3991 8.15794 3.39185 8 3.39185C7.84206 3.39185 7.68578 3.3991 7.53125 3.41247V4.09397C7.53125 4.35285 7.74112 4.56272 8 4.56272Z"
                              fill="#105C6E"
                            />
                            <path
                              d="M8 13.0344C7.74112 13.0344 7.53125 13.2443 7.53125 13.5032V14.1847C7.68578 14.198 7.84206 14.2053 8 14.2053C8.15794 14.2053 8.31422 14.198 8.46875 14.1847V13.5032C8.46875 13.2443 8.25888 13.0344 8 13.0344Z"
                              fill="#105C6E"
                            />
                            <path
                              d="M13.3754 8.32983H12.7041C12.4452 8.32983 12.2354 8.53971 12.2354 8.79858C12.2354 9.05746 12.4452 9.26733 12.7041 9.26733H13.3754C13.3887 9.1128 13.3959 8.95652 13.3959 8.79858C13.3959 8.64065 13.3887 8.48437 13.3754 8.32983Z"
                              fill="#105C6E"
                            />
                            <path
                              d="M3.76405 8.79858C3.76405 8.53971 3.55417 8.32983 3.2953 8.32983H2.62402C2.6107 8.48437 2.60352 8.64065 2.60352 8.79858C2.60352 8.95652 2.6107 9.1128 2.62402 9.26733H3.2953C3.55417 9.26733 3.76405 9.05746 3.76405 8.79858Z"
                              fill="#105C6E"
                            />
                            <path
                              d="M9.15643 8.52792H8.49512V6.63208C8.49512 6.37321 8.28524 6.16333 8.02637 6.16333C7.76749 6.16333 7.55762 6.37321 7.55762 6.63208V8.99667C7.55762 9.25555 7.76749 9.46542 8.02637 9.46542H9.15643C9.4153 9.46542 9.62518 9.25555 9.62518 8.99667C9.62518 8.7378 9.4153 8.52792 9.15643 8.52792Z"
                              fill="#105C6E"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_2579_1618">
                              <rect width={16} height={16} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <p className="text-xs fw-medium">
                          <span className="text-primary fw-normal">
                            HURRY UP!
                          </span>{" "}
                          Sale ends in:
                        </p>
                      </div>
                      <div
                        className="js-countdown countdown-box"
                        data-timer={1007500}
                        data-labels="D,H,M,S"
                      >
                        <CountdownTimer style={6} />
                      </div>
                    </div>
                  </div>

                  <div className="tf-product-variant">
                    <ColorSelect1
                      setActiveColor={setActiveColor}
                      activeColor={activeColor}
                    />
                    <SizePicker />
                  </div>
                  <div className="tf-product-total-quantity">
                    <div className="group-btn">
                      <QuantitySelect
                        quantity={
                          isAddedToCartProducts(product.id)
                            ? cartProducts.filter(
                                (elm) => elm.id == product.id
                              )[0].quantity
                            : quantity
                        }
                        setQuantity={(qty) => {
                          if (isAddedToCartProducts(product.id)) {
                            updateQuantity(product.id, qty);
                          } else {
                            setQuantity(qty);
                          }
                        }}
                      />
                      <a
                        href="#shoppingCart"
                        data-bs-toggle="offcanvas"
                        onClick={() => addProductToCart(product.id, quantity)}
                        className="tf-btn hover-primary btn-add-to-cart"
                      >
                        {isAddedToCartProducts(product.id)
                          ? "Already Added"
                          : "Add to cart"}
                      </a>
                    </div>
                    <a
                      href="#"
                      className="tf-btn btn-primary w-100 animate-btn"
                    >
                      Buy it now
                    </a>
                    <Link to={`/checkout`} className="more-choose-payment link">
                      More payment options
                    </Link>
                  </div>
                  <div className="tf-product-extra-link">
                    <a
                      onClick={() => addToWishlist(product.id)}
                      className={`product-extra-icon link btn-add-wishlist ${
                        isAddedtoWishlist(product.id) ? "added-wishlist" : ""
                      } `}
                    >
                      <i className="icon add icon-heart" />
                      <span className="add">Add to wishlist</span>
                      <i className="icon added icon-trash" />
                      <span className="added">Remove from wishlist</span>
                    </a>
                    <a
                      href="#compare"
                      data-bs-toggle="modal"
                      onClick={() => addToCompareItem(product.id)}
                      className="product-extra-icon link"
                    >
                      <i className="icon icon-compare2" />
                      {isAddedtoCompareItem(product.id)
                        ? "Already compared"
                        : "Add to Compare"}
                    </a>
                    <a
                      href="#askQuestion"
                      data-bs-toggle="modal"
                      className="product-extra-icon link"
                    >
                      <i className="icon icon-ask" />
                      Ask a question
                    </a>
                    <a
                      href="#shareSocial"
                      data-bs-toggle="modal"
                      className="product-extra-icon link"
                    >
                      <i className="icon icon-share" />
                      Share
                    </a>
                  </div>
                  <ul className="tf-product-cate-sku text-md">
                    <li className="item-cate-sku">
                      <span className="label">SKU:</span>
                      <span className="value">AD1FSSE0YR</span>
                    </li>
                    <li className="item-cate-sku">
                      <span className="label">Categories:</span>
                      <span className="value">Clothes, Top</span>
                    </li>
                  </ul>

                  <div className="tf-product-trust-seal text-center">
                    <p className="text-md text-dark-2 text-seal fw-medium">
                      Guarantee Safe Checkout:
                    </p>
                    <ul className="list-card">
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/Visa.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/DinersClub.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/Mastercard.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/Stripe.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/PayPal.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/GooglePay.png"
                          width={90}
                          height={64}
                        />
                      </li>
                      <li className="card-item">
                        <img
                          alt="card"
                          src="/images/payment/ApplePay.png"
                          width={90}
                          height={64}
                        />
                      </li>
                    </ul>
                  </div>
                  <div className="tf-product-delivery-return">
                    <div className="product-delivery">
                      <div className="icon icon-car2" />
                      <p className="text-md">
                        Estimated delivery time:
                        <span className="fw-medium">
                          3-5 days international
                        </span>
                      </p>
                    </div>
                    <div className="product-delivery">
                      <div className="icon icon-shipping3" />
                      <p className="text-md">
                        Free shipping on
                        <span className="fw-medium">all orders over $150</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tf-product-fbt">
                  <div className="title text-xl fw-medium">
                    Frequently Bought Together
                  </div>
                  <BoughtTogether />
                </div>
              </div>
            </div>
            {/* /Product Info */}
          </div>
        </div>
      </div>
      <StickyProducts />
    </section>
  );
}
