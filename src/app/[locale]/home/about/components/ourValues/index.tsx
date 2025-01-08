import React from "react";
import styles from "./style.module.scss";
import { Grid } from "@mui/material";
import { firstArr, firstArrArabic, secondArr, secondArrArabic } from "./data";
import { useTranslations } from "next-intl";
const OurValues = ({ isArabic }: { isArabic: boolean }) => {
  const t = useTranslations("AboutPage");
  const firstArrmap = isArabic ? firstArrArabic : firstArr;
  const secondArrmap = isArabic ? secondArrArabic : secondArr;
  return (
    <div className={styles.ourValuesContainer}>
      <div className={styles.firstDiv}>
        <h1>{t("value")}</h1>
      </div>
      <div className={styles.secondDiv}>
        <Grid container columns={12} spacing={3}>
          {firstArrmap?.map((e: any, i) => {
            return (
              <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
                <div className={styles.singleDiv}>
                  <div>{e.icon}</div>
                  <p>{e.title}</p>
                  <p>{e.content}</p>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div className={styles.secondDiv}>
        <Grid container columns={12} spacing={3}>
          {secondArrmap?.map((e: any, i) => {
            return (
              <Grid item xs={12} sm={6} md={6} lg={3} key={i}>
                <div className={styles.singleDiv}>
                  <div>{e.icon}</div>
                  <p>{e.title}</p>
                  <p>{e.content}</p>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default OurValues;
