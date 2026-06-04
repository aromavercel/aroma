import React from "react";
import CommonBreadcumb from "@/components/common/Breadcumb";

export default function Breadcumb({
  product,
  backLink = "/catalogo",
  backLabel = "Voltar ao catálogo",
  trail = [],
}) {
  const title = (product?.title && String(product.title).trim()) || "Produto";
  return (
    <CommonBreadcumb
      pageName={title}
      pageTitle={title}
      backLink={backLink}
      backLabel={backLabel}
      trail={trail}
    />
  );
}
