import Blogs2 from "@/components/blogs/Blogs2";
import { Link } from "react-router-dom";
import Sidebar2 from "@/components/blogs/Sidebar2";
import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Topbar from "@/components/headers/Topbar";
import React from "react";

import MetaComponent from "@/components/common/MetaComponent";
import Breadcumb from "@/components/common/Breadcumb";
const metadata = {
  title: "Blog List 02 || Vineta - Multipurpose Reactjs eCommerce Template",
  description: "Vineta - Multipurpose Reactjs eCommerce Template",
};
export default function BlogListPage2() {
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
      <section className="s-blog-list-v2 sec-blog">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <Sidebar2 />
            </div>
            <div className="col-lg-8">
              <Blogs2 />
            </div>
          </div>
        </div>
      </section>
      <Footer1 />
    </>
  );
}
