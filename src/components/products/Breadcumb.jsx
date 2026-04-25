import React from "react";
import CommonBreadcumb from "@/components/common/Breadcumb";

/** Demos de vitrine Vineta: mesma faixa compacta de breadcrumb. */
export default function Breadcumb({ fullWidth = false, showCollection: _showCollection = true }) {
  return <CommonBreadcumb pageName="Women" pageTitle="Women" fullWidth={fullWidth} />;
}
