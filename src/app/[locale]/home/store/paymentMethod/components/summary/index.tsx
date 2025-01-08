import { useSelector } from "react-redux";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const OrderSummary = ({ cartData, orderLoading }: any) => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const t = useTranslations("store");
  //console.log("cartData", cartData?.data);
  const { basicInfo } = useSelector((state: any) => state?.orderForm);
  //console.log("basicInfo", basicInfo);
  return (
    <div className={styles.orderSummary}>
      <h2 style={{ textAlign: isArabic ? "right" : "left" }}>
        {t("summary")}{" "}
      </h2>
      <div className={styles.subtotal}>
        <div>
          <span>{t("subTotal")}:</span>
          <span>
            {cartData?.data?.subtotal} {cartData?.data?.currency}
          </span>
        </div>
        <div>
          <span>{t("deliveryFees")}:</span>
          <span>
            {basicInfo?.government?.price} {basicInfo?.government?.currency}
          </span>
        </div>
        <hr />
        {/* <div>
          <span>Subtotal:</span>
          <span>750 EGP</span>
        </div> */}
      </div>
      <button className={styles.checkoutButton} type="submit">
        {orderLoading ? `${t("loading")}...` : t("payment")}
      </button>
    </div>
  );
};

export default OrderSummary;
