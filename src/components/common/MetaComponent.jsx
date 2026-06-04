
import { useEffect } from "react";

export default function MetaComponent({ meta }) {
  useEffect(() => {
    const raw = (meta?.title && String(meta.title).trim()) || "Aroma Expresso";
    const cleaned = raw
      .replace(/\s*\|\|\s*vineta\b.*$/i, "")
      .replace(/\bvineta\b.*$/i, "")
      .trim();
    document.title = cleaned || "Aroma Expresso";
    return () => {
      document.title = "Aroma Expresso";
    };
  }, [meta?.title]);
  return (

    <></>
  );
}
