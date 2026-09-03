"use client";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion, animate } from "framer-motion";
import { TbWorld } from "react-icons/tb";
import { MdTranslate } from "react-icons/md";
import { LuPencil, LuArrowDown } from "react-icons/lu";
import styles from "./style.module.scss";
import heroEn from "../../../../../../assets/Categories/category-hero-en.webp";
import heroAr from "../../../../../../assets/Categories/category-hero-ar.webp";
import { leftContainerVariant, rightContainerVariant } from "@/animation";

const SCROLL_TARGET_ID = "learningWorlds";

/** Eased scroll driven by framer-motion's animation engine. */
const animatedScrollTo = (targetY: number, duration = 1) => {
  const startY = window.scrollY;
  if (Math.abs(targetY - startY) < 2) return;

  const controls = animate(startY, targetY, {
    type: "tween",
    duration,
    ease: [0.4, 0, 0.15, 1],
    onUpdate: (v) => window.scrollTo(0, v),
  });

  // let the viewer take back control if they scroll during the animation
  const cancel = () => {
    controls.stop();
    cleanup();
  };
  const cleanup = () => {
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  };
  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", cancel);
  controls.then(cleanup);
};

const CategoryHero = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const t = useTranslations("categoriesPage.categoryHero");

  const cards = [
    { Icon: TbWorld, title: t("card1Title"), text: t("card1Text") },
    { Icon: MdTranslate, title: t("card2Title"), text: t("card2Text") },
    { Icon: LuPencil, title: t("card3Title"), text: t("card3Text") },
  ];

  const scrollToWorlds = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof document === "undefined") return;
    const el = document.getElementById(SCROLL_TARGET_ID);
    if (!el) return;
    e.preventDefault();

    const nav = document.querySelector<HTMLElement>('[class*="navContainer"]');
    const offset = (nav?.offsetHeight ?? 0) + 12;
    const targetY = el.getBoundingClientRect().top + window.scrollY - offset;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    animatedScrollTo(targetY, reduceMotion ? 0.6 : 1);
  };

  return (
    <section className={`${styles.hero} ${isArabic ? "arabic" : ""}`}>
      <div className={styles.card}>
        <span className={styles.glow} aria-hidden="true" />
        <span className={styles.glow2} aria-hidden="true" />

        <div className={styles.grid}>
          <motion.div
            className={styles.visual}
            variants={leftContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={isArabic ? heroAr : heroEn}
              alt={t("imageAlt")}
              className={styles.visualImg}
              sizes="(max-width: 900px) 90vw, 44vw"
              priority
            />
          </motion.div>

          <motion.div
            className={styles.content}
            variants={rightContainerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className={styles.title}>
              <span className={styles.titleGradient}>{t("title")}</span>
              <svg 
              className={styles.sparkle}
              xmlns="http://www.w3.org/2000/svg" width="77" height="76" viewBox="0 0 77 76" fill="none">
                <g fill="#FFC72C">
                  
                  <path d="M45.2 7.2C46.1 24.4 48.9 30.1 65.8 37.9C49.0 39.8 46.5 45.0 45.2 68.9C42.9 48.0 40.0 40.8 23.0 37.9C39.7 32.9 43.2 25.4 45.2 7.2Z" />
                  
                  <path d="M20.0 7.4C20.6 13.8 21.8 16.5 27.9 18.9C21.9 20.0 20.8 22.1 20.0 29.5C18.9 23.0 17.5 20.6 12.0 18.9C17.6 17.2 19.1 14.8 20.0 7.4Z" />
                  
                  <path d="M20.0 45.2C20.7 51.5 21.8 54.0 27.8 56.4C21.8 57.5 20.8 59.7 20.0 67.0C18.9 60.7 17.6 58.2 12.0 56.4C17.6 54.8 19.1 52.5 20.0 45.2Z" />
                </g>
              </svg>
              {/* <svg
                className={styles.sparkle}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="categoryHeroSparkle"
                    x1="2"
                    y1="2"
                    x2="22"
                    y2="22"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4e5ae2" />
                    <stop offset="0.54" stopColor="#9e32a4" />
                    <stop offset="1" stopColor="#d552d8" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 1.5c.6 5 3.5 7.9 8.5 8.5-5 .6-7.9 3.5-8.5 8.5-.6-5-3.5-7.9-8.5-8.5 5-.6 7.9-3.5 8.5-8.5Z"
                  fill="url(#categoryHeroSparkle)"
                />
                <path
                  d="M19.5 2.5c.2 1.6 1.1 2.5 2.7 2.7-1.6.2-2.5 1.1-2.7 2.7-.2-1.6-1.1-2.5-2.7-2.7 1.6-.2 2.5-1.1 2.7-2.7Z"
                  fill="url(#categoryHeroSparkle)"
                  opacity="0.75"
                />
              </svg> */}
            </h2>
            <p className={styles.sub}>{t("sub")}</p>

            <ul className={styles.cards}>
              {cards.map(({ Icon, title, text }) => (
                <li key={title} className={styles.featureCard}>
                  <span className={styles.iconTile} aria-hidden="true">
                    <Icon />
                  </span>
                  <span className={styles.cardBody}>
                    <span className={styles.cardTitle}>{title}</span>
                    <span className={styles.cardText}>{text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={`#${SCROLL_TARGET_ID}`}
              className={styles.cta}
              onClick={scrollToWorlds}
            >
              {t("cta")}
              <span className={styles.ctaIcon} aria-hidden="true">
                <LuArrowDown />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CategoryHero;
