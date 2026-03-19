import React from "react";
import ProductCard1 from "../productCards/ProductCard1";

export default function GridProducts({
  products,
  cardStyleClass,
  tooltipDirection = "left",
}) {
  return (
    <>
      {products.map((product, i) => (
        <ProductCard1
          key={i}
          product={product}
          styleClass={cardStyleClass ? cardStyleClass : "grid style-1"}
          tooltipDirection={tooltipDirection}
        />
      ))}
    </>
  );
}
