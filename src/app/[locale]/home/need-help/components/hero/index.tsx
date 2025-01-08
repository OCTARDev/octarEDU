"use client";
import React, { useEffect } from "react";
import styles from "./style.module.scss";
import FAQ from "../Faq/index";
import TuneIcon from "@mui/icons-material/Tune";
import Link from "next/link";
import {
  nurseriesFAQ,
  nurseriesFAQAR,
  parentsFAQs,
  parentsFAQsAR,
  schoolFAQs,
  schoolFAQsAR,
} from "./static arr/staticArr";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
const Hero = ({ res }: any) => {
  let why = [
    {
      question: "Strategic Excellence",
      answer:
        "Our team doesn't just execute; we strategize. Our meticulous planning ensures your efforts are aligned with your business goals for maximum impact.",
      open: true,
    },
    {
      question: "Tailored Approach",
      answer:
        "We don't believe in one-size-fits-all. Every solution is custom crafted to fit your unique needs, ensuring a precise fit for your brand.",
      open: false,
    },
    {
      question: "Data-Backed Decisions",
      answer:
        "Our strategies are rooted in data insights, translating into well-informed decisions that lead to measurable results",
      open: false,
    },
    {
      question: "Creative Brilliance",
      answer:
        "Our blend of creativity and innovation generates standout solutions that resonate with modern audiences.",
      open: false,
    },
    {
      question: "Collaborative Partnership",
      answer:
        "We're not just service providers; we're partners invested in your success, working together to achieve your vision",
      open: false,
    },
    {
      question: "Industry Expertise",
      answer:
        "With a diverse team of specialists, we bring a wealth of industry knowledge to the table, ensuring your strategies are informed and effective.",
      open: false,
    },
    {
      question: "Proven Track Record",
      answer:
        "Our past successes are a testament to our capabilities. We've consistently delivered tangible results that make a difference",
      open: false,
    },
    {
      question: "Customer-Centric Focus",
      answer:
        "Your satisfaction is our priority. We listen, adapt, and evolve our strategies based on your feedback and evolving needs.",
      open: false,
    },
  ];
  var arr: any = [];
  const [faqs, setFaqs] = React.useState<any>(arr);
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const fullLink = pathname.split("/");
  let firstLink = fullLink[1];
  const toggleFAQ = (index: number) => {
    setFaqs(
      faqs.map((faq: any, i: number) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };
  const [value, setValue] = React.useState<string>("Nurseries");
  const handleChange = (event: any) => {
    //console.log("Valueeeeeeeeeeeeeeee", event.target.value);
    setValue(event.target.value);
  };

  useEffect(() => {
    if (value === "Nurseries") {
      setFaqs(isArabic ? nurseriesFAQAR : nurseriesFAQ);
    }
    if (value === "Schools") {
      setFaqs(isArabic ? schoolFAQsAR : schoolFAQs);
    }
    if (value === "Parents") {
      setFaqs(isArabic ? parentsFAQsAR : parentsFAQs);
    }
  }, [value]);
  const t = useTranslations("faqs");
  //console.log("arr", arr);
  //console.log("faqs", faqs);

  return (
    <div className={`${styles.faqContainer} ${isArabic && "arabic"}`}>
      <div className={styles?.first}>
        <h1>{t("how")}</h1>
        <h4>{t("explore")}</h4>
      </div>
      <div className={styles.NewSectionContainer}>
        {res?.data?.map((e: any, i: number) => {
          return (
            <Link
              href={{
                pathname: `/${firstLink}/home/need-help/singleNeedHelp`,
                query: { id: `${e?.id}` },
              }}
              key={e?.id}
            >
              <div className={styles.singleDiv}>
                <div className="icon">
                  <Image
                    src={e?.media?.file_path}
                    alt="icon"
                    width={24}
                    height={24}
                  ></Image>
                </div>
                <div>
                  <p>{e?.title}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <div className={styles.benefitsContainer}>
        <h2>{t("name")}</h2>

        <div className={styles.hero}>
          <div>
            <button
              value="Nurseries"
              onClick={handleChange}
              className={value === "Nurseries" ? `${styles.active}` : ""}
            >
              {t("filter.nurseries")}
            </button>
            <button
              value="Schools"
              onClick={handleChange}
              className={value === "Schools" ? `${styles.active}` : ""}
            >
              {t("filter.schools")}
            </button>
            <button
              value="Parents"
              onClick={handleChange}
              className={value === "Parents" ? `${styles.active}` : ""}
            >
              {t("filter.parents")}
            </button>
          </div>
          <div>
            <ul>
              {arr?.map((item: any, index: number) => {
                return <></>;
              })}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <div className={styles.faqs}>
          {faqs.map((faq: any, index: number) => (
            <FAQ
              faq={faq}
              index={index}
              key={index}
              toggleFAQ={toggleFAQ}
              lang={firstLink}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
