"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import styles from "./style.module.scss";
import giftImg from "../../../../../../assets/Categories/git-box.webp";
import { downContainerVariant } from "@/animation";

const SubscriptionCta = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1] || (isArabic ? "ar" : "en");
  const t = useTranslations("categoriesPage.subscriptionCta");

  return (
    <section className={`${styles.section} ${isArabic ? "arabic" : ""}`}>
      <motion.div
        className={styles.banner}
        variants={downContainerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <div className={styles.left}>
          <Image
            src={giftImg}
            alt={t("imageAlt")}
            className={styles.gift}
            sizes="(max-width: 720px) 96px, 110px"
          />
          <div className={styles.text}>
            <h2 className={styles.title}>{t("title")}</h2>
            <p className={styles.sub}>{t("sub")}</p>
          </div>
        </div>

        <div className={styles.right}>
          <Link href={`/${lang}/home/individual/`} className={styles.button}>
            <span className={styles.lock} aria-hidden="true">
              <FaLock />
            </span>
            {t("button")}
          </Link>
          <span className={styles.note}>{t("note")}</span>
        </div>
      </motion.div>
    </section>
  );
};

export default SubscriptionCta;
