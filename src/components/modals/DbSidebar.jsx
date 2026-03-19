"use client";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React from "react";
const accountLinks = [
  { href: "/account-page", label: "Dashboard" },
  { href: "/account-orders", label: "My Orders" },
  { href: "/wish-list", label: "My Wishlist" },
  { href: "/account-addresses", label: "Addresses" },
];
export default function DbSidebar() {
  const { pathname } = useLocation();
  return (
    <div
      className="offcanvas offcanvas-start canvas-filter canvas-sidebar canvas-sidebar-account"
      id="mbAccount"
    >
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <span className="title">SIDEBAR ACCOUNT</span>
          <button
            className="icon-close icon-close-popup"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="canvas-body">
          <div className="sidebar-account-wrap sidebar-mobile-append">
            <ul className="my-account-nav">
              {accountLinks.map((elm, i) => (
                <li key={i}>
                  <Link
                    to={elm.href}
                    className={`text-sm link fw-medium my-account-nav-item  ${
                      pathname == elm.href ? "active" : ""
                    }`}
                  >
                    {elm.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
