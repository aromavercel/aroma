"use client";
import CountdownTimer from "@/components/common/Countdown";
import QuantitySelect from "@/components/common/QuantitySelect";
import Slider1 from "@/components/productDetails/sliders/Slider1";
import { useContextElement } from "@/context/Context";
import { singleStyleProducts } from "@/data/products";

import { Link } from "react-router-dom";
import React, { useState } from "react";
const pickleballProducts = [
  {
    id: 1,
    color: "black",
    size: "small",
    imgSrc: singleStyleProducts[0].imgSrc,
  },
  {
    id: 2,
    color: "green",
    size: "small",
    imgSrc: "/images/products/pickleball/product-2.jpg",
  },
  {
    id: 3,
    color: "blue",
    size: "small",
    imgSrc: "/images/products/pickleball/product-3.jpg",
  },
];
const swatches = [
  {
    color: "black",
    label: "Black",
    src: "/images/products/pickleball/swatch-1.jpg",
  },
  {
    color: "green",
    label: "Green",
    src: "/images/products/pickleball/swatch-2.jpg",
  },
  {
    color: "blue",
    label: "Blue",
    src: "/images/products/pickleball/swatch-3.jpg",
  },
];
export default function SingleProduct() {
  const [activeColor, setActiveColor] = useState("black");
  const [quantity, setQuantity] = useState(1);
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
    <section>
      <div className="container-full">
        <div className="bg-grey-8 md-radius-80 overflow-hidden flat-spacing-30 relative">
          <div className="container">
            <div className="flat-title relative mb_5">
              <h3 className="title fw-normal letter-0 font-10">
                Our Best Seller
              </h3>
            </div>
            <div className="row section-image-zoom">
              {/* Product Images */}
              <div className="col-md-6">
                <div className="tf-product-media-wrap sticky-top">
                  <div className="product-thumbs-slider">
                    <Slider1
                      activeColor={activeColor}
                      setActiveColor={setActiveColor}
                      slideItems={pickleballProducts}
                    />
                  </div>
                </div>
              </div>
              {/* /Product Images */}
              {/* Product Info */}
              <div className="col-md-6">
                <div className="tf-zoom-main" />
                <div className="tf-product-info-wrap other-image-zoom">
                  <div className="tf-product-info-list mb-0">
                    <div className="tf-product-heading pb-0 border-0">
                      <div className="text-sm text-main fw-medium mb_12">
                        SELKIRK
                      </div>
                      <h5 className="product-name fw-medium">
                        {singleStyleProducts[0].title}
                      </h5>
                      <div className="product-rate">
                        <div className="list-star">
                          <i className="icon icon-star text-grey-5" />
                          <i className="icon icon-star text-grey-5" />
                          <i className="icon icon-star text-grey-5" />
                          <i className="icon icon-star text-grey-5" />
                          <i className="icon icon-star text-grey-5" />
                        </div>
                        <span className="count-review">(No review)</span>
                      </div>
                      <div className="product-price">
                        <div className="display-sm price-new price-on-sale text-red-3">
                          ${singleStyleProducts[0].price.toFixed(2)}
                        </div>
                        <div className="display-sm price-old">
                          ${singleStyleProducts[0].oldPrice.toFixed(2)}
                        </div>
                        <span className="badge-sale text-sm bg-brown-13">
                          20% Off
                        </span>
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
                      <div className="product-info-countdown type-1">
                        <div className="countdown-title justify-content-center">
                          <svg
                            className="tf-ani-tada"
                            width={19}
                            height={18}
                            viewBox="0 0 19 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.8347 6.45288L16.1005 6.15088C16.3545 5.86248 16.3105 5.40368 15.9927 5.11508C15.6751 4.82568 15.2087 4.81948 14.9549 5.10788L14.6895 5.41008L15.8347 6.45288Z"
                              fill="#808080"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.248 3.48071H12.3622V4.47671H11.248V3.48071Z"
                              fill="#CCCCCC"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10.8315 2.46069H12.7767C13.0033 2.46069 13.1863 2.64369 13.1863 2.87169V3.34169C13.1863 3.56969 13.0033 3.75269 12.7767 3.75269H10.8315C10.6047 3.75269 10.4219 3.56969 10.4219 3.34169V2.87169C10.4219 2.64369 10.6047 2.46069 10.8315 2.46069Z"
                              fill="#808080"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.804 4.40698C14.8684 4.40698 17.3526 6.89538 17.3526 9.96478C17.3526 13.0346 14.8684 15.5232 11.804 15.5232C10.2908 15.5232 9.28864 15.0216 7.23484 14.3232L7.80664 13.7474C8.06344 13.4882 7.81164 13.016 7.43244 13.1624C5.70784 13.8258 4.70264 13.1174 4.21244 11.5172C4.95424 11.9886 5.97864 11.6636 6.29964 11.3418C6.79704 10.844 6.60284 10.2682 5.48324 10.6382C4.04744 11.1116 2.53384 10.283 1.80664 8.23358C4.00344 9.33718 4.16524 7.06598 6.48564 7.67118C6.28824 6.87498 5.75304 6.61238 4.52724 6.64378C5.74284 5.11178 7.51084 5.90498 9.37544 4.96758C10.1088 4.60858 10.9324 4.40698 11.804 4.40698Z"
                              fill="#FD6B65"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M15.7838 9.96456C15.7838 12.1658 14.003 13.95 11.805 13.95C10.7496 13.95 9.73757 13.5306 8.99137 12.7826C8.24537 12.0354 7.82617 11.0216 7.82617 9.96456C7.82617 8.90696 8.24517 7.89436 8.99137 7.14596C9.73757 6.39876 10.7496 5.97876 11.805 5.97876C14.003 5.97876 15.7838 7.76376 15.7838 9.96456Z"
                              fill="#F2F2F2"
                            />
                            <path
                              d="M11.7429 6.54007C11.6281 6.54187 11.5359 6.63727 11.5371 6.75227V7.05327C11.5371 7.33127 11.9551 7.33127 11.9551 7.05327V6.75227C11.9571 6.63407 11.8611 6.53807 11.7429 6.54007Z"
                              fill="#808080"
                            />
                            <path
                              d="M11.7429 12.6656C11.6281 12.6666 11.5359 12.7616 11.5371 12.8778V13.1778C11.5371 13.4568 11.9551 13.4568 11.9551 13.1778V12.8778C11.9571 12.7598 11.8611 12.6634 11.7429 12.6656Z"
                              fill="#808080"
                            />
                            <path
                              d="M14.6538 9.75586C14.3758 9.75586 14.3758 10.1741 14.6538 10.1741H14.9538C15.2316 10.1741 15.2316 9.75586 14.9538 9.75586H14.6538Z"
                              fill="#808080"
                            />
                            <path
                              d="M8.53843 9.75586C8.26063 9.75586 8.26063 10.1741 8.53843 10.1741H8.83943C9.11743 10.1741 9.11743 9.75586 8.83943 9.75586H8.53843Z"
                              fill="#808080"
                            />
                            <path
                              d="M13.8011 11.8135C13.6131 11.8135 13.5211 12.0415 13.6557 12.1719L13.8669 12.3843C13.9475 12.4713 14.0841 12.4729 14.1679 12.3897C14.2513 12.3059 14.2485 12.1701 14.1615 12.0897L13.9503 11.8775C13.9109 11.8367 13.8577 11.8135 13.8011 11.8135Z"
                              fill="#808080"
                            />
                            <path
                              d="M9.47626 7.48267C9.28886 7.48267 9.19726 7.71067 9.33106 7.84127L9.54326 8.05247C9.62346 8.13907 9.76046 8.14247 9.84426 8.05847C9.92766 7.97507 9.92446 7.83807 9.83786 7.75747L9.62666 7.54647C9.58706 7.50567 9.53286 7.48267 9.47626 7.48267Z"
                              fill="#808080"
                            />
                            <path
                              d="M14.0103 7.48279C13.9561 7.48399 13.9035 7.50699 13.8661 7.54659L13.6549 7.75759C13.5683 7.83819 13.5651 7.97519 13.6485 8.05859C13.7321 8.14239 13.8693 8.13919 13.9495 8.05259L14.1607 7.84139C14.2977 7.70859 14.2005 7.47659 14.0103 7.48279Z"
                              fill="#808080"
                            />
                            <path
                              d="M9.68663 11.8136C9.63243 11.8158 9.57983 11.8376 9.54243 11.8776L9.33023 12.0898C9.24343 12.1702 9.24143 12.306 9.32483 12.3898C9.40843 12.4732 9.54523 12.4714 9.62583 12.3844L9.83703 12.172C9.97403 12.0396 9.87703 11.8086 9.68663 11.8136Z"
                              fill="#808080"
                            />
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.8026 9.65238C11.9772 9.65238 12.1152 9.78958 12.1152 9.96498C12.1152 10.1408 11.9774 10.2776 11.8026 10.2776C11.6282 10.2776 11.49 10.1408 11.49 9.96498C11.49 9.78938 11.6282 9.65238 11.8026 9.65238ZM13.2124 8.27838C13.1592 8.27938 13.107 8.30138 13.0692 8.33998L12.1068 9.30478C12.0136 9.26098 11.9112 9.23478 11.8026 9.23478C11.4024 9.23478 11.0742 9.56498 11.0742 9.96498C11.0742 10.3652 11.4024 10.6958 11.8026 10.6958C12.2028 10.6958 12.5312 10.3652 12.5312 9.96498C12.5312 9.82398 12.4892 9.69358 12.4194 9.58158L13.364 8.63478C13.4978 8.50198 13.4016 8.27398 13.2124 8.27838Z"
                              fill="#808080"
                            />
                          </svg>
                          <p className="text-xs fw-medium">
                            HURRY UP! Sale ends in:
                          </p>
                        </div>
                        <div className="js-countdown countdown-box">
                          <CountdownTimer style={2} />
                        </div>
                      </div>
                    </div>
                    <div className="tf-product-variant">
                      <div className="variant-picker-item variant-color">
                        <div className="variant-picker-label">
                          Colors:
                          <span className="variant-picker-label-value value-currentColor">
                            {activeColor}
                          </span>
                        </div>
                        <div className="variant-picker-values">
                          {swatches.map((swatch, index) => (
                            <div
                              key={index}
                              className={`hover-tooltip tooltip-bot color-btn style-image ${
                                activeColor === swatch.color ? "active" : ""
                              }`}
                              onClick={() => setActiveColor(swatch.color)}
                            >
                              <div className="img">
                                <img
                                  className="lazyload"
                                  data-src={swatch.src}
                                  alt="img"
                                  width={64}
                                  height={64}
                                  src={swatch.src}
                                />
                              </div>
                              <span className="tooltip">{swatch.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="tf-product-total-quantity">
                      <div className="group-btn">
                        <QuantitySelect
                          quantity={
                            isAddedToCartProducts(singleStyleProducts[0].id)
                              ? cartProducts.filter(
                                  (elm) => elm.id == singleStyleProducts[0].id
                                )[0].quantity
                              : quantity
                          }
                          setQuantity={(qty) => {
                            if (
                              isAddedToCartProducts(singleStyleProducts[0].id)
                            ) {
                              updateQuantity(singleStyleProducts[0].id, qty);
                            } else {
                              setQuantity(qty);
                            }
                          }}
                        />
                        <a
                          href="#shoppingCart"
                          data-bs-toggle="offcanvas"
                          onClick={() =>
                            addProductToCart(
                              singleStyleProducts[0].id,
                              quantity
                            )
                          }
                          className="tf-btn animate-btn btn-add-to-cart btn-orange-3"
                        >
                          {isAddedToCartProducts(singleStyleProducts[0].id)
                            ? "Already Added"
                            : "Add to cart"}
                        </a>
                        <a
                          onClick={() =>
                            addToWishlist(singleStyleProducts[0].id)
                          }
                          className={`box-icon hover-tooltip tooltip-top product-btns btn-add-wishlist  ${
                            isAddedtoWishlist(singleStyleProducts[0].id)
                              ? "added-wishlist"
                              : ""
                          } `}
                        >
                          <span className="icon add icon-heart" />
                          <span className="tooltip add">Add to Wishlist</span>
                          <i className="icon added icon-trash" />
                          <span className="tooltip added">
                            Remove from wishlist
                          </span>
                        </a>
                        <a
                          href="#compare"
                          data-bs-toggle="modal"
                          aria-controls="compare"
                          onClick={() =>
                            addToCompareItem(singleStyleProducts[0].id)
                          }
                          className="box-icon hover-tooltip tooltip-top product-btns"
                        >
                          <span className="icon icon-compare" />
                          <span className="tooltip">
                            {isAddedtoCompareItem(singleStyleProducts[0].id)
                              ? "Already compared"
                              : "Add to Compare"}
                          </span>
                        </a>
                      </div>
                      <Link
                        to={`/checkout`}
                        className="tf-btn btn-primary w-100 animate-btn bg-dark-7 border-0"
                      >
                        Buy it now
                      </Link>
                      <Link
                        to={`/checkout`}
                        className="more-choose-payment link"
                      >
                        More payment options
                      </Link>
                    </div>
                    <Link
                      to={`/product-detail/${singleStyleProducts[0].id}`}
                      className="view-details link fw-medium"
                    >
                      View full details <i className="icon icon-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
              {/* /Product Info */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
