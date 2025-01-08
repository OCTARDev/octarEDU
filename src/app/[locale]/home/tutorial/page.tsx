"use client";
import React from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import useInViewAnimation from "@/animation/useScroll";
import { motion } from "framer-motion";
import { upContainerVariant } from "@/animation";
import { useTranslations } from "next-intl";

const Tutorial = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  let lang = pathname.split("/")[1];
  const { ref: refOne, controls: controlsOne } = useInViewAnimation();
  const { ref: refTwo, controls: controlsTwo } = useInViewAnimation();
  const { ref: refThree, controls: controlsThree } = useInViewAnimation();
  const t = useTranslations("tutorial");
  return (
    <div className={`${styles?.aboutContainer} ${isArabic && "arabic"}`}>
      <div className={styles.content}>
        {isArabic ? (
          <div className={styles.videoContainer}>
            <div>
              <h2 className={styles.title}>التسجيل في تطبيق أوكتار</h2>
              <p className={styles.desc}>{t("discover")}</p>
              <motion.div
                className={styles.video}
                ref={refOne}
                variants={upContainerVariant}
                animate={controlsOne}
                initial="hidden"
                transition={{
                  duration: 1,
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/WcHTbfGUrgA?si=C_FtF2yCKNI7kIq3?autoplay=1&controls=0&showinfo=0&modestbranding=1"
                  title="YouTube Video"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </div>
            <div>
              <h2 className={styles.title}>
                الاشتراك من خلال الموقع ولوحة التحكم
              </h2>
              <p className={styles.desc}>{t("learn")}</p>

              <motion.div
                className={styles.video}
                ref={refTwo}
                variants={upContainerVariant}
                animate={controlsTwo}
                initial="hidden"
                transition={{
                  duration: 1,
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/cZkrWm0mOKc?si=TYJ89tyqNLlOARnw?autoplay=1&controls=0&showinfo=0&modestbranding=1"
                  title="YouTube Video"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </div>
            {/* <div>
              <h2 className={styles.title}>كيف تستخدم أوكتار</h2>
              <p className={styles.desc}>
                يجعل أوكتار رسومات طفلك تنبض بالحياة من خلال الواقع المعزز مع
                تعليم اللغتين العربية والإنجليزية! اتبع هذا الدليل البسيط لبدء
                رحلة التعلم
              </p>

              <motion.div
                className={styles.video}
                ref={refThree}
                variants={upContainerVariant}
                animate={controlsThree}
                initial="hidden"
                transition={{
                  duration: 1,
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/cZkrWm0mOKc?si=TYJ89tyqNLlOARnw?autoplay=1&controls=0&showinfo=0&modestbranding=1"
                  title="YouTube Video"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </div> */}
          </div>
        ) : (
          <div className={styles.videoContainer}>
            <div>
              <h2 className={styles.title}> OCTAR App Sign Up</h2>
              <p className={styles.desc}>{t("discover")}</p>
              <motion.div
                className={styles.video}
                ref={refOne}
                variants={upContainerVariant}
                initial="hidden"
                animate={controlsOne}
                transition={{
                  duration: 1,
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/KBewCrt_F5c?si=w--r2XCprpgiL_Nj?autoplay=1&controls=0&showinfo=0&modestbranding=1"
                  title="YouTube Video"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </div>
            <div>
              <h2 className={styles.title}> Website Sign up and Dashboard</h2>
              <p className={styles.desc}>{t("learn")}</p>

              <motion.div
                className={styles.video}
                ref={refTwo}
                variants={upContainerVariant}
                initial="hidden"
                animate={controlsTwo}
                transition={{
                  duration: 1,
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/L5615S2_zOQ?si=OtRNyBeYDYsMWpAI?autoplay=1&controls=0&showinfo=0&modestbranding=1"
                  title="YouTube Video"
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tutorial;
