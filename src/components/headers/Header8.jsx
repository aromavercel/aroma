import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";
import UserAccountTrigger from "../common/UserAccountTrigger";

export default function Header8() {
  return (
    <header
      id="header"
      className="header-default header-search header-absolute-2 header-uppercase"
    >
      <div className="header-top">
        <div className="container">
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
            <div className="col-xl-3 col-md-4 col-6">
              <Link to={`/home-sportwear`} className="logo-header">
                <img
                  alt="logo"
                  className="logo logo-dark"
                  src="/images/logo/logo.svg"
                  width={148}
                  height={44}
                />
                <img
                  alt="logo"
                  className="logo logo-white"
                  src="/images/logo/logo-white.svg"
                  width={148}
                  height={44}
                />
              </Link>
            </div>
            <div className="col-xl-5 d-none d-xl-block text-center">
              <HeaderSearch />
            </div>
            <div className="col-xl-4 col-md-4 col-3">
              <ul className="nav-icon d-flex justify-content-end align-items-center">
                <UserAccountTrigger />
                <li className="nav-wishlist">
                  <Link to="/lista-de-desejos" className="nav-icon-item">
                    <i className="icon icon-heart" />
                    <span className="text d-none d-xl-block">Wishlist</span>
                  </Link>
                </li>
                <li className="nav-cart">
                  <a
                    href="#shoppingCart"
                    data-bs-toggle="offcanvas"
                    className="nav-icon-item"
                  >
                    <i className="icon icon-cart" />
                    <span className="text d-none d-xl-block">Cart</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-bottom d-none d-xl-block">
        <div className="container">
          <nav className="box-navigation text-center">
            <ul className="box-nav-menu">
              <Nav />
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
