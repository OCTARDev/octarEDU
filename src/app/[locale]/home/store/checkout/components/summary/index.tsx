"use client";
import { useGetCartSubtotalQuery } from "@/redux/rtk/cart";
import styles from "./style.module.scss";
import { useGetIpQuery } from "@/redux/rtk/ip";
import { useLayoutEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

const OrderSummary = ({ data, gouv }: any) => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const t = useTranslations("store");
  const { data: ip, isLoading: iploading } = useGetIpQuery("");
  const params = {
    user_ip: ip?.ip,
  };
  const paramss = useSearchParams();

  const message = paramss.get("message");
  //console.log("message", message);
  //console.log("data", data?.data);
  const click = () => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/home/store/checkout");
    }
  };
  useLayoutEffect(() => {
    if (message) {
      if (message == "Transaction Success") {
        Swal.fire({
          title: "Thanks for your payment",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            click();
          }
        });
      }
      if (
        message == "Transaction Canceled" ||
        message == "Please Try Again Later..."
      ) {
        Swal.fire({
          title: `${message}`,
          icon: "error",
          // showDenyButton: true,
          // showCancelButton: true,
          confirmButtonText: "Ok",
          // denyButtonText: `Don't save`,
        }).then((result) => {
          // /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            // Swal.fire("Saved!", "", "success");
            click();
          }
          // } else if (result.isDenied) {
          //   Swal.fire("Changes are not saved", "", "info");
          // }
        });
      }
    }
  }, [message]);
  return (
    <div className={`${styles.orderSummary} ${isArabic && "arabic"}`}>
      <h2 style={{ textAlign: isArabic ? "right" : "left" }}>
        {t("summary")}{" "}
      </h2>
      <div className={styles.subtotal}>
        <span>{t("subTotal")}:</span>
        <span>
          {data?.data?.subtotal} {data?.data?.currency}
        </span>
      </div>
      <p>{t("delivery")} </p>
      <button
        // disabled={data?.data?.subtotal > 0 ? false : true}
        className={styles.checkoutButton}
        type="submit"
      >
        {t("payment")}
      </button>
    </div>
  );
};

export default OrderSummary;
