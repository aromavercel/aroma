import React from "react";
import { useContextElement } from "@/context/Context";

const iconSize = 24;

export default function UserAccountTrigger() {
  const { user } = useContextElement();
  const target = user ? "userMenu" : "login";
  return (
    <li className="nav-account">
      <a
        href={`#${target}`}
        data-bs-toggle="offcanvas"
        aria-controls={target}
        className="nav-icon-item"
      >
        {user?.avatar_url ? (
          <img
            src={user.avatar_url}
            alt=""
            width={iconSize}
            height={iconSize}
            style={{
              width: iconSize,
              height: iconSize,
              borderRadius: "50%",
              objectFit: "cover",
              display: "block",
            }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextElementSibling?.classList.remove("d-none");
            }}
          />
        ) : null}
        <i className={`icon icon-user ${user?.avatar_url ? "d-none" : ""}`} />
      </a>
    </li>
  );
}
