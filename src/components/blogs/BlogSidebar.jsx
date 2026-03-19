import React from "react";
import { Link } from "react-router-dom";
import { recentPosts } from "@/data/blogs";

export default function BlogSidebar() {
  return (
    <div className="sidebar-blog d-lg-grid d-none sidebar-content-wrap">
      <div className="sb-item">
        <p className="sb-title text-xl fw-medium">Recent Posts</p>
        <div className="sb-content">
          <ul className="recent-blog-list">
            {recentPosts.map((post) => (
              <li className="hover-img" key={post.id}>
                <div className="image">
                  <Link
                    to={`/blog-single/${post.id}`}
                    className="img-style d-block"
                  >
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
                  <Link
                    to={`/blog-single/${post.id}`}
                    className="link text-md fw-medium"
                  >
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
              <a href="#"> Lifestyle </a>
            </li>
            <li>
              <a href="#"> Designs </a>
            </li>
            <li>
              <a href="#"> Bags </a>
            </li>
            <li>
              <a href="#"> Tricks &amp; Tips </a>
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
