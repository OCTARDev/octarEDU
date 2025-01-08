"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Header from "./components/header";
import ProductDisplay from "./components/productDisplay";
import Subtotal from "../components/subTotal";

const Product = () => {
  const pathname = usePathname();
  return (
    <div>
      <Header />
      <ProductDisplay />
    </div>
  );
};

export default Product;
