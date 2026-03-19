"use client";
import { Link } from "react-router-dom";
import React from "react";
import NavProducts from "./NavProducts";
import {
  blogMenuItems,
  demoItems,
  otherPages,
  productMenuItems,
  shopPages,
} from "@/data/menu";
import Collections from "./Collections";
import { recentBlogPosts } from "@/data/blogs";
import { useLocation } from "react-router-dom";

export default function Nav3() {
  const { pathname } = useLocation();
  const isMenuActive = (link) => {
    return link.href?.split("/")[1] == pathname.split("/")[1];
  };
  const isMenuParentActive = (menu) => {
    return menu.some((elm) => isMenuActive(elm));
  };
  const isMenuParentActive2 = (menu) => {
    return menu.some((elm) => isMenuParentActive(elm.links));
  };

  return (
    <>
      {" "}
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${
            isMenuParentActive(demoItems) ? "menuActive" : ""
          } `}
        >
          Home
          <i className="icon icon-arr-down" />
        </a>
        <div className="sub-menu mega-menu mega-home">
          <div className="box-search">
            <div className="tf-select">
              <select name="pagetype" id="pagetype">
                <option value="">Page Type</option>
                <option value="fashion">Fashion</option>
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="accessories">Accessories</option>
                <option value="food">Food &amp; Drink</option>
                <option value="georgia">Other</option>
              </select>
            </div>
            <form className="form-search">
              <input
                type="text"
                placeholder="Search demo..."
                tabIndex={0}
                aria-required="true"
                required
              />
              <button type="submit">
                <i className="icon icon-search" />
              </button>
            </form>
          </div>
          <div className="row-demo">
            {demoItems.slice(0, 10).map((item, index) => (
              <div className="demo-item" key={index}>
                <Link to={item.href} className="demo-image">
                  <img
                    className="lazyload"
                    data-src={item.imageSrc}
                    alt={item.alt}
                    src={item.imageSrc}
                    width={item.width}
                    height={item.height}
                  />
                  <div className="demo-label">
                    {item.labels.map((label, labelIndex) => (
                      <span
                        key={labelIndex}
                        className={label === "Hot" ? "demo-hot" : ""}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </Link>
                <Link
                  to={item.href}
                  className={`demo-name link ${
                    isMenuActive(item) ? "menuActive" : ""
                  } `}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
          <div className="view-all-demo text-center">
            <a
              href="#modalDemo"
              data-bs-toggle="modal"
              className="tf-btn btn-primary animate-btn"
            >
              Explore all demos (22+)
              <i className="icon icon-arr-right" />
            </a>
          </div>
        </div>
      </li>
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${
            isMenuParentActive2(shopPages) ? "menuActive" : ""
          }`}
        >
          Shop
          <i className="icon icon-arr-down" />
        </a>
        <div className="sub-menu mega-menu mega-shop">
          <div className="wrapper-sub-menu">
            {shopPages.map((menuItem, index) => (
              <div className="mega-menu-item" key={index}>
                <div className="menu-heading">{menuItem.heading}</div>
                <ul className="menu-list">
                  {menuItem.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href2 ? link.href2 : link.href}
                        className={`menu-link-text link  ${
                          isMenuActive(link) ? "menuActive" : ""
                        } `}
                      >
                        {link.text}
                        {link.label && (
                          <span className="demo-label">{link.label}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Collections />
        </div>
      </li>
      <li className="menu-item">
        <a
          href="#"
          className={`item-link ${
            isMenuParentActive2(productMenuItems) ? "menuActive" : ""
          } `}
        >
          Products
          <i className="icon icon-arr-down" />
          <span className="label hot">Hot</span>
        </a>
        <div className="sub-menu mega-menu mega-product">
          <div className="wrapper-sub-menu">
            {productMenuItems.map((menuItem, index) => (
              <div className="mega-menu-item" key={index}>
                <div className="menu-heading">{menuItem.heading}</div>
                <ul className="menu-list">
                  {menuItem.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className={`menu-link-text link  ${
                          isMenuActive(link) ? "menuActive" : ""
                        } `}
                      >
                        {link.text}
                        {link.label && (
                          <span
                            className={`demo-label ${
                              link.label.className || ""
                            }`}
                          >
                            {link.label.text}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="wrapper-sub-product">
            <NavProducts />
          </div>
        </div>
      </li>
      <li className="menu-item position-relative">
        <a
          href="#"
          className={`item-link  ${
            isMenuParentActive(otherPages) ? "menuActive" : ""
          }  `}
        >
          Pages
          <i className="icon icon-arr-down" />
          <span className="label new">New</span>
        </a>
        <div className="sub-menu sub-menu-style-2">
          <ul className="menu-list">
            {otherPages.slice(0, 8).map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className={`menu-link-text link  ${
                    isMenuActive(item) ? "menuActive" : ""
                  } `}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="menu-list">
            {otherPages.slice(8).map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className={`menu-link-text link  ${
                    isMenuActive(item) ? "menuActive" : ""
                  } `}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="banner hover-img">
            <Link to={`/blog-single/1`} className="img-style">
              <img
                alt="banner"
                src="/images/blog/banner-header.jpg"
                width={413}
                height={392}
              />
            </Link>
            <div className="content">
              <div className="title">Unveiling the latest gear</div>
              <Link to={`/blog-single/1`} className="box-icon animate-btn">
                <i className="icon icon-arrow-top-left" />
              </Link>
            </div>
          </div>
        </div>
      </li>
      <li className="menu-item position-relative">
        <a
          href="#"
          className={`item-link  ${
            isMenuParentActive(blogMenuItems) ? "menuActive" : ""
          }  `}
        >
          Blog
          <i className="icon icon-arr-down" />
        </a>
        <div className="sub-menu sub-menu-style-3">
          <ul className="menu-list">
            {blogMenuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  className={`menu-link-text link  ${
                    isMenuActive(item) ? "menuActive" : ""
                  } `}
                >
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
          <div className="wrapper-sub-blog">
            <div className="menu-heading">Recent Posts</div>
            <ul className="list-recent-blog">
              {recentBlogPosts.map((post, index) => (
                <li className="item" key={index}>
                  <Link to={`/blog-single/${post.id}`} className="img-box">
                    <img
                      alt={post.alt}
                      src={post.imageSrc}
                      width={post.width}
                      height={post.height}
                    />
                  </Link>
                  <div className="content">
                    <Link
                      to={`/blog-single/${post.id}`}
                      className="fw-medium text-sm link title"
                    >
                      {post.title}
                    </Link>
                    <span className="text-xxs text-grey date-post">
                      {post.date}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
      <li className="menu-item">
        <a href="https://themeforest.net/user/themesflat" className="item-link">
          Buy Theme!
        </a>
      </li>
    </>
  );
}
