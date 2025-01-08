"use client";
import React from "react";
import styles from "./style.module.scss";
import img1 from "../../assets/subcription/Group 103.svg";
import img2 from "../../assets/subcription/Group 104.svg";
import Image from "next/image";
import useInViewAnimation from "@/animation/useScroll";
import { motion } from "framer-motion";
import {
  downContainerVariant,
  leftContainerVariant,
  rotatetAnimationVaraint,
  upContainerVariant,
} from "@/animation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
const Subscription = ({ data, isArabic }: any) => {
  const { ref: refOne, controls: controlsOne } = useInViewAnimation();
  const { ref: refTwo, controls: controlsTwo } = useInViewAnimation();
  const { ref: refThree, controls: controlsThree } = useInViewAnimation();
  const { ref: refFour, controls: controlsFour } = useInViewAnimation();
  const { ref: refFive, controls: controlsFive } = useInViewAnimation();
  const accounTypes = data?.data?.account_types;
  const t = useTranslations("Homepage.subcrriptions");
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  return (
    <div>
      <div
        className={`${styles.subscriptionContainer} ${isArabic && "arabic"}`}
      >
        <motion.div
          variants={leftContainerVariant}
          ref={refThree}
          animate={controlsThree}
          initial="hidden"
          transition={{ when: "beforeChildren", duration: 0.5 }}
        >
          {/* <p> Octar plans</p> */}
          <h1>{t("plans")}</h1>
        </motion.div>
        <div className={styles.secondDivSubscription}>
          {accounTypes?.map((account: any) => {
            return (
              <motion.div
                initial="hidden"
                variants={upContainerVariant}
                ref={refTwo}
                animate={controlsTwo}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  when: "beforeChildren",
                }}
                key={account.id}
              >
                <Image
                  src={account.image}
                  width="700"
                  height="700"
                  alt={account.title}
                ></Image>
                <div>
                  <div
                    style={{
                      // direction: isArabic ? "rtl" : "ltr",
                      // textAlign: isArabic ? "right" : "left",
                      display: "flex",
                      flexDirection: isArabic ? "row-reverse" : "row",
                      gap: "10px",
                    }}
                  >
                    <p>{account.title}</p>
                    <p>{t("subscription")}</p>
                  </div>
                  <ul>
                    {account.account_type_description.map((desc: any) => {
                      return <li key={desc.id}>{desc.content}</li>;
                    })}
                  </ul>
                </div>
                <motion.div
                  initial="hidden"
                  variants={leftContainerVariant}
                  ref={refFour}
                  animate={controlsFour}
                  transition={{
                    duration: 1,
                    // delay: 1,
                    type: "spring",
                    stiffness: 180,
                  }}
                >
                  <Link
                    href={
                      account?.id === 1
                        ? `/${lang}/home/individual`
                        : `/${lang}/home/school`
                    }
                    className={styles.flex}
                  >
                    {/* <h1>{t("plans")}</h1> */}
                    <p className={styles.diffColor}>{t("learnMore")}</p>
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{ transform: isArabic && "rotate(180deg)" }}
                    >
                      <path
                        d="M15 18L21 12L15 6L13.6 7.4L17.2 11H3V13H17.2L13.6 16.6L15 18Z"
                        fill="#4E5AE2"
                      />
                    </motion.svg>
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
          {/* <motion.div
            initial="hidden"
            variants={downContainerVariant}
            ref={refOne}
            animate={controlsOne}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Image src={img2} alt="kid 2"></Image>
            <div>
              <p>Individual Subscription</p>
              <ul>
                <li>{`Dive into OCTAR AR App's World`}</li>
                <li>
                  Discover endless 3D adventures and educational resources.
                </li>
                <li>
                  {`Enjoy a subscription tailored to your child's age group.`}{" "}
                </li>
                <li>{`Unlock exclusive content, updates, and more.`}</li>
              </ul>
            </div>
            <motion.div
              initial="hidden"
              variants={leftContainerVariant}
              ref={refFive}
              animate={controlsFive}
              transition={{
                duration: 1,
                // delay: 1,
                type: "spring",
                stiffness: 180,
              }}
            >
              <p>Learn More</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 18L21 12L15 6L13.6 7.4L17.2 11H3V13H17.2L13.6 16.6L15 18Z"
                  fill="#9E32A4"
                />
              </svg>
            </motion.div>
          </motion.div>
          <motion.div
            initial="hidden"
            variants={upContainerVariant}
            ref={refTwo}
            animate={controlsTwo}
            transition={{ duration: 0.5, delay: 0.5, when: "beforeChildren" }}
          >
            <Image src={img1} alt="kid 1"></Image>
            <div>
              <p>Individual Subscription</p>
              <ul>
                <li>{`Dive into OCTAR AR App's World`}</li>
                <li>
                  Discover endless 3D adventures and educational resources.
                </li>
                <li>
                  {`Enjoy a subscription tailored to your child's age group.`}{" "}
                </li>
                <li>{`Unlock exclusive content, updates, and more.`}</li>
              </ul>
            </div>
            <motion.div
              initial="hidden"
              variants={leftContainerVariant}
              ref={refFour}
              animate={controlsFour}
              transition={{
                duration: 1,
                // delay: 1,
                type: "spring",
                stiffness: 180,
              }}
            >
              <p className={styles.diffColor}>Learn More</p>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 18L21 12L15 6L13.6 7.4L17.2 11H3V13H17.2L13.6 16.6L15 18Z"
                  fill="#4E5AE2"
                />
              </motion.svg>
            </motion.div>
          </motion.div> */}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
