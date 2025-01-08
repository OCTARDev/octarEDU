"use client";
import React from "react";
import styles from "./style.module.scss";
import img from "../../../../../../assets/individual/parents.webp";
import {
  arBenefitsKids,
  arBenefitsParents,
  // benefitsKids,
  // benefitsParents,
  // benefitsSchools,
  // benefitsStudents,
  // benefitsTeachers,
  enBenefitsKids,
  enBenefitsParents,
} from "@/app/[locale]/home/individual/components/benefits/data";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
const Footer = ({ ip }: any) => {
  const [value, setValue] = React.useState<string>("parents");
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const t = useTranslations("dashboardSubscription");
  //console.log("lang", lang);
  const handleChange = (event: any) => {
    // //console.log("Value", event.target.value);
    setValue(event.target.value);
  };
  let arr: any = [];
  if (value === "parents") {
    arr = lang === "ar" ? arBenefitsParents : enBenefitsParents;
    arr = lang === "ar" ? [...arBenefitsParents] : [...enBenefitsParents];
  }

  if (value === "kids") {
    arr = lang === "ar" ? arBenefitsKids : enBenefitsKids;
    arr = lang === "ar" ? [...arBenefitsKids] : [...enBenefitsKids];
  }
  return (
    <div>
      <div className={styles.benefitsContainer}>
        <h1>{t("benefits")}</h1>
        <div className={styles.hero}>
          <div>
            {/* <button
              value="Schools"
              onClick={handleChange}
              className={value === "Schools" ? `${styles.active}` : ""}
            >
              Schools
            </button> */}
            <button
              value="parents"
              onClick={handleChange}
              className={value === "parents" ? `${styles.active}` : ""}
            >
              {t("parents")}
            </button>
            {/* <button
              value="Teachers"
              onClick={handleChange}
              className={value === "Teachers" ? `${styles.active}` : ""}
            >
              Teachers
            </button> */}

            {/* <button
              value="Students"
              onClick={handleChange}
              className={value === "Students" ? `${styles.active}` : ""}
            >
              Students
            </button> */}
            <button
              value="kids"
              onClick={handleChange}
              className={value === "kids" ? `${styles.active}` : ""}
            >
              {t("kids")}
            </button>
          </div>
          <div className={styles.benefitsImage}>
            <div>
              <ul>
                {arr?.map((item: any, index: number) => {
                  return (
                    <li key={item?.id}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                          fill="black"
                        />
                      </svg>

                      <p>
                        <span>{item?.title}:</span> {item?.content}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className={styles.img}>
              <Image
                src={img}
                alt="parents"
                width={400}
                style={{ maxWidth: "100%", height: "auto" }}
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
