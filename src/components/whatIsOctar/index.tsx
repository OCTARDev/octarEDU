"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import phones from "../../assets/phones.svg";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  leftContainerVariant,
  rightContainerVariant,
  sowContainerVariant,
  textAnimationVaraint,
} from "@/animation";
import useInViewAnimation from "@/animation/useScroll";
import appStore from "../../assets/app store.png";
import playStore from "../../assets/google play.png";
import googleQr from "../../assets/qr-code.png";
import appleQr from "../../assets/testAppleStore.svg";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
const WhatIsOctar = ({ data }: any) => {
  const [loading, setLoading] = useState(true);
  const { ref: refThree, controls: controlsThree } = useInViewAnimation();
  const { ref: refFour, controls: controlsFour } = useInViewAnimation();
  const { ref: refFive, controls: controlsFive } = useInViewAnimation();
  function onImageLoad() {
    setLoading(false);
    //console.log("loaded");
  }
  //console.log("loading", loading);
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const text = isArabic ? " اوكتار ؟" : "OCTAR ?";
  const t = useTranslations("Homepage.whatIsOctar");
  return (
    <>
      <section className={`${styles.Container} ${isArabic && "arabic"}`}>
        <motion.div
          // variants={leftContainerVariant}
          // ref={refOne}
          // animate={controlsOneo}
          // initial="hidden"
          // transition={{
          //   type: "tween",
          //   when: "beforeChildren",
          //   duration: 1.5,
          // }}
          className={styles.whatContainer}
        >
          <motion.div
          // variants={sowContainerVariant}
          // ref={refTwo}
          // animate={controlsTwo}
          // transition={{
          //   type: "tween",
          //   when: "beforeChildren",
          // }}
          >
            <p>{t("aboutus")}</p>
            <h1>
              {t("what")} <span></span>
              <motion.span
                ref={refThree}
                animate={controlsThree}
                initial="hidden"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.4,
                    },
                  },
                  hidden: {},
                }}
              >
                {text.split("").map((char: string, charIndex: number) => {
                  return (
                    <motion.span
                      key={`${char}-${charIndex}`}
                      className="inline-block"
                      variants={textAnimationVaraint}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </motion.span>
            </h1>
          </motion.div>
          <motion.div
            ref={refFive}
            variants={leftContainerVariant}
            initial="hidden"
            animate={controlsFive}
            transition={{
              type: "tween",
              // when: "beforeChildren",
              duration: 0.9,
            }}
          >
            <Image
              src={phones}
              alt="video"
              onLoad={onImageLoad}
              priority
            ></Image>
          </motion.div>
          <motion.div
            variants={rightContainerVariant}
            ref={refFour}
            initial="hidden"
            animate={controlsFour}
            transition={{
              type: "tween",
              duration: 0.9,
            }}
          >
            <p>{t("des")}</p>

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="https://apps.apple.com/eg/app/octar-3d-ar-coloring-for-kids/id6670721486"
                  target="_blank"
                >
                  <Image src={appStore} alt="store" width="200"></Image>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.adgroup.OCTAR"
                  target="_blank"
                >
                  <Image src={playStore} alt="store" width="200"></Image>
                </a>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Image
                  src={appleQr}
                  alt="app store"
                  className={styles.qr}
                ></Image>
                <Image
                  src={googleQr}
                  alt="google play"
                  className={styles.qr}
                ></Image>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

export default WhatIsOctar;
