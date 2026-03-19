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
import { useContextElement } from "@/context/Context";

export default function Nav() {
  const { pathname } = useLocation();
  const { user } = useContextElement();
  const isAdmin = user?.role === "admin";
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
      <li className="menu-item">
        <a
          href="/"
          className={`item-link ${
            isMenuParentActive(demoItems) ? "menuActive" : ""
          } `}
        >
          Inicio
        </a>
      </li>

      {/**<li className="menu-item">
        <a
          href="#"
          className={`item-link ${
            isMenuParentActive2(shopPages) ? "menuActive" : ""
          }`}
        >
          Categorias
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
                        </li>**/}
      <li className="menu-item">
        <Link
          to="/catalogo"
          className={`item-link ${pathname === "/catalogo" ? "menuActive" : ""}`}
        >
          Catálogo
        </Link>
      </li>
      <li className="menu-item">
        <Link
          to="/about-us"
          className={`item-link ${pathname === "/about-us" ? "menuActive" : ""}`}
        >
          Sobre Nós
        </Link>
      </li>
      <li className="menu-item">
        <Link
          to="/contact-us"
          className={`item-link ${pathname === "/contact-us" ? "menuActive" : ""}`}
        >
          Contato
        </Link>
      </li>
      {isAdmin && (
        <li className="menu-item">
          <Link
            to="/painel"
            className={`item-link ${pathname.startsWith("/painel") ? "menuActive" : ""}`}
          >
            Painel de Controle
          </Link>
        </li>
      )}
    </>
  );
}
