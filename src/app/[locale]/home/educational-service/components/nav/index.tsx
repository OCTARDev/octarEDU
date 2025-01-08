"use client";
import React from "react";
import styles from "./style.module.scss";
import {
  aRColoringBooks,
  aRColoringBooksAR,
  aRColoringEnvironment,
  aRColoringEnvironmentAR,
  aRColoringStories,
  aRColoringStoriesAR,
  octarColoring,
  octarColoringAR,
} from "./data";
import Hero from "../hero";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
const EducationsNav = () => {
  const [value, setValue] = React.useState<string>("OCTAR Coloring");
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const t = useTranslations("EducationalPage.filter");
  const handleChange = (event: any) => {
    //console.log("Value", event.target.value);
    setValue(event.target.value);
  };
  let obj: any;
  if (value === "OCTAR Coloring") {
    obj = isArabic ? octarColoringAR : octarColoring;
    //console.log("OCTAR Coloring true");
  }
  if (value === "AR Coloring Books") {
    obj = isArabic ? aRColoringBooksAR : aRColoringBooks;
  }
  if (value === "AR Coloring Stories") {
    obj = isArabic ? aRColoringStoriesAR : aRColoringStories;
  }
  if (value === "AR Coloring Environment") {
    obj = isArabic ? aRColoringEnvironmentAR : aRColoringEnvironment;
  }

  return (
    <>
      <div className={`${styles.hero} ${isArabic && "arabic"}`}>
        <div>
          <button
            value="OCTAR Coloring"
            onClick={handleChange}
            className={value === "OCTAR Coloring" ? `${styles.active}` : ""}
          >
            {t("coloring")}
          </button>
          <button
            value="AR Coloring Books"
            onClick={handleChange}
            className={value === "AR Coloring Books" ? `${styles.active}` : ""}
          >
            {t("books")}
          </button>
          <button
            value="AR Coloring Stories"
            onClick={handleChange}
            className={
              value === "AR Coloring Stories" ? `${styles.active}` : ""
            }
          >
            {t("stories")}
          </button>

          <button
            value="AR Coloring Environment"
            onClick={handleChange}
            className={
              value === "AR Coloring Environment" ? `${styles.active}` : ""
            }
          >
            {t("enviroment")}
          </button>
        </div>
      </div>
      <Hero obj={obj} isArabic={isArabic} />
    </>
  );
};

export default EducationsNav;
