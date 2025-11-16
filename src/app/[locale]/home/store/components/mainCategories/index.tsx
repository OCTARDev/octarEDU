"use client";
import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";
import Loader from "@/components/loader";
import { useGetMaincategoriesQuery } from "@/redux/rtk/categories";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
interface Res {
  id: number;
  is_active: number;
  media: { id: number; file_path: string };
  title: string;
}
[];
const Categories = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const t = useTranslations("store");
  const { data, isLoading } = useGetMaincategoriesQuery(lang);
  const [loadedImages, setLoadedImages] = useState(0);

  // Calculate the total number of images from the data
  const totalImages = data?.data?.length || 0;

  // Check if all images are loaded
  const allImagesLoaded = loadedImages === totalImages;

  // Handler to update the number of loaded images
  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };
  const mapping = () => {
    return data?.data?.map((e: Res) => {
      return (
        <Link
          href={{
            pathname: "products",
            query: { single: `${e.id}` },
          }}
          key={e.id}
          className="w-full flex"
        >
          <div className={styles.categoryItem}>
            <Image
              src={e.media.file_path}
              alt="Puzzles"
              width={120}
              height={120}
              priority
              className="!w-full"
              // loading="lazy"
              layout="responsive"
              onLoadingComplete={handleImageLoad} // Track image load
            />
            <p>{e.title}</p>
          </div>
        </Link>
      );
    });
  };

  if (isLoading) return <Loader />;

  console.log("allImagesLoaded", allImagesLoaded);
  return (
    <div className={`${styles.categories} ${isArabic && "arabic"}`}>
      {/* <h2>{t("available")}</h2> */}
      {/* {!allImagesLoaded && <Loader />} */}
      <div className={styles.categoryList}>{mapping()}</div>
    </div>
  );
};

export default Categories;
