import React from "react";
import Categories from "./Categories";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import HeaderSearch from "./HeaderSearch";
import UserAccountTrigger from "../common/UserAccountTrigger";

export default function Header9() {
  return (
    <header
      id="header"
      className="header-default header-search header-uppercase header-style-2"
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
              <Link to={`/home-electric-accessories`} className="logo-header">
                <img
                  alt="logo"
                  className="logo"
                  src="/images/logo/logo.svg"
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
                  <Link to={`/wish-list`} className="nav-icon-item">
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
      <div className="header-bottom d-none line-bt d-xl-block">
        <div className="container">
          <div className="wrapper-header-bottom">
            <div className="inner-left">
              <div className="tf-mega-categories">
                <a href="#" className="categories-title">
                  <i className="icon icon-categories" />
                  browse categories
                </a>
                <Categories />
              </div>
              <nav className="box-navigation text-center">
                <ul className="box-nav-menu">
                  <Nav />
                </ul>
              </nav>
            </div>
            <div className="inner-right">
              <Link to={`/contato`} className="link fw-medium text-md">
                Precisa de ajuda?
              </Link>
              <a href="tel:123456789" className="call-us text-md fw-medium">
                Ligue agora <i className="icon icon-arrow1-top-left" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
