import React from "react";
import styles from "./style.module.scss";
import Image, { StaticImageData } from "next/image";
import img from "../../../../../assets/Mission/1.webp";
import { useTranslations } from "next-intl";

const NewSignleBlog = ({ data }: any) => {
  const t = useTranslations("blogs");
  return (
    <div>
      <article className={styles.container}>
        <div className={styles["post-image"]}>
          <Image
            src={data?.media?.file_path}
            alt="post image 1"
            width={"500"}
            height={"300"}
          />
        </div>
        <div className={styles["post-text"]}>
          {/* <span className={styles.date}>
            {new Date(data?.created_at)?.toLocaleDateString("en-GB", {
              timeZone: "UTC",
            })}
          </span> */}
          <h2>
            <a href="#">{data?.title}</a>
          </h2>
        </div>
        <div className={styles["post-info"]}>
          <div className={styles["post-by"]}>
            {t("post")} : <a href="#">{data?.author}</a>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewSignleBlog;
