"use client";

import { useLocation } from "react-router-dom";
import Cartmodal3 from "./Cartmodal3";
import Cartmodal2 from "./Cartmodal2";
import CartModal from "./CartModal";

const CartComponent = () => {
  const { pathname } = useLocation();
  if (pathname === "/cart-drawer-v2") return <Cartmodal3 />;
  if (pathname === "/cart-empty") return <Cartmodal2 />;
  return <CartModal />;
};

export default CartComponent;
