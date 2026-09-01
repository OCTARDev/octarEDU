"use client";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./style.module.scss";
import { motion, useScroll, useSpring } from "framer-motion";
import { leftContainerVariant, downContainerVariant } from "@/animation";
import useInViewAnimation from "@/animation/useScroll";
import SiwtchingForms from "../switchForms";
import { user } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
const About = ({ data }: any) => {
  const { ref: refOne, controls: ControlsOne } = useInViewAnimation();
  const { ref: refSecond, controls: ControlsSecond } = useInViewAnimation();
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const handleChange = () => {
    setOpen(!open);
  };
  const getTheUserData: user | any =
    typeof window !== "undefined" ? localStorage.getItem("octar") : false;
  const userData = JSON.parse(getTheUserData);
  const isLoggedWithToken = userData?.token ? true : false;
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const t = useTranslations("Homepage");
  const [isLogged, setIsLogged] = useState(false);

  useLayoutEffect(() => {
    if (isLoggedWithToken) {
      setIsLogged(true);
    }
    if (!isLoggedWithToken) {
      setIsLogged(false);
    }
  }, [isLoggedWithToken]);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const lang = pathname.split("/")[1];
  return (
    <>
      <motion.div className={styles["progress-bar"]} style={{ scaleX }} />
      <div className={`${styles.container} ${isArabic && "arabic"}`}>
        <motion.div
          ref={refOne}
          variants={leftContainerVariant}
          initial="hidden"
          animate={ControlsOne}
          transition={{ type: "tween", duration: 1 }}
          className={styles.leftDiv}
        >
          <p>{t("about.IntroducingOCTAR")}</p>
          <div className={styles.hideH3}>
            <h3>
              {t("about.word1")}{" "}
              <span> {t("about.word2")}</span>
              <span> {t("about.word3")}</span>
            </h3>
            <h3>
              <span> {t("about.word4")}</span>
              <span className={isArabic ? "" : styles.colorful}> {t("about.word5")}</span>
              <span className={styles.colorful}> {t("about.word6")}</span>
              <span className={isArabic ? styles.colorful : ""}> {t("about.word7")}</span>
            </h3>
          </div>
          <div className={styles.showH3}>
            <h3>
              {t("about.word1")}{" "}
              <span> {t("about.word2")}</span>
              <span> {t("about.word3")}</span>
            </h3>
            <h3>
              <span> {t("about.word4")}</span>
              <span className={isArabic ? "" : styles.colorful}> {t("about.word5")}</span>
              <span className={styles.colorful}> {t("about.word6")}</span>
              <span className={isArabic ? styles.colorful : ""}> {t("about.word7")}</span>
            </h3>
          </div>
          <p>{t("about.des")}</p>
          <div>
            {/* <Image src={appStore} alt="apple store"></Image>
            <Image src={googlePlay} alt="google play"></Image> */}
            {isLogged ? (
              <motion.button
                onClick={() => router.push(`/${lang}/dashboard/coloring`)}
                className={styles.btn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span> </span>
                <span> </span>
                <span> </span>
                <span> </span>
                {t("about.free")}
              </motion.button>
            ) : (
              <motion.button
                onClick={() => router.push(`/${lang}/login`)}
                className={styles.btn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span> </span>
                <span> </span>
                <span> </span>
                <span> </span>
                {t("about.free")}
              </motion.button>
            )}
          </div>
        </motion.div>
        <motion.div
          ref={refSecond}
          variants={downContainerVariant}
          initial="hidden"
          animate={ControlsSecond}
          transition={{ type: "just", duration: 1 }}
          className={styles.rgihtDiv}
        >
          {/* <Image src={video} width={700} height={700} alt="video"></Image> */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/wB0bQBwPEIc?si=eD7LABOggcZNQODd?autoplay=1&controls=0&showinfo=0&modestbranding=1"
            title="YouTube Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
      <SiwtchingForms open={open} setOpen={setOpen}></SiwtchingForms>
    </>
  );
};

export default About;
