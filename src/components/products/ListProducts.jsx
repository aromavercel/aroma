import React from "react";
import ProductCard11 from "../productCards/ProductCard11";

export default function ListProducts({ products }) {
  return (
    <>
      {products.map((product, i) => (
        <ProductCard11 key={i} product={product} />
      ))}
    </>
  );
}
