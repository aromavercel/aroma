import React from "react";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <ul className="mega-categories">
      <li>
        <Link to={`/shop-sub-collection`} className="cate-item">
          <div className="img">
            <img
              alt="img"
              src="/images/cls-categories/electronic/smartphone.png"
              width={440}
              height={440}
            />
          </div>
          <span className="name-cate">Smartphones</span>
        </Link>
      </li>
      <li>
        <Link to={`/shop-sub-collection`} className="cate-item">
          <div className="img">
            <img
              alt="img"
              src="/images/cls-categories/electronic/earphone.png"
              width={440}
              height={440}
            />
          </div>
          <span className="name-cate">Earphones</span>
        </Link>
      </li>
      <li>
        <Link to={`/shop-sub-collection`} className="cate-item">
          <div className="img">
            <img
              alt="img"
              src="/images/cls-categories/electronic/cable.png"
              width={440}
              height={440}
            />
          </div>
          <span className="name-cate">Cables</span>
        </Link>
      </li>
      <li>
        <Link to={`/shop-sub-collection`} className="cate-item">
          <div className="img">
            <img
              alt="img"
              src="/images/cls-categories/electronic/smart-watch.png"
              width={440}
              height={440}
            />
          </div>
          <span className="name-cate">Smart Watches</span>
        </Link>
      </li>
      <li>
        <Link to={`/shop-sub-collection`} className="cate-item">
          <div className="img">
            <img
              alt="img"
              src="/images/cls-categories/electronic/charge.png"
              width={440}
              height={440}
            />
          </div>
          <span className="name-cate">Chargers</span>
        </Link>
      </li>
      <li>
        <Link to={`/shop-sub-collection`} className="cate-item">
          <div className="img">
            <img
              alt="img"
              src="/images/cls-categories/electronic/screen-protector.png"
              width={440}
              height={440}
            />
          </div>
          <span className="name-cate">Screen Protectors</span>
        </Link>
      </li>
      <li>
        <Link to={`/shop-sub-collection`} className="cate-item">
          <div className="img">
            <img
              alt="img"
              src="/images/cls-categories/electronic/headphone.png"
              width={440}
              height={440}
            />
          </div>
          <span className="name-cate">Headphones</span>
        </Link>
      </li>
      <li>
        <Link to={`/shop-sub-collection`} className="cate-item">
          <div className="img">
            <img
              alt="img"
              src="/images/cls-categories/electronic/keyboard.png"
              width={440}
              height={440}
            />
          </div>
          <span className="name-cate">Keyboards</span>
        </Link>
      </li>
    </ul>
  );
}
