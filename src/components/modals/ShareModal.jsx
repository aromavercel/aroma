import React, { useCallback, useEffect, useState } from "react";
import { INSTAGRAM_PROFILE_URL } from "@/data/socialLinks";

function pageTitleForShare() {
  if (typeof document === "undefined") return "";
  const raw = document.title || "";
  const main = raw.split("|")[0].trim();
  return main || raw.trim();
}

function buildShareMessage(title, url) {
  const site = "Aroma Expresso";
  const head = title ? `${title} — ${site}` : `Confira na ${site}`;
  return `${head}\n${url}`;
}

async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(ta);
  }
}

export default function ShareModal() {
  const [shareUrl, setShareUrl] = useState("");
  const [shareTitle, setShareTitle] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copiar");

  const refreshFromPage = useCallback(() => {
    if (typeof window === "undefined") return;
    setShareUrl(window.location.href);
    setShareTitle(pageTitleForShare());
  }, []);

  useEffect(() => {
    refreshFromPage();
  }, [refreshFromPage]);

  useEffect(() => {
    const el = document.getElementById("shareSocial");
    if (!el) return;
    const onShow = () => {
      refreshFromPage();
      setCopyLabel("Copiar");
    };
    el.addEventListener("show.bs.modal", onShow);
    return () => el.removeEventListener("show.bs.modal", onShow);
  }, [refreshFromPage]);

  const url = shareUrl || (typeof window !== "undefined" ? window.location.href : "");
  const message = buildShareMessage(shareTitle, url);
  const whatsappHref = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

  const handleCopy = async () => {
    try {
      await copyToClipboard(url);
      setCopyLabel("Copiado!");
      setTimeout(() => setCopyLabel("Copiar"), 2200);
    } catch {
      setCopyLabel("Erro");
      setTimeout(() => setCopyLabel("Copiar"), 2200);
    }
  };

  const handleInstagramClick = async (e) => {
    e.preventDefault();
    const text = buildShareMessage(shareTitle, url);
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share({
          title: shareTitle || "Aroma Expresso",
          text,
          url,
        });
        return;
      } catch (err) {
        if (err?.name === "AbortError") return;
      }
    }
    try {
      await copyToClipboard(text);
      setCopyLabel("Copiado!");
      setTimeout(() => setCopyLabel("Copiar"), 2200);
    } catch {
      window.open(INSTAGRAM_PROFILE_URL, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="modal modalCentered fade modal-share-social popup-style-2"
      id="shareSocial"
      tabIndex={-1}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <span className="title text-xl-2 fw-medium">Compartilhar</span>
            <span className="icon-close icon-close-popup" data-bs-dismiss="modal" role="button" aria-label="Fechar" />
          </div>
          <div className="wrap-code style-1">
            <div className="coppyText" id="shareSocial-url-display">
              {url}
            </div>
            <button
              type="button"
              className="btn-coppy-text tf-btn animate-btn d-inline-flex w-max-content"
              id="shareSocial-copy-btn"
              onClick={handleCopy}
            >
              {copyLabel}
            </button>
          </div>
          <ul className="topbar-left tf-social-icon style-1">
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="social-item social-whatsapp"
                aria-label="Compartilhar no WhatsApp"
              >
                <i className="icon icon-whatsapp" />
              </a>
            </li>
            <li>
              <a
                href={INSTAGRAM_PROFILE_URL}
                onClick={handleInstagramClick}
                className="social-item social-instagram"
                aria-label="Compartilhar (Instagram ou copiar texto)"
              >
                <i className="icon icon-instagram" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
