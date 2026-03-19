import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";
import WishlistLength from "../common/WishlistLength";
import CartLength from "../common/CartLength";
import UserAccountTrigger from "../common/UserAccountTrigger";

export default function Header7() {
  return (
    <header
      id="header"
      className="header-default header-absolute header-uppercase"
    >
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
          <div className="col-xxl-5 col-xl-6 d-none d-xl-block">
            <nav className="box-navigation text-center style-space">
              <ul className="box-nav-menu justify-content-start">
                <Nav />
              </ul>
            </nav>
          </div>
          <div className="col-xl-2 col-md-4 col-6 text-xxl-center">
            <Link to={`/home-pet-accessories`} className="logo-header">
              <img
                alt="logo"
                className="logo"
                src="/images/logo/logo.svg"
                width={148}
                height={44}
              />
            </Link>
          </div>
          <div className="col-xxl-5 col-xl-4 col-md-4 col-3">
            <ul className="nav-icon d-flex justify-content-end align-items-center">
              <li className="nav-search">
                <a
                  href="#search"
                  data-bs-toggle="modal"
                  className="nav-icon-item"
                >
                  <i className="icon icon-search" />
                </a>
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
                  data-bs-toggle="offcanvas"
                  className="nav-icon-item"
                >
                  <i className="icon icon-cart" />
                  <span className="count-box">
                    {" "}
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
