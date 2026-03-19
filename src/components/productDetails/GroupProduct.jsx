"use client";
import { useContextElement } from "@/context/Context";
import { groupedProducts } from "@/data/products";

import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function GroupProduct() {
  const [products, setProducts] = useState(() =>
    groupedProducts.map((elm) => ({ ...elm, quantity: 1 }))
  );

  const updateQuantity = (id, type) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id) {
          let newQty = product.quantity;
          if (type === "increase") newQty += 1;
          if (type === "decrease" && newQty > 1) newQty -= 1;
          return { ...product, quantity: newQty };
        }
        return product;
      })
    );
  };
  const { addProductToCart, isAddedToCartProducts } = useContextElement();
  return (
    <form action="#" className="form-group-product">
      <div className="table-group-product">
        {products.map((product) => (
          <div className="item-product" key={product.id}>
            <div className="item-product-name">
              <img
                className="img-product"
                alt="img-product"
                src={product.imgSrc}
                width="249"
                height="249"
              />
              <Link
                href="/product-detail"
                className="name link text-md fw-medium"
              >
                {product.title}
              </Link>
            </div>
            <div className="item-product-content">
              <div className="item-product-price">
                {product.oldPrice !== undefined ? (
                  <div className="box-price text-md fw-medium">
                    <span className="price-new">
                      ${product.price?.toFixed(2)}
                    </span>{" "}
                    <span className="price-old">
                      ${product.oldPrice?.toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <div className="text-md fw-medium">
                    ${product.price?.toFixed(2)}
                  </div>
                )}
                {product.note && (
                  <p
                    className={`note ${
                      product.note.includes("stock") ? "in-stock" : "available"
                    }`}
                  >
                    {product.note}
                  </p>
                )}
              </div>

              {product.quantityEnabled && (
                <div className="wg-quantity">
                  <button
                    type="button"
                    className="btn-quantity minus-btn"
                    onClick={() => updateQuantity(product.id, "decrease")}
                  >
                    -
                  </button>
                  <input
                    className="quantity-product"
                    type="text"
                    readOnly
                    value={product.quantity}
                  />
                  <button
                    type="button"
                    className="btn-quantity plus-btn"
                    onClick={() => updateQuantity(product.id, "increase")}
                  >
                    +
                  </button>
                </div>
              )}

              {product.quickShop && (
                <button
                  type="button"
                  data-bs-target="#quickAdd"
                  data-bs-toggle="modal"
                  className="tf-btn animate-btn"
                >
                  Quick Shop
                </button>
              )}

              {product.visitStore && (
                <Link href="/store-location" className="tf-btn animate-btn">
                  Visit the store!
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="tf-product-total-quantity">
        <button
          type="button"
          data-bs-target="#shoppingCart"
          data-bs-toggle="offcanvas"
          onClick={() => {
            products.forEach((product) => {
              addProductToCart(product.id, product.quantity);
            });
          }}
          className="tf-btn w-100 animate-btn btn-add-to-cart"
        >
          {products.every((product, i) => isAddedToCartProducts(product.id))
            ? "Already Added"
            : "Add to Cart"}
        </button>
        <Link href="/checkout" className="tf-btn btn-primary w-100 animate-btn">
          Buy it now
        </Link>
      </div>
    </form>
  );
}
