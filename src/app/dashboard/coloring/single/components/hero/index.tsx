import React, { useLayoutEffect } from "react";
import styles from "./style.module.scss";
import brain from "../../../../../../assets/dashboard/brain.png";
import Image from "next/image";
import { mainUrl } from "@/lib";

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
const Hero = ({ data }: any) => {
  //console.log("Data", data);
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
              <a href={e?.sound_file} target="_blank">
                <button>Sound pdf</button>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
