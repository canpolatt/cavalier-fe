import React from "react";
import { useSelector } from "react-redux";
import postOrder from "../api/orderApi";

export default function Order() {
  const products = useSelector((state) => state.cart.products);
  const totalPrice = useSelector((state) => state.cart.total);
  console.log(products)
  const handleClick = () => {
    postOrder("/api/orders", {products:products,totalPrice:totalPrice,address:{name:"asdasd"}});
  }

  return <button onClick={handleClick} className="flex-1">Order</button>;
}
