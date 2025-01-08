"use client";
import React from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import img from "../../../../../assets/Rectangle 11.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
const Hero = ({ obj }: any) => {
  //console.log("obj", obj);
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lastPathName = pathname.split("/");
  let firstLink = lastPathName[1];
  const t = useTranslations("EducationalPage");
  console.log("obj", obj?.id);
  return (
    <div>
      <div className={`${styles.heroContainer} ${isArabic && "arabic"}`}>
        <div>
          <h1>{obj?.title}</h1>
          <h2>{obj?.contnet}</h2>
        </div>
        <div>
          <Link href={obj?.id === 1 ? `/${firstLink}/home/categories` : ""}>
            <button>{obj?.id === 1 ? t("view") : t("soon")}</button>
          </Link>
        </div>
        <div>
          <Image src={obj?.img1} alt="service" />
          <Image src={obj?.img2} alt="service" />
        </div>
        <div>
          <p>
            {/* Lorem ipsum dolor sit amet consectetur. Sed odio leo enim praesent.
            Vestibulum urna netus vitae parturient. Sapien purus et arcu
            pharetra maecenas nullam donec blandit amet. Dui magnis velit morbi
            leo vulputate lectus. Dictum metus et magna sit dolor urna a
            sagittis a. */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
