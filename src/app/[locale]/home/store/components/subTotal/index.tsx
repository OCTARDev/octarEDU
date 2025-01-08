"use client";
import { leftContainerVariant } from "@/animation";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import useInViewAnimation from "@/animation/useScroll";
import { useGetCartSubtotalQuery } from "@/redux/rtk/cart";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
// import { useGetCartSubtotalQuery } from "@/redux/rtk/cart";
const Subtotal = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const t = useTranslations("store");
  const { data, isLoading, isFetching } = useGetCartSubtotalQuery(lang);
  //console.log("  isNaN(data?.data?.subtotal)", isNaN(data?.data?.subtotal));
  return (
    <motion.div
      className={`${styles.center} ${isArabic && "arabic"}`}
      initial={{ y: "50vw" }}
      animate={{ y: "0" }}
      transition={{ duration: 1, ease: "linear" }}
      style={{
        position: "fixed",
        bottom: "0",
        left: 0,
        width: "100%",
        height: "100px",
      }}
    >
      <div className={styles.container}>
        <span className={styles.subtotal}>
          {t("subTotal")} :
          {isLoading || isFetching ? (
            "Loading..."
          ) : (
            <>
              {isNaN(data?.data?.subtotal) ? (
                <>0</>
              ) : (
                <>
                  {data?.data?.subtotal} {data?.data?.currency}
                </>
              )}
            </>
          )}
        </span>
        <Link href={`/${lang}/home/store/cart`}>
          <button className={styles.button}>{t("view")}</button>
        </Link>
      </div>
    </motion.div>
  );
};

export default Subtotal;
