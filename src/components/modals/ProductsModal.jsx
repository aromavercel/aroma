"use client";
import React, { useEffect, useRef, useState } from "react";
import CountdownTimer from "../common/Countdown";
import { products1 } from "@/data/products";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard1 from "../productCards/ProductCard1";
import { Navigation, Pagination } from "swiper/modules";

export default function ProductsModal() {
  const [loaded, setLoaded] = useState(false);
  const modalElement = useRef();
  useEffect(() => {
    const showModal = async () => {
      const bootstrap = await import("bootstrap"); // dynamically import bootstrap
      const myModal = new bootstrap.Modal(
        document.getElementById("productPopup"),
        {
          keyboard: false,
        }
      );

      // Show the modal after a delay using a promise
      await new Promise((resolve) => setTimeout(resolve, 2000));
      myModal.show();

      modalElement.current?.addEventListener("hidden.bs.modal", () => {
        myModal.hide();
      });
      setLoaded(true);
    };
    if (!loaded) {
      showModal();
    }
  }, []);
  return (
    <div
      className="modal modalCentered fade popup-product auto-popup"
      id="productPopup"
      ref={modalElement}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="box-hurry-up">
              <span className="icon tf-ani-tada">
                <svg
                  width={25}
                  height={24}
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.52881 4.76287L6.12743 3.35859C5.80235 3.03286 5.36993 2.85352 4.90976 2.85352C4.44959 2.85352 4.01717 3.03291 3.69214 3.35859L2.67631 4.37662C2.00764 5.04661 2.00764 6.13683 2.67631 6.80686L4.08064 8.21409C4.21798 8.35172 4.39812 8.42053 4.57836 8.42053C4.75803 8.42053 4.93779 8.35205 5.07504 8.21512C5.34992 7.94081 7.25332 6.03117 7.52782 5.75723C7.80265 5.48297 7.80312 5.0378 7.52881 4.76287Z"
                    fill="#105C6E"
                  />
                  <path
                    d="M12.5 0.140625C12.1117 0.140625 11.7969 0.455437 11.7969 0.84375V3.09375C11.7969 3.48206 12.1117 3.79688 12.5 3.79688C12.8883 3.79688 13.2031 3.48206 13.2031 3.09375V0.84375C13.2031 0.455437 12.8883 0.140625 12.5 0.140625Z"
                    fill="#26879C"
                  />
                  <path
                    d="M14.2344 0H10.7656C10.3773 0 10.0625 0.314812 10.0625 0.703125C10.0625 1.09144 10.3773 1.40625 10.7656 1.40625H14.2344C14.6227 1.40625 14.9375 1.09144 14.9375 0.703125C14.9375 0.314812 14.6227 0 14.2344 0Z"
                    fill="#DE513C"
                  />
                  <path
                    d="M12.5 0H10.7656C10.3773 0 10.0625 0.314812 10.0625 0.703125C10.0625 1.09144 10.3773 1.40625 10.7656 1.40625H12.5V0Z"
                    fill="#FC6249"
                  />
                  <path
                    d="M20.1239 5.5599C18.0876 3.51934 15.38 2.39551 12.5 2.39551C9.61991 2.39551 6.91231 3.51934 4.87597 5.5599C2.84 7.60008 1.71875 10.3126 1.71875 13.1977C1.71875 16.0827 2.84 18.7952 4.87597 20.8354C6.91231 22.876 9.61991 23.9998 12.5 23.9998C15.38 23.9998 18.0876 22.876 20.1239 20.8354C22.1599 18.7952 23.2812 16.0827 23.2812 13.1977C23.2812 10.3126 22.1599 7.60008 20.1239 5.5599Z"
                    fill="#DE513C"
                  />
                  <path
                    d="M12.5 2.39551C9.61991 2.39551 6.91231 3.51934 4.87597 5.5599C2.84 7.60008 1.71875 10.3126 1.71875 13.1977C1.71875 16.0827 2.84 18.7952 4.87597 20.8354C6.91231 22.876 9.61991 23.9998 12.5 23.9998V2.39551Z"
                    fill="#FC6249"
                  />
                  <path
                    d="M12.4998 5.08789C8.03649 5.08789 4.40527 8.72605 4.40527 13.198C4.40527 17.6699 8.03649 21.3081 12.4998 21.3081C16.9632 21.3081 20.5944 17.6699 20.5944 13.198C20.5944 8.72605 16.9632 5.08789 12.4998 5.08789Z"
                    fill="#96D1D9"
                  />
                  <path
                    d="M12.4998 5.08789C8.03649 5.08789 4.40527 8.72605 4.40527 13.198C4.40527 17.6699 8.03649 21.3081 12.4998 21.3081V5.08789Z"
                    fill="#F4F2E6"
                  />
                  <path
                    d="M12.5 6.8442C12.8883 6.8442 13.2031 6.52939 13.2031 6.14108V5.11883C12.9713 5.09877 12.7369 5.08789 12.5 5.08789C12.2631 5.08789 12.0287 5.09877 11.7969 5.11883V6.14108C11.7969 6.52939 12.1117 6.8442 12.5 6.8442Z"
                    fill="#105C6E"
                  />
                  <path
                    d="M12.5 19.5518C12.1117 19.5518 11.7969 19.8666 11.7969 20.2549V21.2771C12.0287 21.2972 12.2631 21.3081 12.5 21.3081C12.7369 21.3081 12.9713 21.2972 13.2031 21.2771V20.2549C13.2031 19.8666 12.8883 19.5518 12.5 19.5518Z"
                    fill="#105C6E"
                  />
                  <path
                    d="M20.5636 12.4946H19.5566C19.1683 12.4946 18.8535 12.8094 18.8535 13.1978C18.8535 13.5861 19.1683 13.9009 19.5566 13.9009H20.5636C20.5835 13.6691 20.5943 13.4347 20.5943 13.1978C20.5943 12.9608 20.5835 12.7264 20.5636 12.4946Z"
                    fill="#105C6E"
                  />
                  <path
                    d="M6.14607 13.1978C6.14607 12.8094 5.83126 12.4946 5.44295 12.4946H4.43602C4.41605 12.7264 4.40527 12.9608 4.40527 13.1978C4.40527 13.4347 4.41605 13.6691 4.43602 13.9009H5.44295C5.83126 13.9009 6.14607 13.5861 6.14607 13.1978Z"
                    fill="#105C6E"
                  />
                  <path
                    d="M14.2342 12.792H13.2422V9.94824C13.2422 9.55993 12.9274 9.24512 12.5391 9.24512C12.1508 9.24512 11.8359 9.55993 11.8359 9.94824V13.4951C11.8359 13.8834 12.1508 14.1983 12.5391 14.1983H14.2342C14.6225 14.1983 14.9373 13.8834 14.9373 13.4951C14.9373 13.1068 14.6225 12.792 14.2342 12.792Z"
                    fill="#105C6E"
                  />
                </svg>
              </span>
              <h6>
                <span className="text-primary">HURRY UP!</span> Deal ends in:
              </h6>
            </div>
            <div className="box-countdown">
              <span
                className="js-countdown"
                data-timer={599}
                data-labels="Day :,Hour :,Minutes :,Seconds"
              >
                <CountdownTimer style={2} />
              </span>
            </div>
            <span
              className="icon icon-close btn-hide-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <div className="modal-body">
            <Swiper
              dir="ltr"
              className="swiper tf-swiper wrap-sw-over"
              {...{
                slidesPerView: 2,
                spaceBetween: 12,
                speed: 800,
                observer: true,
                observeParents: true,
                slidesPerGroup: 2,
                navigation: {
                  clickable: true,
                  nextEl: ".nav-next-deal",
                  prevEl: ".nav-prev-deal",
                },
                pagination: { el: ".sw-pagination-deal", clickable: true },
                breakpoints: {
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 12,
                    slidesPerGroup: 3,
                  },
                  1200: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                    slidesPerGroup: 4,
                  },
                },
              }}
              modules={[Pagination, Navigation]}
            >
              {products1.slice(0, 5).map((product, i) => (
                <SwiperSlide key={i} className="swiper-slide">
                  <ProductCard1 product={product} />
                </SwiperSlide>
              ))}

              <div className="d-flex d-xl-none sw-dot-default sw-pagination-deal justify-content-center" />
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}
