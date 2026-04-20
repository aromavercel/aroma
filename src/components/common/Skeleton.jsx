import React from "react";

export default function Skeleton({
  className = "",
  style,
  rounded = true,
  variant = "block",
}) {
  const classes = [
    "skeleton",
    `skeleton--${variant}`,
    rounded ? "skeleton--rounded" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return <div className={classes} style={style} aria-hidden="true" />;
}

