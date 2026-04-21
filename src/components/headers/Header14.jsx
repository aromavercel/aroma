import React from "react";
import Nav from "./Nav";

import { Link } from "react-router-dom";
import HeaderSearch2 from "./HeaderSearch2";
import WishlistLength from "../common/WishlistLength";
import CartTotal from "../common/CartTotal";
import UserAccountTrigger from "../common/UserAccountTrigger";

export default function Header14() {
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
            <div className="col-xl-2 col-md-4 col-6">
              <Link to={`/home-pickleball`} className="logo-header">
                <img
                  alt="logo"
                  className="logo logo-dark"
                  width={128}
                  height={33}
                  src="/images/logo/logo.svg"
                />
                <img
                  alt="logo"
                  className="logo logo-white"
                  width={157}
                  height={44}
                  src="/images/logo/logo-white.svg"
                />
              </Link>
            </div>
            <div className="col-xl-7 d-none d-xl-block text-center">
              <div className="tf-form-search style-2">
                <div className="tf-select">
                  <select name="pagetype" id="pagetype">
                    <option>All Categories</option>
                    <option value="fashion">Fashion</option>
                    <option value="furniture">Furniture</option>
                    <option value="electronics">Electronics</option>
                    <option value="accessories">Accessories</option>
                    <option value="food">Food &amp; Drink</option>
                    <option value="georgia">Other</option>
                  </select>
                </div>
                <HeaderSearch2 />
              </div>
            </div>
            <div className="col-xl-3 col-md-4 col-3">
              <ul className="nav-icon d-flex justify-content-end align-items-center">
                <li className="nav-search d-xl-none d-flex">
                  <Link to="/buscar" className="nav-icon-item">
                    <i className="icon icon-search" />
                  </Link>
                </li>
                <li className="nav-wishlist style-2">
                  <Link to={`/wish-list`} className="nav-icon-item">
                    <i className="icon icon-heart" />
                    <span className="text d-none d-xl-block">
                      <span className="d-flex text-main text-xs fw-normal">
                        Wishlist
                      </span>
                      <span className="count-box">
                        {" "}
                        <WishlistLength />
                      </span>
                    </span>
                  </Link>
                </li>
                <UserAccountTrigger />
                <li className="nav-cart">
                  <a
                    href="#shoppingCart"
                    data-bs-toggle="offcanvas"
                    className="nav-icon-item"
                  >
                    <i className="icon icon-cart" />
                    <span className="text d-none d-xl-block">
                      <span className="d-block text-main text-xs fw-normal">
                        Cart
                      </span>
                      <span className="cart-price text-sm">
                        $<CartTotal />
                      </span>
                    </span>
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
