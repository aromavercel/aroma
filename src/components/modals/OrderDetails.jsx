import { products1 } from "@/data/products";

import { Link } from "react-router-dom";
import React from "react";

export default function OrderDetails() {
  return (
    <div
      className="modal fade modalCentered modal-order-detail"
      id="order_detail"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="header">
            <div className="heading">Order Detail</div>
            <span
              className="icon-close icon-close-popup"
              data-bs-dismiss="modal"
            />
          </div>
          <ul className="list-infor">
            <li>#12345</li>
            <li>15 May 2024</li>
            <li>6 items</li>
            <li className="text-delivered">Delivered</li>
          </ul>
          <div className="tb-order-detail">
            <div className="top">
              <div className="title item">Product</div>
              <div className="title item d-md-block d-none">Quantity</div>
              <div className="title item d-md-block d-none">Price</div>
              <div className="title item d-md-block d-none">Total</div>
            </div>
            <div className="tb-content">
              {products1.slice(0, 3).map((product, i) => (
                <div key={i} className="order-detail-item">
                  <div className="item">
                    <div className="infor-content">
                      <div className="image">
                        <Link to={`/product-detail/${product.id}`}>
                          <img
                            className="lazyload"
                            alt="img-product"
                            src={product.imgSrc}
                            width={684}
                            height={972}
                          />
                        </Link>
                      </div>
                      <div>
                        <Link
                          className="link"
                          to={`/product-detail/${product.id}`}
                        >
                          {product.title}
                        </Link>
                        <div className="size">White / L</div>
                      </div>
                    </div>
                  </div>
                  <div className="item" data-title="Quantity">
                    2
                  </div>
                  <div className="item" data-title="Price">
                    ${product.price.toFixed()}
                  </div>
                  <div className="item" data-title="Total">
                    ${product.oldPrice?.toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="order-detail-item subtotal">
                <div className="item d-md-block d-none" />
                <div className="item d-md-block d-none" />
                <div className="item subtotal-text">Subtotal:</div>
                <div className="item subtotal-price">
                  $
                  {products1
                    .slice(0, 3)
                    .reduce((sum, item) => sum + item.price, 0)
                    .toFixed(2)}{" "}
                  USD
                </div>
              </div>
            </div>
          </div>
          <div className="bottom text-center">
            Not happy with the order? You can
            <Link to={`/return-and-refund`} className="fw-medium btn-underline">
              Request a free return
            </Link>
            in <span className="fw-medium">14 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}
