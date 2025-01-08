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
  //console.log("dataaaaaaaaa", data);
  return (
    <div>
      <div className={styles.secondDiv}>
        {data?.data?.sub_activates?.map((e: any, i: number) => {
          return (
            <div className={styles.singleDiv} key={i}>
              <Image
                src={e?.media_cover?.file_path}
                alt={e?.title}
                width="1000"
                height="1000"
              ></Image>
              <p>{e?.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
