"use client";
import React from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import useInViewAnimation from "@/animation/useScroll";
import {
  downContainerVariant,
  leftContainerVariant,
  upContainerVariant,
} from "@/animation";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
const WhatIsOctarFor = () => {
  const { ref, controls } = useInViewAnimation();
  const { ref: refTwo, controls: controlsTwo } = useInViewAnimation();
  const { ref: refThree, controls: controlsThree } = useInViewAnimation();
  const t = useTranslations("Homepage.whatIsOctarFor");
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  return (
    <div className={`${styles.container} ${isArabic && "arabic"}`}>
      <motion.div
        variants={leftContainerVariant}
        ref={refThree}
        animate={controlsThree}
        initial="hidden"
        transition={{
          duration: 1,
        }}
        className={styles.firstDiv}
      >
        <h1>
          {t("WhoisOCTARfor")}
          {/* Who is <span>OCTAR</span> for? */}
        </h1>
        <h2>{t("OCTARisdesigned")}</h2>
      </motion.div>
      <div className={styles.secondDiv}>
        <motion.div
        // variants={downContainerVariant}
        // ref={ref}
        // animate={controls}
        // initial="hidden"
        // transition={{
        //   duration: 1,
        // }}
        >
          <motion.h1
            variants={downContainerVariant}
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{
              duration: 0.5,
            }}
          >
            {t("children")}
          </motion.h1>
          <motion.p
            variants={downContainerVariant}
            ref={ref}
            animate={controls}
            initial="hidden"
            transition={{
              duration: 0.8,
            }}
          >
            {t("forChildren")}
          </motion.p>
        </motion.div>
        <motion.div>
          <motion.h1
            variants={downContainerVariant}
            ref={refTwo}
            animate={controlsTwo}
            initial="hidden"
            transition={{
              duration: 0.5,
            }}
          >
            {t("parents")}
          </motion.h1>
          <motion.p
            variants={downContainerVariant}
            ref={refTwo}
            animate={controlsTwo}
            initial="hidden"
            transition={{
              duration: 0.8,
            }}
          >
            {t("forParents")}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default WhatIsOctarFor;
