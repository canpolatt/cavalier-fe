import React from "react";
import { useSelector } from "react-redux";

export default function Order() {
  const products = useSelector((state) => state.cart.products);
  console.log(products);
  return <div>Order</div>;
}
