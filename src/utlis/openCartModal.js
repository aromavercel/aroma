export const openCartModal = async () => {
  if (typeof document === "undefined") return;
  const el = document.getElementById("shoppingCart");
  if (!el) return;

  try {
    const bootstrap = await import("bootstrap");
    const isOffcanvas = el.classList.contains("offcanvas");
    if (isOffcanvas) {
      const instance =
        bootstrap.Offcanvas.getInstance(el) ||
        new bootstrap.Offcanvas(el, { backdrop: true, scroll: false });
      instance.show();
      return;
    }
    const instance =
      bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el, { keyboard: true });
    instance.show();
  } catch (err) {
    // não bloqueia a UX se o bootstrap não estiver disponível
    console.error("openCartModal:", err);
  }
};
