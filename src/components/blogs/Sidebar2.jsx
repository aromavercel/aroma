import React from "react";
import { Link } from "react-router-dom";
import { largeRecentPosts } from "@/data/blogs";

export default function Sidebar2({
  prentClass = "sidebar-blog d-lg-grid d-none sidebar-content-wrap type-left",
}) {
  return (
    <div className={prentClass}>
      <div className="sb-item">
        <p className="sb-title text-xl fw-medium">Categories</p>
        <div className="sb-content">
          <ul className="category-blog-list">
            <li>
              <Link to={`/blog-single/1`} className="text-md link">
                Accessories
              </Link>
            </li>
            <li>
              <Link to={`/blog-single/1`} className="text-md link">
                Bags
              </Link>
            </li>
            <li>
              <Link to={`/blog-single/1`} className="text-md link">
                Lifestyle
              </Link>
            </li>
            <li>
              <Link to={`/blog-single/1`} className="text-md link">
                Designs
              </Link>
            </li>
            <li>
              <Link to={`/blog-single/1`} className="text-md link">
                Tricks &amp; Tips
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="sb-item">
        <p className="sb-title text-xl fw-medium">Recent Posts</p>
        <div className="sb-content">
          <ul className="recent-blog-list">
            {largeRecentPosts.map((post) => (
              <li className="hover-img" key={post.id}>
                <div className="image">
                  <Link to={`/blog-single`} className="img-style d-block">
                    <img
                      src={post.imageUrl}
                      alt=""
                      className="lazyload"
                      width={post.width}
                      height={post.height}
                    />
                  </Link>
                </div>
                <div className="post-content">
                  <Link to={`/blog-single`} className="link text-md fw-medium">
                    {post.title}
                  </Link>
                  <p className="entry_date">{post.date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sb-item">
        <p className="sb-title text-xl fw-medium">Tags</p>
        <div className="sb-content entry-tag">
          <ul className="tag-blog-list style-list">
            <li>
              <a href="#" className="type-life">
                {" "}
                Lifestyle{" "}
              </a>
            </li>
            <li>
              <a href="#" className="type-design">
                {" "}
                Designs{" "}
              </a>
            </li>
            <li>
              <a href="#" className="type-bag">
                {" "}
                Bags{" "}
              </a>
            </li>
            <li>
              <a href="#" className="type-trick">
                {" "}
                Tricks &amp; Tips{" "}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="sb-item">
        <div className="sb-banner hover-img">
          <div className="image img-style">
            <img
              src="/images/blog/sb-banner.jpg"
              alt="banner"
              className="lazyload"
              width={732}
              height={1036}
            />
          </div>
          <div className="banner-content">
            <p className="title">
              Elevate <br />
              Your Style
            </p>
            <a href="#" className="tf-btn btn-white hover-primary">
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
