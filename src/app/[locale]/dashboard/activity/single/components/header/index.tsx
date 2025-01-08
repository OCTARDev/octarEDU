"use client";
import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import axios from "axios";
import { useTranslations } from "next-intl";

const Header = ({ data, lang }: any) => {
  const t = useTranslations("dashboardTarget");

  return (
    <div>
      <Link href={`/${lang}/dashboard/activity`}>
        <div className={styles.firstDiv}>
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
            />
          </svg>
          <p>{t("vewAllCategories")}</p>
        </div>
      </Link>
      <div className={`$styles.secondDiv`}>
        <div>
          <h1>
            {/* {data?.data?.title} {t("activity")} */}
            {t("activity")} {data?.data?.title}
          </h1>
          <p>
            {/* Lorem ipsum dolor sit amet consectetur. Tristique ipsum purus odio
            fames viverra turpis. Eget malesuada vestibulum habitasse in nullam
            pellentesque. Eget aliquam eros tristique augue sem gravida eget. */}
          </p>
        </div>
        {/* <div>
          <a
            href={
              data?.data?.media_pdf?.file_path
                ? data?.data?.media_pdf?.file_path
                : ""
            }
            target="_blank"
          >
            <button>{t("download")}</button>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
