"use client";

import React from "react";
import { WHATSAPP_CHAT_URL, INSTAGRAM_PROFILE_URL } from "@/data/socialLinks";

/**
 * Ícones de redes da marca: apenas WhatsApp e Instagram.
 * `className` segue os estilos do tema (ex.: `tf-social-icon style-large`).
 */
export default function AromaSocialIcons({
  className = "tf-social-icon style-large",
}) {
  return (
    <ul className={className}>
      <li>
        <a
          href={WHATSAPP_CHAT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-item social-whatsapp"
          aria-label="WhatsApp"
        >
          <i className="icon icon-whatsapp" />
        </a>
      </li>
      <li>
        <a
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-item social-instagram"
          aria-label="Instagram"
        >
          <i className="icon icon-instagram" />
        </a>
      </li>
    </ul>
  );
}
