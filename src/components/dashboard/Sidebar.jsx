"use client";

import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useContextElement } from "@/context/Context";

const accountLinks = [
  { href: "/account-page", label: "Visão geral" },
  { href: "/account-orders", label: "Meus pedidos" },
  { href: "/lista-de-desejos", label: "Lista de desejos" },
  { href: "/account-addresses", label: "Endereços" },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useContextElement();

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    navigate("/");
  };

  return (
    <>
      {accountLinks.map(({ href, label }) => (
        <li key={href}>
          <Link
            to={href}
            className={`text-sm link fw-medium my-account-nav-item ${
              pathname === href ? "active" : ""
            }`}
          >
            {label}
          </Link>
        </li>
      ))}
      <li>
        <a
          href="/"
          className="text-sm link fw-medium my-account-nav-item"
          onClick={handleLogout}
        >
          Sair
        </a>
      </li>
    </>
  );
}
