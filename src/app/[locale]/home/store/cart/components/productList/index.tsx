"use client";
import ProductItem from "../productItems";
import styles from "./style.module.scss";
import item from "../../../../../../../assets/store/cart/item.png";
import { useAddToCartMutation } from "@/redux/rtk/cart";
import { useGetIpQuery } from "@/redux/rtk/ip";
import Loader from "@/components/loader";
import { usePathname } from "next/navigation";
const ProductList = ({ data, isLoading }: any) => {
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const { data: ip, isLoading: ipLoading } = useGetIpQuery("");

  const products = [
    {
      name: "Printed categories book",
      price: 250,
      quantity: 3,
      image: item,
    },
    {
      name: "Printed categories book",
      price: 250,
      quantity: 3,
      image: item,
    },
    {
      name: "Printed categories book",
      price: 250,
      quantity: 3,
      image: item,
    },
  ];

  //console.log("dataProducts", data?.data?.cart);
  //console.log("ipipipipipipip", ip?.ip);
  // if (ipLoading) {
  //   return <Loader />;
  // }
  return (
    <div className={styles.productList}>
      {data?.data?.cart.map((product: any, index: any) => (
        <ProductItem key={index} data={product} ip={ip} />
      ))}
    </div>
  );
};

export default ProductList;
