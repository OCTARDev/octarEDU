"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./style.module.scss";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";
import ErrorModal from "@/components/ErrorModal";
import { useState } from "react";
import { useGetProfileQuery } from "@/redux/rtk/profile";

const OrderSummary = ({ data, isLoading }: any) => {
  const router = useRouter();
  const pathname: string = usePathname();
  const {data:userData} = useGetProfileQuery();
  console.log(userData);
  const user = userData?.data;
  const [showModal ,setShowModal] = useState(false);
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const t = useTranslations("store");
  //console.log("DAta", data?.data?.subtotal);
  const handleClick = () => {
    // if (data?.data?.subtotal > 0) {
    //   router.push("/home/store/checkout");
    // }
    if(user?.email_verified_at && user?.phone){
      if (data?.data?.subtotal > 0) {
        router.push(`/${lang}/home/store/checkout`);
      } else {
        Swal.fire({
          title: "No item selected",
          text: "You need to select items",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result: any) => {
          if (result.isConfirmed) {
            router.push(`/${lang}/home/store`);
          }
        });
      }
    }else{
      setShowModal(true);
    }
    
  };
  const handleCancelModal = ()=>{
    setShowModal(false);
  }
  const handleConfirmModal = ()=>{
    setShowModal(false);
    router.push(`/${lang}/dashboard/profile`)
  }
  return (
    <div className={`${styles.orderSummary} ${isArabic && "arabic"}`}>
      {
        showModal && 
        <ErrorModal 
        onCancel={handleCancelModal}
        onConfirm={handleConfirmModal}
        />
      }

      <h2 style={{ textAlign: isArabic ? "right" : "left" }}>
        {t("summary")}{" "}
      </h2>
      <div className={styles.subtotal}>
        <span>{t("subTotal")}:</span>
        <span>
          {isLoading
            ? "Loading"
            : `${data?.data?.subtotal} ${data?.data?.currency}`}
        </span>
      </div>
      <p>{t("delivery")}</p>
      <button onClick={handleClick} className={styles.checkoutButton}>
        {t("checkout")}
      </button>
    </div>
  );
};

export default OrderSummary;
