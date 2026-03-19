"use client";

import { useContextElement } from "@/context/Context";

export default function CartTotal() {
  const { totalPrice } = useContextElement();
  return <>{totalPrice.toFixed(2)}</>;
}
