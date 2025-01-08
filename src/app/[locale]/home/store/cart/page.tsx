"use client";
import React from "react";
import Header from "./components/header";
import styles from "./style.module.scss";
import ProductList from "./components/productList";
import OrderSummary from "./components/summary";
import { useGetAllCartQuery } from "@/redux/rtk/cart";
import Loader from "@/components/loader";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const { data, isLoading, isFetching, error } = useGetAllCartQuery(lang);
  //console.log("error", error);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <ProductList data={data} isLoading={isFetching} />
        <OrderSummary data={data} isLoading={isFetching} />
      </div>
    </div>
  );
};

export default Page;
