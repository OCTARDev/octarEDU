"use client";
import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import AnimatedTextCharacter from "@/animation/animatingTextChars";
import { motion } from "framer-motion";
import useInViewAnimation from "@/animation/useScroll";
import { leftContainerVariant } from "@/animation";
import OrgansDetails from "../organsDetails";
import { mainUrl } from "@/lib";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import AnimatedTextWord from "@/animation/animatingText";
import { useTranslations } from "next-intl";
const Organs = () => {
  const { ref, controls } = useInViewAnimation();
  const [word, setWords] = React.useState("");
  const [data, setData] = React.useState<any>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lastPathName = pathname.split("/");
  let firstLink = lastPathName[1];
  const header = {
    "X-App-Locale": firstLink,
  };
  React.useLayoutEffect(() => {
    const fetchApi = async () => {
      await setLoading(true);
      const data = await fetch(`${mainUrl}/category-page/show-targets/${id}`, {
        headers: header,
      })
        .then((response) => {
          setLoading(false);
          return response.json();
        })
        .catch((e) => {
          //console.log("EEEEEEEEEEEEEEEE", e);
          setLoading(false);
        });
      setData(data);
    };
    const delayDebounceFn = setTimeout(() => {
      fetchApi();
    }, 550);

    return () => clearTimeout(delayDebounceFn);
  }, [word]);

  const t = useTranslations("categoriesPage");
  return (
    <div>
      <div className={`${styles?.aboutContainer} ${isArabic && "arabic"}`}>
        <motion.div
          className={styles.content}
          variants={leftContainerVariant}
          ref={ref}
          animate={controls}
          initial="hidden"
          transition={{ duration: 0.5, when: "beforeChildren" }}
        >
          <div>
            <Link href={`/${firstLink}/home/categories`}>
              <button className={styles.btnBack}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 18L3 12L9 6L10.4 7.4L6.8 11H21V13H6.8L10.4 16.6L9 18Z"
                    fill="black"
                  />
                </svg>
                {t("back")}
              </button>
            </Link>
            <div className={styles.shape}>
              {/* <AnimatedTextWord ref={refTwo} controls={controls}> */}
              <h1>{data?.data?.title}</h1>
              {/* </AnimatedTextWord> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="222"
                height="97"
                viewBox="0 0 222 97"
                fill="none"
              >
                <g opacity="0.2">
                  <path
                    d="M220.339 23.4271C203.108 21.8481 184.235 21.074 163.606 21.3949C107.384 22.2646 52.7428 35.4215 4.42856 53.2913C19.3534 29.4313 71.7704 6.89287 127.623 1.31582C176.312 -3.54347 212.771 5.98282 220.339 23.4271Z"
                    fill="url(#paint0_linear_420_11519)"
                  />
                  <path
                    d="M220.513 37.3986C211.336 63.3586 154.886 89.2981 94.407 95.3374C33.9277 101.377 -7.66144 85.2148 1.49342 59.2608C2.19035 57.2718 3.17584 55.2761 4.42856 53.2913C52.7428 35.4215 107.384 22.2646 163.606 21.3949C184.235 21.074 203.108 21.8481 220.339 23.4271C222.17 27.6486 222.293 32.3395 220.513 37.3986Z"
                    fill="url(#paint1_linear_420_11519)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_420_11519"
                    x1="-9"
                    y1="34.0996"
                    x2="90.6114"
                    y2="167.444"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#4E5AE2" />
                    <stop offset="0.541667" stop-color="#9E32A4" />
                    <stop offset="1" stop-color="#D552D8" />
                  </linearGradient>
                  <linearGradient
                    id="paint1_linear_420_11519"
                    x1="-9"
                    y1="34.0996"
                    x2="90.6114"
                    y2="167.444"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#4E5AE2" />
                    <stop offset="0.541667" stop-color="#9E32A4" />
                    <stop offset="1" stop-color="#D552D8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div>
            <p>
              {data?.data?.targets_description}
              {/* {`Lorem ipsum dolor sit amet consectetur. Tristique ipsum purus odio fames viverra turpis. Eget malesuada vestibulum habitasse in nullam pellentesque. Eget aliquam eros tristique augue sem gravida eget.`} */}
            </p>
          </div>
        </motion.div>
      </div>
      <OrgansDetails data={data} loading={loading} isArabic={isArabic} />
    </div>
  );
};

export default Organs;
