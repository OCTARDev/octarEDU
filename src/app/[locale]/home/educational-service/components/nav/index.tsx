"use client";
import React from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetServiceCategoriesQuery } from "@/redux/rtk/services";
import Loader from "@/components/loader";
import Link from "next/link";

const EducationsNav = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const lastPathName = pathname.split("/");
  let firstLink = lastPathName[1];  
  const t = useTranslations("EducationalPage.filter");
  const {data,isLoading,} = useGetServiceCategoriesQuery(lang);
  const categories = data?.data?.categories;
  console.log(categories);

  if (isLoading ) {
    return <Loader />;
  }
  return (
    <>
      <div className={`${styles.hero} ${isArabic && "arabic"}`}>
        <div className="flex justify-center">
          {
            categories?.map((c:any,i:number)=>{
              return(
              <Link
                key={i}
                href={`/${firstLink}/home/educational-service/single/${c?.id}`}
              >
                {c?.title}
              </Link>
              )
            })
          }
        </div>
      </div>
    </>
  );
};

export default EducationsNav;
