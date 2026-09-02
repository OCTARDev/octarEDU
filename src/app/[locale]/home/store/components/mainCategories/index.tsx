"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";
import Loader from "@/components/loader";
import { useGetMaincategoriesQuery } from "@/redux/rtk/categories";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { leftContainerVariant, rightContainerVariant } from "@/animation";

interface Res {
  id: number;
  is_active: number;
  media: { id: number; file_path: string } | null;
  title: string;
}

const AUTOPLAY_MS = 5000;

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Categories = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const t = useTranslations("store");
  const { data, isLoading } = useGetMaincategoriesQuery(lang);

  const list: Res[] = Array.isArray(data?.data) ? data.data : [];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // keep the active index valid whenever the data changes
  useEffect(() => {
    setActive(0);
  }, [data]);

  // gentle autoplay so the section feels alive even with only a couple of worlds
  useEffect(() => {
    if (paused || list.length < 2) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % list.length),
      AUTOPLAY_MS
    );
    return () => window.clearInterval(id);
  }, [paused, list.length]);

  if (isLoading) return <Loader />;
  if (!list.length) return null;

  const current = list[active] ?? list[0];
  const pad2 = (n: number) => String(n + 1).padStart(2, "0");
  const hrefFor = (id: number | string) => ({
    pathname: "products",
    query: { single: `${id}` },
  });

  return (
    <section
      className={`${styles.worlds} ${isArabic ? `arabic ${styles.rtl}` : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.inner}>
        {/* ---- interactive index ---- */}
        <motion.div
          className={styles.rail}
          variants={leftContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className={styles.kicker}>
            <span className={styles.kickerDot} aria-hidden="true" />
            {t("worldsKicker")}
          </p>
          <h2 className={styles.heading}>{t("worldsHeading")}</h2>

          <ul className={styles.list}>
            {list.map((c, i) => {
              const isActive = i === active;
              return (
                <li key={c.id} className={styles.item}>
                  <Link
                    href={hrefFor(c.id)}
                    className={`${styles.row} ${isActive ? styles.rowActive : ""}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    aria-current={isActive ? "true" : undefined}
                  >
                    {c.media?.file_path && (
                      <Image
                        src={c.media.file_path}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="100vw"
                        className={styles.rowImg}
                      />
                    )}
                    <span className={styles.rowScrim} aria-hidden="true" />
                    <span className={styles.rowNum}>{pad2(i)}</span>
                    <span className={styles.rowTitle}>{c.title}</span>
                    <span className={styles.rowArrow} aria-hidden="true">
                      <Arrow />
                    </span>
                    {isActive && list.length > 1 && (
                      <motion.span
                        key={`${c.id}-${paused}`}
                        className={styles.rowProgress}
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: paused ? 0 : 1 }}
                        transition={{
                          duration: paused ? 0.3 : AUTOPLAY_MS / 1000,
                          ease: paused ? "easeOut" : "linear",
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>

        {/* ---- stage ---- */}
        <motion.div
          className={styles.stage}
          variants={rightContainerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className={styles.stageBlob} aria-hidden="true" />
          <span className={styles.stageIndex} aria-hidden="true">
            {pad2(active)}
            {list.length > 1 && <i>/ {pad2(list.length - 1)}</i>}
          </span>

          <div className={styles.frame}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className={styles.slide}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                {current.media?.file_path && (
                  <Image
                    src={current.media.file_path}
                    alt={current.title}
                    fill
                    sizes="(max-width: 900px) 92vw, 52vw"
                    className={styles.slideImg}
                    priority
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.stageMeta}>
            <AnimatePresence mode="wait">
              <motion.p
                key={`title-${current.id}`}
                className={styles.stageTitle}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {current.title}
              </motion.p>
            </AnimatePresence>
            <Link href={hrefFor(current.id)} className={styles.cta}>
              {t("explore")}
              <span className={styles.ctaArrow} aria-hidden="true">
                <Arrow />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
