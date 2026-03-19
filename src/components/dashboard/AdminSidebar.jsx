"use client";

import { Link, useLocation } from "react-router-dom";

export const adminLinks = [
  { href: "/painel/catalogo", label: "Catálogo" },
  { href: "/painel/usuarios", label: "Usuários cadastrados" },
  { href: "/painel/pedidos", label: "Pedidos" },
  // { href: "/painel/acesso", label: "Dados de acesso ao site" },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();
  return (
    <>
      {adminLinks.map(({ href, label }) => (
        <li key={href}>
          <Link
            to={href}
            className={`text-sm link fw-medium my-account-nav-item ${
              pathname === href ||
              (href === "/painel/catalogo" &&
                pathname.startsWith("/painel/catalogo")) ||
              (href === "/painel/usuarios" &&
                pathname.startsWith("/painel/usuarios")) ||
              (href === "/painel/pedidos" &&
                pathname.startsWith("/painel/pedidos"))
                ? "active"
                : ""
            }`}
            aria-label={label}
          >
            {label}
          </Link>
        </li>
      ))}
    </>
  );
}
