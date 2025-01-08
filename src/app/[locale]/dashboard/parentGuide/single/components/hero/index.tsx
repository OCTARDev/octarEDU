import React, { useLayoutEffect } from "react";
import styles from "./style.module.scss";
import brain from "../../../../../../assets/dashboard/brain.png";
import Image from "next/image";
import { mainUrl } from "@/lib";

const Hero = ({ data }: any) => {
  console.log("dataaaaaaaaa", data?.data);
  data?.data?.sub_parent_guides?.map((e: any) => {
    console.log("e", e?.media_file?.file_path);
  });
  return (
    <div>
      <div className={styles.secondDiv}>
        {data?.data?.sub_parent_guides?.map((e: any, i: number) => {
          return (
            <div className={styles.singleDiv} key={i}>
              <Image
                src={e?.media_cover?.file_path}
                alt={e?.title}
                width="1000"
                height="1000"
              ></Image>
              <p>{e?.title}</p>
              <a href={e?.media_file?.file_path} target="_blank">
                <button>PDF</button>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
