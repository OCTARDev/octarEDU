"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import styles from "./style.module.scss";
import giftImg from "../../../../../../assets/Categories/git-box.webp";

/** id of the wrapper around the products grid + this CTA (see available/index.tsx). */
const PRODUCTS_ZONE_ID = "productsStickyZone";

const SubscriptionCta = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1] || (isArabic ? "ar" : "en");
  const t = useTranslations("categoriesPage.subscriptionCta");

  const sentinelRef = useRef<HTMLDivElement>(null);
  // mounted: any part of the products zone is on screen -> the bar exists
  const [mounted, setMounted] = useState(false);
  // docked: the end of the zone has reached the viewport -> the bar parks in
  // place (above the footer) instead of floating over the viewport bottom
  const [docked, setDocked] = useState(false);

  useEffect(() => {
    const zone = document.getElementById(PRODUCTS_ZONE_ID);
    const sentinel = sentinelRef.current;
    if (!zone || !sentinel) return;

    // IntersectionObserver, not a scroll listener: the browser only notifies
    // us on real threshold crossings, so scrolling stays perfectly smooth.
    const mountObserver = new IntersectionObserver(
      ([entry]) => setMounted(entry.isIntersecting),
      { threshold: 0 }
    );
    mountObserver.observe(zone);

    // sentinel sits exactly at the zone's bottom edge; the moment it enters the
    // viewport the docked position and the floating position coincide, so the
    // switch is seamless.
    const dockObserver = new IntersectionObserver(
      ([entry]) => setDocked(entry.isIntersecting),
      { threshold: 0 }
    );
    dockObserver.observe(sentinel);

    return () => {
      mountObserver.disconnect();
      dockObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.anchor} aria-hidden="true" />
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden="true" />
      <AnimatePresence>
        {mounted && (
          <motion.div
            className={`${styles.bar} ${docked ? styles.docked : styles.floating} ${
              isArabic ? "arabic" : ""
            }`}
            initial={{ y: "120%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "120%", opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.banner}>
              <div className={styles.left}>
                <Image
                  src={giftImg}
                  alt={t("imageAlt")}
                  className={styles.gift}
                  sizes="64px"
                />
                <div className={styles.text}>
                  <h2 className={styles.title}>{t("title")}</h2>
                  <p className={styles.sub}>{t("sub")}</p>
                </div>
              </div>

              <div className={styles.right}>
                <Link
                  href={`/${lang}/home/individual/`}
                  className={styles.button}
                >
                  <span className={styles.lock} aria-hidden="true">
                    <FaLock />
                  </span>
                  {t("button")}
                </Link>
                <span className={styles.note}>{t("note")}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SubscriptionCta;
