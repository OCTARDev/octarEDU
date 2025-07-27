"use client";
import React from "react";
import styles from "./style.module.scss";
import AnimatedTextWord from "@/animation/animatingText";
import { mainUrl } from "@/lib";
import CategoriesProducts from "../categoriesProducts";
import Loader from "@/components/loader";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
const isAuthenticated = () => {
  try {
    if (typeof window !== "undefined") {
      const userData: any = localStorage.getItem("octar");
      return JSON.parse(userData);
    }
  } catch (e) {
    //console.log("Error", e);
  }
};
type auth = {
  token?: string;
};
const Available = () => {
  const [word, setWords] = React.useState("");
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const useData: auth = isAuthenticated();

  const token: any = useData?.token || "";

  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  let lang = pathname.split("/")[1];
  const t = useTranslations("categoriesPage");
  return (
    <div>
      <div className={`${styles?.aboutContainer} ${isArabic && "arabic"}`}>
        <div className={styles.content}>
          <div>
            <div className={styles.shape}>
              <AnimatedTextWord>
                <h1>{t("availableCategories")}</h1>
              </AnimatedTextWord>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="222"
                height="97"
                viewBox="0 0 222 97"
                fill="none"
                className={`${isArabic && "svgArabic"}`}
              >
                <g opacity="0.2">
                  <path
                    d="M220.339 23.4271C203.108 21.8481 184.235 21.074 163.606 21.3949C107.384 22.2646 52.7428 35.4215 4.42856 53.2913C19.3534 29.4313 71.7704 6.89287 127.623 1.31582C176.312 -3.54347 212.771 5.98282 220.339 23.4271Z"
                    fill="url(#paint0_linear_420_11133)"
                  />
                  <path
                    d="M220.513 37.3986C211.336 63.3586 154.886 89.2981 94.407 95.3374C33.9277 101.377 -7.66144 85.2148 1.49342 59.2608C2.19035 57.2718 3.17584 55.2761 4.42856 53.2913C52.7428 35.4215 107.384 22.2646 163.606 21.3949C184.235 21.074 203.108 21.8481 220.339 23.4271C222.17 27.6486 222.293 32.3395 220.513 37.3986Z"
                    fill="url(#paint1_linear_420_11133)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_420_11133"
                    x1="-9"
                    y1="34.0996"
                    x2="90.6114"
                    y2="167.444"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4E5AE2" />
                    <stop offset="0.541667" stopColor="#9E32A4" />
                    <stop offset="1" stopColor="#D552D8" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_420_11133"
                    x1="-9"
                    y1="34.0996"
                    x2="90.6114"
                    y2="167.444"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#4E5AE2" />
                    <stop offset="0.541667" stopColor="#9E32A4" />
                    <stop offset="1" stopColor="#D552D8" />
                  </linearGradient>
                </defs>
              </svg>
              {/* <input
                placeholder="category search"
                type="search"
                onChange={(e) => {
                  setWords(e.target.value);
                }}
              />
              {loading ? "Loading...." : ""} */}
            </div>
          </div>
          <div>
            <p>{t("des")}</p>
          </div>
        </div>
      </div>
      <CategoriesProducts lang={lang} />
    </div>
  );
};

export default Available;
