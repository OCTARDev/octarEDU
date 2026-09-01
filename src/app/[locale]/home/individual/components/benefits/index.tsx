"use client";
import React from "react";
import styles from "./style.module.scss";
import Email from "@/app/[locale]/home/contact-us/components/email";
import {
  arBenefitsKids,
  arBenefitsParents,
  enBenefitsKids,
  enBenefitsParents,
} from "./data";
import { motion } from "framer-motion";
import { leftContainerVariant } from "@/animation";
import useInViewAnimationRepeat from "@/animation/useScrollRepeat";
import { navItem } from "@/components/slidingPane";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import useInViewAnimation from "@/animation/useScroll";
import Image from "next/image";
import img from "../../../../../../assets/individual/subscription.png";
const Benefits = () => {
  const { ref, controls } = useInViewAnimation();
  const [value, setValue] = React.useState<string>("parents");
  const handleChange = (event: any) => {
    //console.log("Valueeeeeeeeeeeeeeee", event.target.value);
    setValue(event.target.value);
  };
  const t = useTranslations("dashboardSubscription");
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  var arr: any = [];

  if (value === "parents") {
    arr = isArabic ? arBenefitsParents : enBenefitsParents;
    // arr = [...enBenefitsParents];
  }
  if (value === "kids") {
    arr = isArabic ? arBenefitsKids : enBenefitsKids;

    // arr = [...enBenefitsKids];
  }

  return (
    <>
      <div className={`${styles.benefitsContainer} ${isArabic && "arabic"}`}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1>{t("benefits")}</h1>
            <div>
              <button
                value="parents"
                onClick={handleChange}
                className={value === "parents" ? `${styles.active}` : ""}
              >
                {t("parents")}
              </button>
              <button
                value="kids"
                onClick={handleChange}
                className={value === "kids" ? `${styles.active}` : ""}
              >
                {t("kids")}
              </button>
            </div>
            <div>
              <ul>
                {arr?.map((item: any, index: number) => {
                  return (
                    <motion.li
                      ref={ref}
                      key={item?.id}
                      variants={navItem}
                      initial="hidden"
                      animate={controls}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                          fill="black"
                        />
                      </svg>

                      <p>
                        <span>{item?.title}:</span> {item?.content}
                      </p>
                    </motion.li>
                  );
                })}
                {/* <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                    fill="black"
                  />
                </svg>

                <p>
                  <span> Enhanced Learning Experience:</span> OCTAR transforms
                  traditional lessons into immersive, 3D experiences, making
                  learning more engaging and effective.
                </p>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                    fill="black"
                  />
                </svg>

                <p>
                  <span> Enhanced Learning Experience:</span> OCTAR transforms
                  traditional lessons into immersive, 3D experiences, making
                  learning more engaging and effective.
                </p>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                    fill="black"
                  />
                </svg>

                <p>
                  <span> Enhanced Learning Experience:</span> OCTAR transforms
                  traditional lessons into immersive, 3D experiences, making
                  learning more engaging and effective.
                </p>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                    fill="black"
                  />
                </svg>

                <p>
                  <span> Enhanced Learning Experience:</span> OCTAR transforms
                  traditional lessons into immersive, 3D experiences, making
                  learning more engaging and effective.
                </p>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                    fill="black"
                  />
                </svg>

                <p>
                  <span> Enhanced Learning Experience:</span> OCTAR transforms
                  traditional lessons into immersive, 3D experiences, making
                  learning more engaging and effective.
                </p>
              </li> */}
              </ul>
            </div>
          </div>
          <div>
            <Image
              src={img}
              alt="parents"
              width={600}
              style={{ maxWidth: "100%", height: "auto" }}
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefits;
