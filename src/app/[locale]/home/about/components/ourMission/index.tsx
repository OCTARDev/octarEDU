"use client";
import React from "react";
import styles from "./style.module.scss";
import img from "../../../../../../assets/compressed/Mission.png";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";
import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import useInViewAnimation from "@/animation/useScroll";
import {
  downContainerVariant,
  leftContainerVariant,
  rightContainerVariant,
  showAnimationWithChildren,
  sowContainerVariant,
  upContainerVariant,
} from "@/animation";
import AnimatedTextWord from "@/animation/animatingText";
import { useTranslations } from "next-intl";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const OurMission = ({ isArabic }: { isArabic: boolean }) => {
  const { ref: refOne, controls: controlsOne } = useInViewAnimation();
  const { ref: refTwo, controls: controlsTwo } = useInViewAnimation();
  const t = useTranslations("AboutPage");
  return (
    <div>
      <div className={styles.historyContainer}>
        <Grid
          container
          columns={12}
          spacing={5}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs={12} md={6} order={{ sm: 1, lg: 2, md: 2 }}>
            <motion.div
              variants={leftContainerVariant}
              ref={refOne}
              animate={controlsOne}
              initial="hidden"
              className={styles.leftSide}
              transition={{
                type: "spring",
                stiffness: 150,
                duration: 0.7,
                when: "beforeChildren",
              }}
            >
              <motion.h1
                variants={sowContainerVariant}
                ref={refTwo}
                animate={controlsTwo}
                initial="hidden"
                transition={{
                  // type: "spring",
                  // stiffness: 580,
                  delay: 1,
                  staggerChildren: 0.18,
                  duration: 0.1,
                  // staggerDirection: -1,
                }}
              >
                {t("mission")}
                {/* <motion.span variants={upContainerVariant}>M</motion.span>
                <motion.span variants={upContainerVariant}>i</motion.span>
                <motion.span variants={upContainerVariant}>s</motion.span>
                <motion.span variants={upContainerVariant}>s</motion.span>
                <motion.span variants={upContainerVariant}>i</motion.span>
                <motion.span variants={upContainerVariant}>o</motion.span>
                <motion.span variants={upContainerVariant}>n</motion.span> */}
              </motion.h1>
              <p className="!font-bold">{t("missionDec1")}</p>
              <p>{t("missionDec2")}</p>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6} order={{ sm: 2, lg: 1, md: 1 }}>
            <motion.div
              variants={rightContainerVariant}
              ref={refOne}
              animate={controlsOne}
              initial="hidden"
              transition={{ type: "spring", stiffness: 150, duration: 0.7 }}
              className={styles.rightSide}
            >
              <Image src={img} alt="video"></Image>
            </motion.div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default OurMission;
