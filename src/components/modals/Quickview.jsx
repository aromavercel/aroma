"use client";
import { useContextElement } from "@/context/Context";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import QuantitySelect from "../common/QuantitySelect";

import ColorSelect1 from "../productDetails/ColorSelect1";
import SizePicker from "../productDetails/SizeSelect";
export default function Quickview() {
  const [activeColor, setActiveColor] = useState("gray");
  const [quantity, setQuantity] = useState(1); // Initial quantity is 1
  const {
    quickViewItem,
    addProductToCart,
    isAddedToCartProducts,

    cartProducts,
    updateQuantity,
  } = useContextElement();
  if (!quickViewItem) {
    return (
      <div className="modal fade modalCentered modal-quick-view" id="quickView">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <span className="icon-close icon-close-popup" data-bs-dismiss="modal" />
            <div className="p-4 text-center text-muted">Nenhum produto selecionado.</div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="modal fade modalCentered modal-quick-view" id="quickView">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <span
            className="icon-close icon-close-popup"
            data-bs-dismiss="modal"
          />
          <div className="tf-product-media-wrap">
            <Swiper
              dir="ltr"
              className="swiper tf-single-slide"
              modules={[Navigation]}
              navigation={{
                prevEl: ".qvsnp1",
                nextEl: ".qvsnn1",
              }}
            >
              <SwiperSlide className="swiper-slide" data-color="orange">
                <div className="item">
                  <img
                    className="lazyload"
                    alt=""
                    src={quickViewItem.imgSrc}
                    width={513}
                    height={729}
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide" data-color="orange">
                <div className="item">
                  <img
                    className="lazyload"
                    alt=""
                    src={
                      quickViewItem.imgHover
                        ? quickViewItem.imgHover
                        : quickViewItem.imgSrc
                    }
                    width={513}
                    height={729}
                  />
                </div>
              </SwiperSlide>

              <div className="swiper-button-prev nav-swiper arrow-1 nav-prev-cls single-slide-prev qvsnp1" />
              <div className="swiper-button-next nav-swiper arrow-1 nav-next-cls single-slide-next qvsnn1" />
            </Swiper>
          </div>
          <div className="tf-product-info-wrap">
            <div className="tf-product-info-inner">
              <div className="tf-product-heading">
                <h6 className="product-name">
                  <Link
                    to={`/product-detail/${quickViewItem.id}`}
                    className="link"
                  >
                    {quickViewItem.title}
                  </Link>
                </h6>
                <div className="product-price">
                  <h6 className="price-new price-on-sale">
                    {" "}
                    ${quickViewItem.price.toFixed(2)}
                  </h6>
                  {quickViewItem.oldPrice && (
                    <h6 className="price-old">
                      ${quickViewItem.oldPrice.toFixed(2)}
                    </h6>
                  )}
                  <span className="badge-sale">20% Off</span>
                </div>
                <p className="text">
                  A beautifully handcrafted item made with care and premium
                  materials, showcasing unique artistry and thoughtful details.
                  Ideal for adding warmth and character to any space, while
                  celebrating the charm of handmade craftsmanship.
                </p>
              </div>

              <div className="tf-product-total-quantity">
                <div className="group-btn">
                  <QuantitySelect
                    quantity={
                      isAddedToCartProducts(quickViewItem.id)
                        ? cartProducts.filter(
                            (elm) => elm.id == quickViewItem.id
                          )[0].quantity
                        : quantity
                    }
                    setQuantity={(qty) => {
                      if (isAddedToCartProducts(quickViewItem.id)) {
                        updateQuantity(quickViewItem.id, qty);
                      } else {
                        setQuantity(qty);
                      }
                    }}
                  />
                  <a
                    href="#shoppingCart"
                    data-bs-toggle="offcanvas"
                    className="tf-btn hover-primary"
                    onClick={() => addProductToCart(quickViewItem.id, quantity)}
                  >
                    {isAddedToCartProducts(quickViewItem.id)
                      ? "Already Added"
                      : "Add to cart -"}
                  </a>
                </div>
                <a
                  href="#"
                  className="tf-btn w-100 animate-btn paypal btn-primary"
                >
                  Buy It Now
                </a>
                <Link to={`/checkout`} className="more-choose-payment link">
                  More payment options
                </Link>
              </div>
              <Link
                to={`/product-detail/${quickViewItem.id}`}
                className="view-details link"
              >
                View full details <i className="icon icon-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
