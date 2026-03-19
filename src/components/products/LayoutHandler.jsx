"use client";
import React from "react";

import { useEffect } from "react";

export default function LayoutHandler({
  activeLayout,
  setActiveLayout,
  hasSidebar = false,
}) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1200 && window.innerWidth > 767) {
        setActiveLayout((pre) => (pre > 3 ? 3 : pre));
      } else if (window.innerWidth < 768) {
        setActiveLayout((pre) => (pre > 2 ? 2 : pre));
      }
    };
    handleResize();
    // Add the resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <li
        className={`tf-view-layout-switch sw-layout-list list-layout ${
          activeLayout == 1 ? "active" : ""
        }`}
        onClick={() => setActiveLayout(1)}
      >
        <div className="item icon-list">
          <span />
          <span />
        </div>
      </li>
      <li
        className={`tf-view-layout-switch sw-layout-2 ${
          activeLayout == 2 ? "active" : ""
        }`}
        onClick={() => setActiveLayout(2)}
      >
        <div className="item icon-grid-2">
          <span />
          <span />
        </div>
      </li>
      <li
        className={`tf-view-layout-switch sw-layout-3 ${
          activeLayout == 3 ? "active" : ""
        }`}
        onClick={() => setActiveLayout(3)}
      >
        <div className="item icon-grid-3">
          <span />
          <span />
          <span />
        </div>
      </li>
      <li
        className={`tf-view-layout-switch sw-layout-4 ${
          activeLayout == 4 ? "active" : ""
        }`}
        onClick={() => setActiveLayout(4)}
      >
        <div className="item icon-grid-4">
          <span />
          <span />
          <span />
          <span />
        </div>
      </li>
    </>
  );
}
