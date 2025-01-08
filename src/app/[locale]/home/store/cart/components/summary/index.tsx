"use client";
import { usePathname, useRouter } from "next/navigation";
import styles from "./style.module.scss";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

const OrderSummary = ({ data, isLoading }: any) => {
  const router = useRouter();
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const t = useTranslations("store");
  //console.log("DAta", data?.data?.subtotal);
  const handleClick = () => {
    // if (data?.data?.subtotal > 0) {
    //   router.push("/home/store/checkout");
    // }
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
  };
  return (
    <div className={`${styles.orderSummary} ${isArabic && "arabic"}`}>
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
