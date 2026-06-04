import React from "react";
import CommonBreadcumb from "@/components/common/Breadcumb";

export default function Breadcumb({ fullWidth = false, showCollection: _showCollection = true }) {
  return <CommonBreadcumb pageName="Women" pageTitle="Women" fullWidth={fullWidth} />;
}
