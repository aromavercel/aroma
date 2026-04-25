import React from "react";
import CommonBreadcumb from "@/components/common/Breadcumb";

/** Perfume / detalhe de produto: breadcrumb compacto + voltar ao catálogo. */
export default function Breadcumb({
  product,
  backLink = "/catalogo",
  backLabel = "Voltar ao catálogo",
}) {
  const title = (product?.title && String(product.title).trim()) || "Produto";
  return (
    <CommonBreadcumb pageName={title} pageTitle={title} backLink={backLink} backLabel={backLabel} />
  );
}
