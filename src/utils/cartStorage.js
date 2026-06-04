
export function readCartListFromLocalStorage() {
  try {
    const stored = JSON.parse(localStorage.getItem("cartList") || "null");
    return Array.isArray(stored) && stored.length ? stored : [];
  } catch {
    return [];
  }
}
