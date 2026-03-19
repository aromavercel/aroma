import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import Wishlist from "@/components/otherPages/Wishlist";
import { Link } from "react-router-dom";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
const metadata = {
  title: "Wish list || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function WishlistPage() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <>
        {/* Breadcrumb */}
        <div className="tf-breadcrumb">
          <div className="container">
            <ul className="breadcrumb-list">
              <li className="item-breadcrumb">
                <Link to={`/`} className="text">
                  Início
                </Link>
              </li>
              <li className="item-breadcrumb dot">
                <span />
              </li>
              <li className="item-breadcrumb">
                <span className="text">Minha Conta</span>
              </li>
            </ul>
          </div>
        </div>
        {/* /Breadcrumb */}
        {/* Title Page */}
        <section className="s-title-page flat-spacing-2 pt-0">
          <div className="container">
            <h4 className="s-title letter-0 text-center">Favoritos</h4>
          </div>
        </section>
        {/* /Title Page */}
      </>

      <Wishlist />
      <Footer1 />
    </>
  );
}
