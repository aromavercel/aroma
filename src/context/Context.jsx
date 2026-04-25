import { openCartModal } from "@/utlis/openCartModal";
import { getMe, setStoredToken } from "@/api/auth";
import { getCart, addCartItem, updateCartItem, removeCartItem } from "@/api/cart";
import { getWishlist, addWishlistItem, removeWishlistItem } from "@/api/wishlist";
import { getPerfumeById } from "@/api/perfumes";

const WISHLIST_GUEST_STORAGE_KEY = "wishlistGuestItems";

function normalizeGuestWishlistSnapshot(id, snapshot) {
  const s = snapshot || {};
  const key = String(id);
  return {
    id: key,
    title: s.title ?? "",
    url: s.url,
    description: s.description ?? "",
    catalogSource: s.catalogSource ?? s.catalog_source ?? "normal",
    notes: s.notes && typeof s.notes === "object" ? s.notes : {},
    variants: Array.isArray(s.variants) ? s.variants : [],
    images: Array.isArray(s.images) ? s.images : [],
    priceMin: s.priceMin != null ? Number(s.priceMin) : undefined,
    ativo: s.ativo,
    esgotado: s.esgotado,
  };
}

/** Restaura favoritos do visitante: formato novo (objetos) ou legado (só ids). */
function readGuestWishlistFromStorage() {
  try {
    const rawItems = localStorage.getItem(WISHLIST_GUEST_STORAGE_KEY);
    if (rawItems) {
      const parsed = JSON.parse(rawItems);
      if (Array.isArray(parsed) && parsed.length) {
        const normalized = parsed
          .filter((x) => x && (x.id != null || x.perfume_id != null))
          .map((x) => ({ ...x, id: String(x.id ?? x.perfume_id) }));
        const seen = new Set();
        const deduped = normalized.filter((p) => {
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });
        return { items: deduped, ids: deduped.map((p) => p.id) };
      }
    }
    const legacy = JSON.parse(localStorage.getItem("wishlist") || "null");
    if (Array.isArray(legacy) && legacy.length) {
      const ids = [
        ...new Set(
          legacy
            .map((x) => (typeof x === "string" ? x.trim() : x?.id != null ? String(x.id) : ""))
            .filter(Boolean),
        ),
      ];
      return { items: ids.map((id) => ({ id })), ids };
    }
  } catch {
    // ignora
  }
  return { items: [], ids: [] };
}
// import { openWistlistModal } from "@/utlis/openWishlist";

