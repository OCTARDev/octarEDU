"use client";
import React from "react";
import FAQ from "../../../components/Faq";
import styles from "../../styles.module.scss";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Hero = ({ data, lang }: any) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const newFaqs = data?.data?.find((e: any) => e?.id === Number(id));
  const [faqs, setFaqs] = React.useState(newFaqs?.f_a_questions);
  const addOpenToArr = faqs?.map((e: any) => {
    return { ...e, open: false };
  });
  const toggleFAQ = (index: number) => {
    setFaqs(
      addOpenToArr.map((faq: any, i: number) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };
  const t = useTranslations("faqs");
  return (
    <div className={styles?.faqContainer}>
      <Link href={`/${lang}/home/need-help`}>
        <button className={styles.back}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 18L3 12L9 6L10.4 7.4L6.8 11H21V13H6.8L10.4 16.6L9 18Z"
              fill="black"
            ></path>
          </svg>
          {t("goBack")}
        </button>
      </Link>
      <h2>{newFaqs?.title}</h2>
      <div>
        <div className={styles.faqs}>
          {faqs.map((faq: any, index: number) => (
            <FAQ
              faq={faq}
              index={index}
              key={index}
              toggleFAQ={toggleFAQ}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
