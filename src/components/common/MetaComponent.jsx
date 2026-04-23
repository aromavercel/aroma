// import { Helmet, HelmetProvider } from "react-helmet-async";

import { useEffect } from "react";

export default function MetaComponent({ meta }) {
  useEffect(() => {
    const raw = (meta?.title && String(meta.title).trim()) || "Aroma Expresso";
    // Remove vestígios do template antigo no título da aba.
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
    // <HelmetProvider>
    //   <Helmet>
    //     <title>{meta?.title}</title>
    //     <meta name="description" content={meta?.description} />
    //   </Helmet>
    // </HelmetProvider>

    <></>
  );
}
