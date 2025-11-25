"use client";
import React from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useGetServiceCategoriesQuery } from "@/redux/rtk/services";
import Loader from "@/components/loader";
import Link from "next/link";
import Image from "next/image";

const EducationsNav = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const lastPathName = pathname.split("/");
  let firstLink = lastPathName[1];  
  const t = useTranslations("EducationalPage.filter");
  const {data,isLoading,} = useGetServiceCategoriesQuery(lang);
  const categories = data?.data?.categories;
  /* console.log(categories); */

  if (isLoading ) {
    return <Loader />;
  }
  return (
    <>
      <div className={`${isArabic && "arabic"} p-8`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {
            categories?.map((c:any,i:number)=>{
              return(
              <Link
                href={`/${firstLink}/home/educational-service/single/${c?.id}`}
                key={c.id}
                className="block border-2 bg-[#9e32a4]/20 hover:bg-[#9e32a4]/40 px-4 py-5 rounded-xl w-full h-auto flex-grow"
              >
                <div className="flex flex-col">
                    {
                      c.cover && 
                      <div>
                        <Image
                        src={c?.cover?.file_path}
                        alt="Puzzles"
                        width={120}
                        height={120}
                        priority
                        className=""
                        // loading="lazy"
                        layout="responsive"
                        />  
                      </div>
                    }
                  <p className="text-center font-bold text-lg">{c.title}</p>
                </div>
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
