"use client";
import React, { useLayoutEffect } from "react";
import styles from "./style.module.scss";
import brain from "../../../../../../assets/dashboard/brain.png";
import Image from "next/image";
import { mainUrl } from "@/lib";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";

const isAuthenticated = () => {
  try {
    if (typeof window !== "undefined") {
      const userData: any = localStorage.getItem("octar");
      return JSON.parse(userData);
    }
  } catch (e) {
    // //console.log("Error", e);
  }
};
type auth = {
  token?: string;
};
const Hero = ({ data, lang }: any) => {
  //console.log("Data", data);
  const t = useTranslations("dashboardTarget");

  const ids = [16, 17, 18, 19, 20, 21, 22, 23, 24, 28, 29, 30];
  const search = useSearchParams();
  const id = search.get("id");
  return (
    <div>
      <div className={styles.secondDiv}>
        {data?.data?.targets?.map((e: any, i: number) => {
          return (
            <div className={styles.singleDiv} key={i}>
              <Image
                src={e?.target_file}
                alt={e?.title}
                width="1000"
                height="1000"
              ></Image>
              <p>{e?.title}</p>
              {/* {ids.includes(Number(id)) ? (
                <></>
              ) : (
                <>
                  <a href={e?.sound_file} target="_blank">
                    <button>{t("pdfButton")}</button>
                  </a>
                </>
              )} */}
              <a href={e?.sound_file} target="_blank">
                <button>{t("pdfButton")}</button>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
