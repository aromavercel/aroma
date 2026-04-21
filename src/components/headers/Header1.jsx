"use client";
import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import CartLength from "../common/CartLength";
import WishlistLength from "../common/WishlistLength";
import UserAccountTrigger from "../common/UserAccountTrigger";

import { useLocation } from "react-router-dom";
export default function Header1({
  parentClass = "header-default",
  fullWidth = false,
}) {
  const { pathname } = useLocation();
  return (
    <header id="header" className={parentClass}>
      <div className={fullWidth ? "container-full" : "container"}>
        <div className="row wrapper-header align-items-center">
          <div className="col-md-4 col-3 d-xl-none">
            <a
              href="#mobileMenu"
              className="mobile-menu"
              data-bs-toggle="offcanvas"
              aria-controls="mobileMenu"
            >
              <i className="icon icon-categories1" />
            </a>
          </div>
          <div className="col-xl-2 col-md-4 col-6">
            <Link to={`/`} className="logo-header">
              <img
                alt="logo"
                className="logo"
                src="/images/logo/aromaexpresso.svg"
                width={148}
                height={44}
              />
            </Link>
          </div>
          <div className="col-xl-8 d-none d-xl-block">
            <nav className="box-navigation text-center">
              <ul className="box-nav-menu">
                <Nav />
              </ul>
            </nav>
          </div>
          <div className="col-xl-2 col-md-4 col-3">
            <ul className="nav-icon d-flex justify-content-end align-items-center">
              <li className="nav-search">
                <Link to="/buscar" className="nav-icon-item">
                  <i className="icon icon-search" />
                </Link>
              </li>
              <UserAccountTrigger />
              <li className="nav-wishlist">
                <Link to={`/wish-list`} className="nav-icon-item">
                  <i className="icon icon-heart" />
                  <span className="count-box">
                    <WishlistLength />
                  </span>
                </Link>
              </li>
              <li className="nav-cart">
                <a
                  href="#shoppingCart"
                  data-bs-toggle={`${
                    pathname == "/cart-drawer-v2" ? "modal" : "offcanvas"
                  }`}
                  className="nav-icon-item"
                >
                  <i className="icon icon-cart" />
                  <span className="count-box">
                    <CartLength />
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
