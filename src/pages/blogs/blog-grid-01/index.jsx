import Blogs3 from "@/components/blogs/Blogs3";

import Sidebar2 from "@/components/blogs/Sidebar2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import { Link } from "react-router-dom";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";
const metadata = {
  title: "Blog Grid 01 || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function BlogGridPage1() {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Topbar />
      <Header1 />
      <Breadcumb pageName="Blogs" pageTitle="Blogs" />

      <div className="btn-sidebar-mb d-lg-none right">
        <button data-bs-toggle="offcanvas" data-bs-target="#mbAccount">
          <i className="icon icon-sidebar" />
        </button>
      </div>
      <section className="s-blog-grid sec-blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <Blogs3 />
            </div>
            <div className="col-lg-4">
              <Sidebar2 prentClass="sidebar-blog d-lg-grid d-none sidebar-content-wrap" />
            </div>
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
