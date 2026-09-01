"use client";
import React from "react";
import styles from "./style.module.scss";
import img from "../../../../../assets/Rectangle 11.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { Grid } from "@mui/material";
import useInViewAnimation from "@/animation/useScroll";
import { motion } from "framer-motion";
import {
  downContainerVariant,
  leftContainerVariant,
  rightContainerVariant,
  upContainerVariant,
} from "@/animation";
import img1 from "../../../../../../assets/compressed/about us.png";
// import img2 from "../../../../../../assets/compressed/Rectangle 38.webp";
import { useTranslations } from "next-intl";
// import img3 from "../../../../../assets/History/3.webp";
// import img4 from "../../../../../assets/History/4.webp";
// import img5 from "../../../../../assets/History/5.webp";
// import img6 from "../../../../../assets/History/6.webp";
const OurHistory = ({ isArabic }: { isArabic: boolean }) => {
  const { ref, controls } = useInViewAnimation();
  const { ref: refTwo, controls: controlsTwo } = useInViewAnimation();
  const { ref: refThree, controls: controlsThree } = useInViewAnimation();
  const { ref: refFour, controls: controlsFour } = useInViewAnimation();

  const images: any = [
    {
      img: img1,
    }
  ];
  const t = useTranslations("AboutPage");
  return (
    <div className={styles.historyContainer}>
      <Grid
        container
        columns={12}
        spacing={5}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Grid item xs={12} md={6} order={{ sm: 2, lg: 1, md: 1 }}>
          <motion.div
            variants={leftContainerVariant}
            initial="hidden"
            ref={ref}
            animate={controls}
            className={styles.leftSide}
            transition={{ when: "beforeChildren" }}
          >
            <motion.h1
              variants={upContainerVariant}
              initial="hidden"
              animate={controlsThree}
              ref={refThree}
              transition={{ delay: 0.5 }}
            >
              {t("aboutUS")}
            </motion.h1>
            <motion.p
              variants={downContainerVariant}
              initial="hidden"
              animate={controlsFour}
              ref={refFour}
              transition={{ delay: 0.5 }}
              className="whitespace-pre-line"
            >
              {t("historyDes")}
            </motion.p>
          </motion.div>
        </Grid>
        <Grid item xs={12} md={6} order={{ sm: 1, lg: 2, md: 2 }}>
          <motion.div
            className={styles.rightSide}
            variants={rightContainerVariant}
            initial="hidden"
            ref={refTwo}
            animate={controlsTwo}
          >
            <Swiper
              slidesPerView={1}
              // spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: "#main-slider__swiper-button-next",
                prevEl: " #main-slider__swiper-button-prev",
              }}
              modules={[Navigation, Pagination, Autoplay]}
              className="mySwiper"
            >
              {images?.map((e: any, i: number) => {
                return (
                  <SwiperSlide key={i}>
                    <Image
                      src={e?.img}
                      alt="slider"
                      className={styles.img}
                    ></Image>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
        </Grid>
      </Grid>
    </div>
  );
};

export default OurHistory;