import React, { useEffect, useRef } from "react";
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
  const pendingOptimisticRemovalsRef = useRef([]);
  const hiddenCartLineIdsRef = useRef(new Set());
  const pendingHideCartLineIdsRef = useRef(new Map()); // id -> attempts
  const wishlistOpVersionRef = useRef(new Map()); // id -> version (last action wins)

  const nextWishlistVersion = (key) => {
    const map = wishlistOpVersionRef.current;
    const v = (map.get(key) ?? 0) + 1;
    map.set(key, v);
    return v;
  };

  const isWishlistVersionCurrent = (key, v) => {
    return (wishlistOpVersionRef.current.get(key) ?? 0) === v;
  };

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const syncWishlistWithRetries = async ({ opKey, opVersion, expectId, expectMissingId }) => {
    // Não sobrescreve o estado otimista com uma lista vazia/stale.
    // Tenta algumas vezes (eventual consistency / cache / resposta fora de ordem).
    const attempts = 3;
    for (let i = 0; i < attempts; i++) {
      if (!isWishlistVersionCurrent(opKey, opVersion)) return null;
      const { items } = await getWishlist();
      const ids = (items || []).map((p) => String(p.id));
      const hasExpected = expectId ? ids.includes(String(expectId)) : true;
      const missingOk = expectMissingId ? !ids.includes(String(expectMissingId)) : true;

      // Se o servidor confirmou o estado esperado, aplica.
      if (hasExpected && missingOk) return { items };

      // Se veio vazio mas não era esperado, aguarda e tenta de novo.
      if ((items || []).length === 0 && (expectId || expectMissingId)) {
        await sleep(450);
        continue;
      }

      // Caso geral: tenta mais uma vez e depois desiste.
      if (i < attempts - 1) {
        await sleep(450);
        continue;
      }
      return null;
    }
    return null;
  };

  const filterHiddenCartLines = (items) => {
    const hidden = hiddenCartLineIdsRef.current;
    if (!hidden || hidden.size === 0) return items;
    return (items || []).filter((p) => !hidden.has(String(p.id)));
  };

  const scheduleCartRefreshIfNeeded = () => {
    if (!user?.id) return;
    const hidden = hiddenCartLineIdsRef.current;
    if (!hidden || hidden.size === 0) return;
    // tenta uma revalidação curta para evitar reintrodução por respostas fora de ordem
    setTimeout(async () => {
      try {
        const { items } = await getCart();
        setCartProducts(filterHiddenCartLines(items));
      } catch {
        // ignora
      }
    }, 700);
  };
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
    if (user?.id) {
      const perfumeId = String(id);
      const variantOption = String(variant?.option0 || variant?.variant_option || snapshot?.variant_option || "");
      const prevSnapshot = cartProducts.map((p) => ({ ...p }));

      // UI otimista: atualiza imediatamente (sem esperar API)
      setCartProducts((pre) => {
        const idx = pre.findIndex(
          (p) =>
            String(p.perfume_id ?? p.id) === perfumeId &&
            String(p.variant_option || "") === variantOption,
        );
        if (idx >= 0) {
          const next = [...pre];
          const row = next[idx];
          next[idx] = { ...row, quantity: Math.max(1, Number(row.quantity) || 1) + quantity };
          return next;
        }
        const optimisticId = `optimistic:${perfumeId}:${variantOption || "base"}`;
        const unitPrice =
          variant?.price_number ?? variant?.price ?? snapshot?.price ?? 0;
        const title = snapshot?.title ?? "";
        const imgSrc = snapshot?.imgSrc ?? "";
        return [
          ...pre,
          {
            id: optimisticId,
            perfume_id: perfumeId,
            variant_option: variantOption || null,
            title,
            imgSrc,
            price: Number(unitPrice) || 0,
            quantity,
          },
        ];
      });
      if (isModal) openCartModal();

      setCartLoading(true);
      try {
        await addCartItem(id, quantity, variant);
        const { items } = await getCart();
        setCartProducts(filterHiddenCartLines(items));

        // Se o usuário removeu um item "optimistic:*" antes da sync, tenta remover o item real agora.
        const pending = pendingOptimisticRemovalsRef.current;
        if (Array.isArray(pending) && pending.length) {
          pendingOptimisticRemovalsRef.current = [];
          (async () => {
            for (const key of pending) {
              const match = items.find(
                (p) => String(p.perfume_id ?? p.id) === String(key.perfumeId) && String(p.variant_option || "") === String(key.variantOption || ""),
              );
              if (!match) continue;
              try {
                await removeCartItem(String(match.id));
              } catch {
                // ignora falha de remoção
              }
            }
            try {
              const refreshed = await getCart();
              setCartProducts(filterHiddenCartLines(refreshed.items));
            } catch {
              // ignora
            }
          })();
        }
      } catch (err) {
        console.error("Erro ao adicionar ao carrinho:", err);
        setCartProducts(prevSnapshot);
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
    const lineId = id != null ? String(id) : "";
    if (!lineId) return;

    if (!user?.id) {
      if (!cartProducts.some((p) => String(p.id) === lineId)) return;
      if (quantity === 0) {
        setCartProducts((pre) => pre.filter((elm) => String(elm.id) !== lineId));
        return;
      }
      setCartProducts((pre) =>
        pre.map((p) => (String(p.id) === lineId ? { ...p, quantity } : p))
      );
      return;
    }

    const prevSnapshot = cartProducts.map((p) => ({ ...p }));
    setCartProducts((pre) => {
      if (quantity === 0) return pre.filter((p) => String(p.id) !== lineId);
      return pre.map((p) => (String(p.id) === lineId ? { ...p, quantity } : p));
    });
    try {
      await updateCartItem(lineId, quantity);
      const { items } = await getCart();
      setCartProducts(filterHiddenCartLines(items));
    } catch (err) {
      console.error("Erro ao atualizar quantidade:", err);
      setCartProducts(prevSnapshot);
    }
  };

  const removeFromCart = async (id) => {
    if (user?.id) {
      const lineId = id != null ? String(id) : "";
      if (!lineId) return;
      const prevSnapshot = cartProducts.map((p) => ({ ...p }));
      // UI otimista
      hiddenCartLineIdsRef.current.add(lineId);
      pendingHideCartLineIdsRef.current.set(lineId, (pendingHideCartLineIdsRef.current.get(lineId) || 0) + 1);
      setCartProducts((pre) => pre.filter((p) => String(p.id) !== lineId));
      setCartLoading(true);
      try {
        // Se ainda é um item otimista (sem id real), agenda remoção após a próxima sync.
        if (lineId.startsWith("optimistic:")) {
          const parts = lineId.split(":");
          const perfumeId = parts[1] || "";
          const variantOption = (parts.slice(2).join(":") || "").replace(/^(base)$/, "");
          pendingOptimisticRemovalsRef.current = [
            ...(pendingOptimisticRemovalsRef.current || []),
            { perfumeId, variantOption: variantOption === "base" ? "" : variantOption },
          ];
          return;
        }
        await removeCartItem(lineId);
        const { items } = await getCart();
        setCartProducts(filterHiddenCartLines(items));
        // Só libera o "hide" quando o servidor realmente não retorna mais este id.
        const stillThere = (items || []).some((p) => String(p.id) === lineId);
        if (!stillThere) {
          hiddenCartLineIdsRef.current.delete(lineId);
          pendingHideCartLineIdsRef.current.delete(lineId);
        } else {
          // mantém oculto e revalida mais uma vez (eventual consistency / respostas fora de ordem)
          scheduleCartRefreshIfNeeded();
        }
      } catch (err) {
        console.error("Erro ao remover do carrinho:", err);
        setCartProducts(prevSnapshot);
        hiddenCartLineIdsRef.current.delete(lineId);
        pendingHideCartLineIdsRef.current.delete(lineId);
      } finally {
        setCartLoading(false);
      }
      return;
    }
    setCartProducts((pre) => pre.filter((elm) => String(elm.id) !== String(id)));
  };

  const addToWishlist = async (id, snapshot = null) => {
    const key = String(id);
    if (user?.id) {
      const prevIds = wishList;
      const prevItems = wishListItems;
      const opVersion = nextWishlistVersion(key);
      // UX: atualiza imediatamente (otimista) e depois sincroniza com API
      setWishList((pre) => (pre.includes(key) ? pre : [...pre, key]));
      setWishListItems((pre) => {
        if (pre.some((p) => String(p.id) === key)) return pre;
        const entry =
          snapshot && typeof snapshot === "object"
            ? normalizeGuestWishlistSnapshot(key, snapshot)
            : { id: key };
        return [...pre, entry];
      });
      setWishListLoading(true);
      try {
        await addWishlistItem(key);
        const synced = await syncWishlistWithRetries({
          opKey: key,
          opVersion,
          expectId: key,
        });
        if (synced && isWishlistVersionCurrent(key, opVersion)) {
          setWishListItems(synced.items || []);
          setWishList((synced.items || []).map((p) => String(p.id)));
        }
      } catch (err) {
        console.error("Erro ao adicionar aos favoritos:", err);
        if (isWishlistVersionCurrent(key, opVersion)) {
          setWishList(prevIds);
          setWishListItems(prevItems);
        }
      } finally {
        if (isWishlistVersionCurrent(key, opVersion)) setWishListLoading(false);
      }
      return;
    }
    setWishList((pre) => (pre.includes(key) ? pre : [...pre, key]));
    setWishListItems((pre) => {
      if (pre.some((p) => String(p.id) === key)) return pre;
      const entry =
        snapshot && typeof snapshot === "object"
          ? normalizeGuestWishlistSnapshot(key, snapshot)
          : { id: key };
      return [...pre, entry];
    });
  };

  const removeFromWishlist = async (id) => {
    const key = String(id);
    if (user?.id) {
      const prevIds = wishList;
      const prevItems = wishListItems;
      const opVersion = nextWishlistVersion(key);
      // UX: remove imediatamente (otimista) e depois sincroniza com API
      setWishList((pre) => pre.filter((x) => String(x) !== key));
      setWishListItems((pre) => pre.filter((p) => String(p.id) !== key));
      setWishListLoading(true);
      try {
        await removeWishlistItem(key);
        const synced = await syncWishlistWithRetries({
          opKey: key,
          opVersion,
          expectMissingId: key,
        });
        if (synced && isWishlistVersionCurrent(key, opVersion)) {
          setWishListItems(synced.items || []);
          setWishList((synced.items || []).map((p) => String(p.id)));
        }
      } catch (err) {
        console.error("Erro ao remover dos favoritos:", err);
        if (isWishlistVersionCurrent(key, opVersion)) {
          setWishList(prevIds);
          setWishListItems(prevItems);
        }
      } finally {
        if (isWishlistVersionCurrent(key, opVersion)) setWishListLoading(false);
      }
      return;
    }
    setWishList((pre) => pre.filter((x) => String(x) !== key));
    setWishListItems((pre) => pre.filter((p) => String(p.id) !== key));
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
      setCartLoading(true);
      getCart()
        .then(async (r) => {
          if (r.items?.length) {
            setCartProducts(filterHiddenCartLines(r.items));
            return;
          }
          let guest = [];
          try {
            guest = JSON.parse(localStorage.getItem("cartList") || "null");
          } catch {
            guest = [];
          }
          if (!Array.isArray(guest) || guest.length === 0) {
            setCartProducts([]);
            return;
          }
          for (const row of guest) {
            const pid = row.perfume_id ?? row.id;
            if (!pid) continue;
            try {
              await addCartItem(String(pid), Math.max(1, Number(row.quantity) || 1), {
                variant_option: row.variant_option ?? "",
                price_number: row.price,
                price: row.price,
              });
            } catch {
              // item indisponível ou erro de rede
            }
          }
          try {
            const next = await getCart();
            const merged = next.items || [];
            if (merged.length > 0) {
              setCartProducts(filterHiddenCartLines(merged));
            } else if (guest.length > 0) {
              setCartProducts(guest);
            } else {
              setCartProducts([]);
            }
          } catch {
            setCartProducts(guest.length ? guest : []);
          }
        })
        .catch(() => {
          try {
            const stored = JSON.parse(localStorage.getItem("cartList") || "null");
            if (Array.isArray(stored) && stored.length) setCartProducts(stored);
            else setCartProducts([]);
          } catch {
            setCartProducts([]);
          }
        })
        .finally(() => setCartLoading(false));
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
      const { items, ids } = readGuestWishlistFromStorage();
      if (items.length) {
        setWishListItems(items);
        setWishList(ids);
      } else {
        setWishListItems([]);
        setWishList([]);
      }
    }
  }, [user?.id]);

  useEffect(() => {
    // Visitante: sempre persiste. Logado: não gravar [] no LS (evita apagar o carrinho do visitante
    // antes do merge com o servidor ou se a API falhar).
    try {
      if (user?.id) {
        if (Array.isArray(cartProducts) && cartProducts.length > 0) {
          localStorage.setItem("cartList", JSON.stringify(cartProducts));
        }
        return;
      }
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
    if (user?.id) return;
    try {
      localStorage.setItem(WISHLIST_GUEST_STORAGE_KEY, JSON.stringify(wishListItems || []));
      localStorage.setItem("wishlist", JSON.stringify((wishList || []).map((x) => String(x))));
    } catch {
      // ignora
    }
  }, [user?.id, wishListItems, wishList]);

  useEffect(() => {
    if (user?.id) return;
    const items = wishListItems || [];
    const need = items.filter((p) => p?.id && !String(p.title || "").trim());
    if (!need.length) return;
    let cancelled = false;
    (async () => {
      const updates = await Promise.all(
        need.map(async (p) => {
          try {
            return await getPerfumeById(p.id);
          } catch {
            return {
              id: p.id,
              title: "Perfume indisponível",
              description: "",
              catalogSource: "normal",
              notes: {},
              variants: [],
              images: [],
            };
          }
        }),
      );
      if (cancelled) return;
      setWishListItems((prev) => {
        const byId = new Map((prev || []).map((x) => [String(x.id), { ...x }]));
        for (const data of updates) {
          if (data?.id) {
            const sid = String(data.id);
            const existing = byId.get(sid) || {};
            byId.set(sid, { ...existing, ...data });
          }
        }
        const order = (prev || []).map((x) => String(x.id));
        return order.map((id) => byId.get(id)).filter(Boolean);
      });
    })();
    return () => {
      cancelled = true;
    };
  }, [user?.id, wishListItems]);

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
