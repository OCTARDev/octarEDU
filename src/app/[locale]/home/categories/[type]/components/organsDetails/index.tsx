import React from "react";
import styles from "./style.module.scss";
import lungsImage from "../../../../../assets/organs/lungs.png";
import Image from "next/image";
import { Box, Grid, Skeleton } from "@mui/material";
import { useTranslations } from "next-intl";
const OrgansDetails = ({ data, loading, isArabic }: any) => {
  const t = useTranslations("categoriesPage");

  return (
    <div className={`${styles.container} ${isArabic && "arabic"}`}>
      <div>
        <div className={styles.secondDiv}>
          <div>
            <h1>{t("availableCategories")} </h1>
            <p>
              {/* Lorem ipsum dolor sit amet consectetur. Tristique ipsum purus odio
            fames viverra turpis. Eget malesuada vestibulum habitasse in nullam
            pellentesque. Eget aliquam eros tristique augue sem gravida eget. */}
            </p>
          </div>
          {/* <div>
            <a
              href={data?.data?.file_pdf ? data?.data?.file_pdf : ""}
              target="_blank"
            >
              <button>Download items</button>
            </a>
          </div> */}
        </div>
      </div>
      <div>
        <Grid
          container
          columns={12}
          spacing={2}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          {!loading
            ? data?.data?.targets.map((item: any) => {
                return (
                  <Grid item xs={12} sm={6} lg={3} py={3} key={item?.id}>
                    <div className={styles.singleDiv}>
                      <div className={styles.imageContainer}>
                        <Image
                          src={item?.target_file}
                          alt={item?.title}
                          //   layout="fill"
                          //   objectFit="contain"
                          width={1000}
                          height={1000}
                        ></Image>
                      </div>
                      <p>{item?.title}</p>
                      {/* <p>Organs</p>
              <button>View details</button> */}
                    </div>
                  </Grid>
                );
              })
            : [1, 2, 3, 4]?.map((e, index) => {
                return (
                  <Box sx={{ pt: "1rem" }} key={index}>
                    <Skeleton
                      width={300}
                      height={300}
                      sx={{
                        marginRight: "1rem",
                        marginTop: "0",
                        padding: "0",
                      }}
                      variant="rectangular"
                    >
                      <Skeleton
                        width={"40%"}
                        height={20}
                        sx={{
                          marginRight: "1rem",
                          marginTop: "1rem",
                          padding: "0",
                        }}
                        variant="rectangular"
                      />
                    </Skeleton>
                  </Box>
                );
              })}
        </Grid>
      </div>
    </div>
  );
};

export default OrgansDetails;
