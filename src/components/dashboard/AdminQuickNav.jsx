"use client";

import { Link, useLocation } from "react-router-dom";
import { adminLinks } from "@/components/dashboard/AdminSidebar";

export default function AdminQuickNav() {
  const { pathname } = useLocation();

  return (
    <div className="d-lg-none mb-4 admin-quick-nav">
      <div className="sidebar-account-wrap sidebar-account-wrap-mobile">
        <ul className="my-account-nav mb-0">
          {adminLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                to={href}
                className={`text-sm link fw-medium my-account-nav-item ${
                  pathname === href || pathname.startsWith(`${href}/`)
                    ? "active"
                    : ""
                }`}
                aria-label={label}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

