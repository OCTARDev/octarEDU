import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import img from "../../../../../assets/swordGuy.png";
import { useTranslations } from "next-intl";
const OurVision = () => {
  const t = useTranslations("AboutPage");
  return (
    <div>
      <div className={styles.visionContainer}>
        <div className={styles.hero}>
          <h1>Our vision</h1>
          <p className="whitespace-pre-line">
            Our vision is to be a global leader in educational technology,
            driving innovation in AR-based learning solutions. We envision a
            world where education is not confined to textbooks and classrooms
            but extends to the limitless possibilities of imagination, where
            every child can access high-quality, engaging educational content
            that sparks a lifelong love for learning.
          </p>
          <Image src={img} alt="sword"></Image>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
