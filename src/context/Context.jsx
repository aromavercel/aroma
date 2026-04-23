import { openCartModal } from "@/utlis/openCartModal";
import { getMe, setStoredToken } from "@/api/auth";
import { getCart, addCartItem, updateCartItem, removeCartItem } from "@/api/cart";
import { getWishlist, addWishlistItem, removeWishlistItem } from "@/api/wishlist";
// import { openWistlistModal } from "@/utlis/openWishlist";

import React, { useEffect } from "react";
import { useContext, useState } from "react";
const dataContext = React.createContext();
export const useContextElement = () => {
  return useContext(dataContext);
};

export default function Context({ children }) {
  const [user, setUser] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);
  const [wishList, setWishList] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);
  const [wishListLoading, setWishListLoading] = useState(false);
  const [compareItem, setCompareItem] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);
  const [quickAddItem, setQuickAddItem] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const subtotal = cartProducts.reduce((accumulator, product) => {
      return accumulator + (Number(product.price) || 0) * (Number(product.quantity) || 0);
    }, 0);
    setTotalPrice(subtotal);
  }, [cartProducts]);

  const isAddedToCartProducts = (perfumeId, variantOption = "") => {
    return cartProducts.some(
      (elm) =>
        String(elm.perfume_id ?? elm.id) === String(perfumeId) &&
        String(elm.variant_option || "") === String(variantOption || ""),
    );
  };

  /** Adiciona perfume ao carrinho. Se logado, persiste no backend; se não, usa snapshot (objeto com id, title, imgSrc, price) em memória/localStorage. */
  const addProductToCart = async (id, qty = 1, isModal = true, snapshot = null, variant = null) => {
    const quantity = Math.max(1, parseInt(qty, 10) || 1);
    if (user) {
      setCartLoading(true);
      try {
        await addCartItem(id, quantity, variant);
        const { items } = await getCart();
        setCartProducts(items);
        if (isModal) openCartModal();
      } catch (err) {
        console.error("Erro ao adicionar ao carrinho:", err);
        throw err;
      } finally {
        setCartLoading(false);
      }
      return;
    }
    if (!snapshot) return;
    if (isAddedToCartProducts(snapshot.perfume_id ?? id, snapshot.variant_option || "")) return;
    const item = {
      id: snapshot.id ?? id,
      perfume_id: snapshot.perfume_id ?? id,
      variant_option: snapshot.variant_option ?? null,
      title: snapshot.title ?? "",
      imgSrc: snapshot.imgSrc ?? "",
      price: Number(snapshot.price) || 0,
      quantity,
    };
    setCartProducts((pre) => [...pre, item]);
    if (isModal) openCartModal();
  };

  const updateQuantity = async (id, qty) => {
    const quantity = Math.max(0, parseInt(qty, 10) || 0);
    if (user) {
      try {
        await updateCartItem(id, quantity);
        const { items } = await getCart();
        setCartProducts(items);
      } catch (err) {
        console.error("Erro ao atualizar quantidade:", err);
      }
      return;
    }
    if (!isAddedToCartProducts(id)) return;
    if (quantity === 0) {
      setCartProducts((pre) => pre.filter((elm) => String(elm.id) !== String(id)));
      return;
    }
    setCartProducts((pre) =>
      pre.map((p) => (String(p.id) === String(id) ? { ...p, quantity } : p))
    );
  };

  const removeFromCart = async (id) => {
    if (user) {
      try {
        await removeCartItem(id);
        const { items } = await getCart();
        setCartProducts(items);
      } catch (err) {
        console.error("Erro ao remover do carrinho:", err);
      }
      return;
    }
    setCartProducts((pre) => pre.filter((elm) => String(elm.id) !== String(id)));
  };

  const addToWishlist = async (id) => {
    const key = String(id);
    if (user?.id) {
      setWishListLoading(true);
      try {
        await addWishlistItem(key);
        const { items } = await getWishlist();
        setWishListItems(items);
        setWishList(items.map((p) => String(p.id)));
      } finally {
        setWishListLoading(false);
      }
      return;
    }
    setWishList((pre) => (pre.includes(key) ? pre : [...pre, key]));
  };

  const removeFromWishlist = async (id) => {
    const key = String(id);
    if (user?.id) {
      setWishListLoading(true);
      try {
        await removeWishlistItem(key);
        const { items } = await getWishlist();
        setWishListItems(items);
        setWishList(items.map((p) => String(p.id)));
      } finally {
        setWishListLoading(false);
      }
      return;
    }
    setWishList((pre) => pre.filter((x) => String(x) !== key));
  };
  const addToCompareItem = (id) => {
    if (!compareItem.includes(id)) {
      setCompareItem((pre) => [...pre, id]);
    }
  };
  const removeFromCompareItem = (id) => {
    if (compareItem.includes(id)) {
      setCompareItem((pre) => [...pre.filter((elm) => elm != id)]);
    }
  };
  const isAddedtoWishlist = (id) => {
    const key = String(id);
    return wishList.some((x) => String(x) === key);
  };
  const isAddedtoCompareItem = (id) => {
    if (compareItem.includes(id)) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (user?.id) {
      // Primeiro restaura do localStorage (UX instantânea),
      // depois sincroniza com o backend (fonte da verdade do usuário logado).
      try {
        const stored = JSON.parse(localStorage.getItem("cartList") || "null");
        if (Array.isArray(stored) && stored.length) setCartProducts(stored);
      } catch {
        // ignora
      }
      getCart()
        .then((r) => setCartProducts(r.items))
        .catch(() => setCartProducts([]));
    } else {
      // Usuário não logado: restaura do localStorage (se houver)
      try {
        const stored = JSON.parse(localStorage.getItem("cartList") || "null");
        if (Array.isArray(stored) && stored.length) setCartProducts(stored);
        else setCartProducts([]);
      } catch {
        setCartProducts([]);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      setWishListLoading(true);
      getWishlist()
        .then((r) => {
          setWishListItems(r.items || []);
          setWishList((r.items || []).map((p) => String(p.id)));
        })
        .catch(() => {
          setWishListItems([]);
          setWishList([]);
        })
        .finally(() => setWishListLoading(false));
    } else {
      setWishListItems([]);
      setWishList([]);
    }
  }, [user?.id]);

  useEffect(() => {
    // Persiste SEMPRE o carrinho localmente (logado e visitante)
    try {
      localStorage.setItem("cartList", JSON.stringify(cartProducts || []));
    } catch {
      // ignora quota/privacidade
    }
  }, [user, cartProducts]);

  useEffect(() => {
    // Restaura no primeiro carregamento (antes do getMe / backend)
    try {
      const stored = JSON.parse(localStorage.getItem("cartList") || "null");
      if (Array.isArray(stored) && stored.length) setCartProducts(stored);
    } catch {
      // ignora
    }
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("wishlist"));
    if (!user && items?.length) {
      setWishList(items.map((x) => String(x)));
    }
  }, [user]);

  useEffect(() => {
    if (!user) localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [user, wishList]);

  useEffect(() => {
    getMe().then(setUser);
  }, []);

  // Processa retorno do OAuth (Google/Facebook): ?token=... ou ?auth_error=...
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const authError = params.get("auth_error");
    if (token) {
      setStoredToken(token);
      getMe()
        .then((u) => setUser(u))
        .catch(() => setUser(null));
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
    if (authError) {
      const url = new URL(window.location.href);
      url.searchParams.delete("auth_error");
      window.history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
  }, []);

  const logout = () => {
    setStoredToken(null);
    setUser(null);
  };

  const contextElement = {
    user,
    setUser,
    logout,
    cartProducts,
    setCartProducts,
    totalPrice,
    cartLoading,
    addProductToCart,
    isAddedToCartProducts,
    updateQuantity,
    removeFromCart,
    removeFromWishlist,
    addToWishlist,
    isAddedtoWishlist,
    wishListItems,
    wishListLoading,
    quickViewItem,
    wishList,
    setQuickViewItem,
    quickAddItem,
    setQuickAddItem,
    addToCompareItem,
    isAddedtoCompareItem,
    removeFromCompareItem,
    compareItem,
    setCompareItem,
  };
  return (
    <dataContext.Provider value={contextElement}>
      {children}
    </dataContext.Provider>
  );
}
