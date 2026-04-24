"use client";

import { useState } from "react";
import { iconFeatures } from "@/data/features";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { useContextElement } from "@/context/Context";
import QuantitySelect from "../common/QuantitySelect";

export default function ShopCart() {
  const {
    cartProducts,
    totalPrice,
    updateQuantity,
    removeFromCart,
  } = useContextElement();

  const removeItem = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="flat-spacing-2 pt-0">
      <div className="container">
        <div className="row">
          <div className="col-xl-8">
            <div className="tf-page-cart-main">
              <form className="form-cart" onSubmit={(e) => e.preventDefault()}>
                {cartProducts.length ? (
                  <table className="table-page-cart">
                    <thead>
                      <tr>
                        <th>Produto</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map((product, i) => {
                        const perfumePageId = product.perfume_id ?? product.id;
                        return (
                        <tr key={i} className="tf-cart-item file-delete">
                          <td className="tf-cart-item_product">
                            <Link
                              to={`/perfume/${perfumePageId}`}
                              className="img-box"
                            >
                              <img
                                alt="img-product"
                                src={product.imgSrc}
                                width={684}
                                height={972}
                              />
                            </Link>
                            <div className="cart-info">
                              <Link
                                to={`/perfume/${perfumePageId}`}
                                className="name text-md link fw-medium"
                              >
                                {product.title}
                              </Link>
                              <div className="variants">{product.priceShort || ""}</div>
                              <span
                                className="remove-cart link remove cursor-pointer"
                                onClick={() => removeItem(product.id)}
                              >
                                Remover
                              </span>
                            </div>
                          </td>
                          <td className="tf-cart-item_price text-center">
                            <span className="cart-price price-on-sale text-md fw-medium">
                              {product.priceShort || (Number(product.price) != null ? `R$ ${Number(product.price).toFixed(2)}` : "—")}
                            </span>
                          </td>
                          <td
                            className="tf-cart-item_quantity"
                            data-cart-title="Quantity"
                          >
                            <QuantitySelect
                              quantity={product.quantity}
                              setQuantity={(qty) => {
                                updateQuantity(product.id, qty);
                              }}
                            />
                          </td>
                          <td
                            className="tf-cart-item_total text-center"
                            data-cart-title="Total"
                          >
                            <div className="cart-total total-price text-md fw-medium">
                              {Number(product.price) != null && Number(product.price) > 0
                                ? `R$ ${(Number(product.price) * product.quantity).toFixed(2)}`
                                : product.priceShort ? `${product.priceShort} (×${product.quantity})` : "—"}
                            </div>
                          </td>
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-4">
                    Seu carrinho está vazio. Adicione perfumes do catálogo!{" "}
                    <Link
                      className="tf-btn btn-dark2 animate-btn mt-3"
                      to="/catalogo"
                    >
                      Ver catálogo
                    </Link>
                  </div>
                )}
              </form>
              <div className="fl-iconbox wow fadeInUp">
                <Swiper
                  dir="ltr"
                  className="swiper tf-swiper sw-auto"
                  {...{
                    slidesPerView: 1,
                    spaceBetween: 12,
                    speed: 800,
                    observer: true,
                    observeParents: true,
                    slidesPerGroup: 1,
                    pagination: {
                      el: ".sw-pagination-iconbox",
                      clickable: true,
                    },
                    breakpoints: {
                      575: {
                        slidesPerView: 2,
                        spaceBetween: 12,
                        slidesPerGroup: 2,
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 24,
                        slidesPerGroup: 3,
                      },
                      1200: { slidesPerView: "auto", spaceBetween: 24 },
                    },
                  }}
                  modules={[Pagination, Navigation]}
                >
                  {iconFeatures.map((elm, i) => (
                    <SwiperSlide key={i} className="swiper-slide">
                      <div className="tf-icon-box justify-content-center justify-content-sm-start style-3">
                        <div className="box-icon">
                          <i className={`icon ${elm.iconClass}`} />
                        </div>
                        <div className="content">
                          <div className="title text-uppercase">
                            {elm.title}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center" />
              </div>
            </div>
          </div>
          <div className="col-xl-4">
            <div className="tf-page-cart-sidebar">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="cart-box checkout-cart-box"
              >
                <div className="cart-head">
                  <div className="total-discount text-xl fw-medium">
                    <span>Total:</span>
                    <span className="total">R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-dark-4">
                    Taxas e entrega calculadas no checkout
                  </p>
                </div>
                <div className="checkout-btn">
                  <Link
                    to={`/checkout`}
                    className="tf-btn btn-dark2 animate-btn w-100"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="cart-imgtrust">
                  <p className="text-center text-sm text-dark-1">Aceitamos</p>
                  <div className="cart-list-social">
                    <div className="payment-item">
                      <svg
                        width={46}
                        height={33}
                        viewBox="0 0 46 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x={1}
                          y="1.34782"
                          width={44}
                          height="30.3043"
                          rx={2}
                          fill="white"
                          stroke="#D9D9D9"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.2449 22.0542H11.5187L9.47448 14.1422C9.37745 13.7783 9.17143 13.4565 8.86838 13.3049C8.11208 12.9238 7.27869 12.6205 6.36954 12.4675V12.1629H10.7611C11.3672 12.1629 11.8218 12.6205 11.8976 13.1519L12.9582 18.8591L15.683 12.1629H18.3334L14.2449 22.0542ZM19.8486 22.0542H17.274L19.3941 12.1629H21.9687L19.8486 22.0542ZM25.2996 14.9031C25.3753 14.3704 25.8299 14.0658 26.3603 14.0658C27.1937 13.9893 28.1015 14.1422 28.8591 14.522L29.3137 12.3924C28.556 12.0877 27.7227 11.9348 26.9664 11.9348C24.4675 11.9348 22.6492 13.3049 22.6492 15.2064C22.6492 16.653 23.9372 17.4125 24.8463 17.8701C25.8299 18.3264 26.2087 18.631 26.133 19.0872C26.133 19.7716 25.3753 20.0762 24.619 20.0762C23.7099 20.0762 22.8007 19.8481 21.9687 19.467L21.5141 21.598C22.4233 21.9778 23.4068 22.1307 24.316 22.1307C27.1179 22.2059 28.8591 20.8371 28.8591 18.7826C28.8591 16.1954 25.2996 16.0438 25.2996 14.9031ZM37.8696 22.0542L35.8253 12.1629H33.6295C33.1749 12.1629 32.7204 12.4675 32.5688 12.9238L28.7833 22.0542H31.4337L31.9627 20.609H35.2192L35.5222 22.0542H37.8696ZM34.0083 14.8266L34.7646 18.5545H32.6445L34.0083 14.8266Z"
                          fill="#172B85"
                        />
                      </svg>
                    </div>
                    <div className="payment-item">
                      <svg
                        width={46}
                        height={33}
                        viewBox="0 0 46 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x={1}
                          y="1.34782"
                          width={44}
                          height="30.3043"
                          rx={2}
                          fill="white"
                          stroke="#D9D9D9"
                        />
                        <path
                          d="M25.2234 26.2825C30.4467 26.3081 35.2143 21.9212 35.2143 16.5846C35.2143 10.7492 30.4467 6.71521 25.2234 6.71739H20.728C15.4424 6.71521 11.0913 10.7503 11.0913 16.5846C11.0913 21.9223 15.4424 26.3081 20.728 26.2825H25.2234Z"
                          fill="#0079BE"
                        />
                        <path
                          d="M20.7494 7.52605C15.919 7.52768 12.0055 11.5356 12.0038 16.4822C12.0055 21.4284 15.919 25.4363 20.7494 25.4379C25.5804 25.4363 29.4956 21.4284 29.4961 16.4822C29.4956 11.5356 25.5809 7.52768 20.7494 7.52605ZM15.2062 16.4822C15.2052 15.3385 15.5443 14.2211 16.1792 13.276C16.8141 12.3309 17.7153 11.6021 18.765 11.1849V21.7791C17.7152 21.3621 16.8139 20.6335 16.179 19.6884C15.5441 18.7434 15.205 17.6259 15.2062 16.4822ZM22.7333 21.7813V11.1843C23.7838 11.601 24.6858 12.3297 25.3211 13.2751C25.9565 14.2205 26.2957 15.3386 26.2943 16.4828C26.2955 17.627 25.9562 18.7449 25.3209 19.6903C24.6855 20.6356 23.7837 21.3644 22.7333 21.7813Z"
                          fill="white"
                        />
                        <path
                          d="M25.2234 26.2825C30.4467 26.3081 35.2143 21.9212 35.2143 16.5846C35.2143 10.7492 30.4467 6.71521 25.2234 6.71739H20.728C15.4424 6.71521 11.0913 10.7503 11.0913 16.5846C11.0913 21.9223 15.4424 26.3081 20.728 26.2825H25.2234Z"
                          fill="#0079BE"
                        />
                        <path
                          d="M20.7494 7.52605C15.919 7.52768 12.0055 11.5356 12.0038 16.4822C12.0055 21.4284 15.919 25.4363 20.7494 25.4379C25.5804 25.4363 29.4956 21.4284 29.4961 16.4822C29.4956 11.5356 25.5809 7.52768 20.7494 7.52605ZM15.2062 16.4822C15.2052 15.3385 15.5443 14.2211 16.1792 13.276C16.8141 12.3309 17.7153 11.6021 18.765 11.1849V21.7791C17.7152 21.3621 16.8139 20.6335 16.179 19.6884C15.5441 18.7434 15.205 17.6259 15.2062 16.4822ZM22.7333 21.7813V11.1843C23.7838 11.601 24.6858 12.3297 25.3211 13.2751C25.9565 14.2205 26.2957 15.3386 26.2943 16.4828C26.2955 17.627 25.9562 18.7449 25.3209 19.6903C24.6855 20.6356 23.7837 21.3644 22.7333 21.7813Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="payment-item">
                      <svg
                        width={46}
                        height={33}
                        viewBox="0 0 46 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x={1}
                          y="1.34782"
                          width={44}
                          height="30.3043"
                          rx={2}
                          fill="white"
                          stroke="#D9D9D9"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.4193 23.7341C21.7022 25.1747 19.475 26.0443 17.0411 26.0443C11.6105 26.0443 7.20816 21.7145 7.20816 16.3735C7.20816 11.0324 11.6105 6.70267 17.0411 6.70267C19.475 6.70267 21.7023 7.57233 23.4193 9.01292C25.1364 7.57234 27.3637 6.7027 29.7975 6.7027C35.2281 6.7027 39.6305 11.0325 39.6305 16.3735C39.6305 21.7146 35.2281 26.0443 29.7975 26.0443C27.3636 26.0443 25.1363 25.1747 23.4193 23.7341Z"
                          fill="#ED0006"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.4193 23.7341C25.5335 21.9603 26.8741 19.3209 26.8741 16.3735C26.8741 13.4261 25.5335 10.7867 23.4193 9.01289C25.1363 7.57231 27.3636 6.70267 29.7974 6.70267C35.228 6.70267 39.6304 11.0324 39.6304 16.3735C39.6304 21.7145 35.228 26.0443 29.7974 26.0443C27.3636 26.0443 25.1363 25.1747 23.4193 23.7341Z"
                          fill="#F9A000"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M23.4194 23.7341C25.5335 21.9603 26.8741 19.3209 26.8741 16.3736C26.8741 13.4262 25.5335 10.7868 23.4193 9.01302C21.3052 10.7868 19.9646 13.4262 19.9646 16.3736C19.9646 19.3209 21.3052 21.9603 23.4194 23.7341Z"
                          fill="#FF5E00"
                        />
                      </svg>
                    </div>
                    <div className="payment-item">
                      <svg
                        width={46}
                        height={33}
                        viewBox="0 0 46 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect
                          x={1}
                          y="1.34782"
                          width={44}
                          height="30.3043"
                          rx={2}
                          fill="white"
                          stroke="#D9D9D9"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M24.6785 11.4678L22.3926 11.9655V10.0853L24.6785 9.59682V11.4678ZM15.389 10.6659L13.1669 11.1452L13.1578 18.5277C13.1578 19.8917 14.1687 20.8963 15.5165 20.8963C16.2633 20.8963 16.8098 20.7581 17.1103 20.5922V18.7212C16.8189 18.841 15.3799 19.265 15.3799 17.901V14.6291H17.1103V12.6659H15.3799L15.389 10.6659ZM10.0068 14.5093C9.52414 14.5093 9.23271 14.6475 9.23271 15.007C9.23271 15.3994 9.73426 15.5721 10.3565 15.7862C11.3709 16.1354 12.706 16.595 12.7117 18.2973C12.7117 19.9471 11.4093 20.8964 9.51503 20.8964C8.73181 20.8964 7.87574 20.7397 7.02877 20.371V18.1775C7.79377 18.6014 8.75913 18.9148 9.51503 18.9148C10.025 18.9148 10.3893 18.7765 10.3893 18.3526C10.3893 17.9179 9.84562 17.7192 9.18924 17.4793C8.1896 17.1139 6.92859 16.6531 6.92859 15.1176C6.92859 13.4862 8.15806 12.5093 10.0068 12.5093C10.7627 12.5093 11.5095 12.6291 12.2654 12.9332V15.0991C11.5733 14.7213 10.699 14.5093 10.0068 14.5093ZM36.4266 12.5093C38.585 12.5093 39.7143 14.371 39.7143 16.7305C39.7143 16.8573 39.7083 17.0691 39.7032 17.2492L39.7032 17.2498L39.7032 17.2505L39.7031 17.251L39.7031 17.2516C39.6993 17.3845 39.6961 17.4999 39.6961 17.5507H35.2427C35.3429 18.6383 36.1261 18.9517 37.0095 18.9517C37.9111 18.9517 38.6214 18.7581 39.2407 18.4447V20.2881C38.6214 20.6383 37.8018 20.8871 36.718 20.8871C34.4959 20.8871 32.9477 19.4862 32.9477 16.712C32.9477 14.371 34.2591 12.5093 36.4266 12.5093ZM36.4175 14.3802C35.8437 14.3802 35.2153 14.8134 35.2153 15.8549H37.565C37.565 14.8134 36.973 14.3802 36.4175 14.3802ZM19.9428 13.348L19.7971 12.6659H17.8299V20.7304H20.1067V15.265C20.6441 14.5553 21.5548 14.6844 21.8371 14.7858V12.6659C21.5457 12.5553 20.4801 12.3526 19.9428 13.348ZM22.3924 12.6659H24.6783V20.7304H22.3924V12.6659ZM29.4322 12.5093C28.5397 12.5093 27.966 12.9332 27.6472 13.2282L27.5288 12.6567H25.5252V23.4033L27.802 22.9148L27.8111 20.3065C28.139 20.5461 28.6217 20.8871 29.4231 20.8871C31.0533 20.8871 32.5378 19.56 32.5378 16.6383C32.5287 13.9655 31.026 12.5093 29.4322 12.5093ZM28.8858 18.8595C28.3484 18.8595 28.0297 18.6659 27.8111 18.4263L27.802 15.0069C28.0388 14.7397 28.3667 14.5553 28.8858 14.5553C29.7145 14.5553 30.2883 15.4954 30.2883 16.7028C30.2883 17.9378 29.7236 18.8595 28.8858 18.8595Z"
                          fill="#6461FC"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>
              {/* Card de depoimento comentado para não exibir na página do carrinho
              <div className="cart-box testimonial-cart-box">
                <Swiper
                  dir="ltr"
                  className="swiper tf-swiper"
                  {...{
                    slidesPerView: 1,
                    spaceBetween: 12,
                    speed: 800,
                    pagination: {
                      el: ".sw-pagination-iconbox",
                      clickable: true,
                    },
                    navigation: {
                      clickable: true,
                      nextEl: ".nav-next-tes",
                      prevEl: ".nav-prev-tes",
                    },
                  }}
                  modules={[Pagination, Navigation]}
                >
                  {testimonials12.map((testimonial, index) => (
                    <SwiperSlide className="swiper-slide" key={index}>
                      <div className="box-testimonial-main">
                        <span className="quote icon-quote5" />
                        <div className="content">
                          <div className="list-star-default">
                            {[...Array(5)].map((_, i) => (
                              <i className="icon-star" key={i} />
                            ))}
                          </div>
                          <p className="text-review text-md text-main">
                            {testimonial.review}
                          </p>
                          <div className="box-author">
                            <div className="img">
                              <img
                                alt="author"
                                src={testimonial.imgSrc}
                                width={testimonial.imgWidth}
                                height={testimonial.imgHeight}
                              />
                            </div>
                            <span className="name text-sm fw-medium">
                              {testimonial.name}
                            </span>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  <div className="box-nav-swiper">
                    <div className="swiper-button-prev nav-swiper nav-prev-tes" />
                    <div className="swiper-button-next nav-swiper nav-next-tes" />
                  </div>
                </Swiper>
              </div>
              */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
