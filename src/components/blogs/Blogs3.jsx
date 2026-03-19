import React from "react";
import { Link } from "react-router-dom";

import { blogPostsLarge } from "@/data/blogs";
export default function Blogs3() {
  return (
    <div className="s-blog-list-grid grid-2">
      {blogPostsLarge.map((post) => (
        <div className="blog-item hover-img" key={post.id}>
          <div className="entry_image">
            <Link to={`/blog-single/${post.id}`} className="img-style">
              <img
                src={post.imageUrl}
                alt=""
                className="lazyload"
                width={post.width}
                height={post.height}
              />
            </Link>
          </div>
          <div className="blog-content">
            <div className="entry-tag">
              <ul className="style-list">
                <li>
                  <a href="#" className={post.categoryClass}>
                    {post.category}
                  </a>
                </li>
              </ul>
            </div>
            <Link
              to={`/blog-single/${post.id}`}
              className="entry_title d-block text-xl fw-medium link"
            >
              {post.title}
            </Link>
            <p className="entry_sub text-md text-main">{post.excerpt}</p>
            <ul className="entry-meta">
              <li className="entry_author">
                <div className="avatar">
                  <img
                    src={post.authorAvatar}
                    alt="avatar"
                    className="lazyload"
                    width={100}
                    height={100}
                  />
                </div>
                <p className="entry_name">
                  Post by <span className="fw-medium">{post.authorName}</span>
                </p>
              </li>
              <li className="br-line" />
              <li className="entry_date">
                <p className="text-md">{post.date}</p>
              </li>
              <li className="br-line" />
              <li className="entry_comment">
                <p className="text-md">{post.comments}</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
      <ul className="wg-pagination">
        <li className="active">
          <div className="pagination-item">1</div>
        </li>
        <li>
          <a href="#" className="pagination-item">
            2
          </a>
        </li>
        <li>
          <a href="#" className="pagination-item">
            3
          </a>
        </li>
        <li>
          <a href="#" className="pagination-item">
            <i className="icon-arr-right2" />
          </a>
        </li>
      </ul>
    </div>
  );
}
