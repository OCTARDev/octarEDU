"use client";
import React, { useRef, useState } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import {
  leftContainerVariant,
  rightContainerVariant,
  textAnimationVaraint,
} from "@/animation";
import { useInView } from "react-intersection-observer";
import useInViewAnimation from "@/animation/useScroll";

type props = {
  faq: {
    open: boolean;
    answer: string;
    question: string;
  };
  index: number;
  toggleFAQ: any;
  lang?: string;
};
const leftVariants = {
  hidden: { opacity: 0, x: -150 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const rgihtVariants = {
  hidden: { opacity: 0, x: 150 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};
const FAQ = ({ faq, index, toggleFAQ, lang }: props) => {
  const { ref, controls } = useInViewAnimation();
  //console.log("faq", faq?.open);
  return (
    <>
      <motion.div
        variants={index % 2 ? leftVariants : rgihtVariants}
        // variants={rgihtVariants}
        key={index}
        ref={ref}
        initial="hidden"
        animate={controls}
        // animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.5 }}
        className={`${
          faq.open ? `${styles.faqOpen} ${styles.faq} ` : `${styles.faq} `
        } ${lang === "ar" && "arabic"}`}
        onClick={() => toggleFAQ(index)}
      >
        <div className={styles.q_btn}>
          <div className={styles.faqQuestion}>
            {faq.question?.replaceAll("?", "")}
            {faq.open ? (
              <motion.span
                variants={textAnimationVaraint}
                initial="hidden"
                animate={faq.open ? "visible" : "hidden"}
                transition={{ duration: 0.5 }}
              ></motion.span>
            ) : (
              <span> </span>
            )}
          </div>
          {faq.open ? (
            <button
              className={styles.btn}
              onClick={() => {
                // toggleFAQ(index);
                // alert("clicked");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M8.33331 21.6654V18.332H31.6666V21.6654H8.33331Z"
                  fill="#9E32A4"
                />
              </svg>
            </button>
          ) : (
            <button className={styles.btn} onClick={() => {}}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M18.75 21.2512H9.16669V18.7513H18.75V9.16797H21.2499V18.7513H30.8333V21.2512H21.2499V30.8346H18.75V21.2512Z"
                  fill="#9E32A4"
                />
              </svg>{" "}
            </button>
          )}
        </div>
        <div
          className={`${
            faq.open
              ? `${styles.show} ${styles.faqAnswer}`
              : `${styles.hide} ${styles.faqAnswer} ${styles.none}`
          }`}
        >
          <motion.p
            variants={textAnimationVaraint}
            initial="hidden"
            animate={faq.open ? "visible" : "hidden"}
            transition={{ duration: 0.6 }}
            className={`${lang === "ar" && "arabic"}`}
          >
            {faq.answer}
          </motion.p>
        </div>
      </motion.div>
    </>
  );
};

export default FAQ;
