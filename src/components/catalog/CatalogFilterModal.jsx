"use client";

import React from "react";
import CatalogSidebar from "./CatalogSidebar";

const FILTER_OFFCANVAS_ID = "filterCatalog";

export default function CatalogFilterModal(props) {
  return (
    <div
      className="offcanvas offcanvas-start canvas-sidebar canvas-filter"
      id={FILTER_OFFCANVAS_ID}
      aria-labelledby="filterCatalogLabel"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <span className="title" id="filterCatalogLabel">
            Filtro
          </span>
          <button
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Fechar"
          />
        </div>
        <div className="canvas-body">
          <CatalogSidebar {...props} />
        </div>
      </div>
    </div>
  );
}

export { FILTER_OFFCANVAS_ID };
