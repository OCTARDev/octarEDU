"use client";
import React, { useEffect, useState } from "react";
import SingleBlogData from "./components/singleBlog";
import styles from "./style.module.scss";
import OtherBlogs from "./components/otherBlogs";
import { Grid } from "@mui/material";
import Link from "next/link";
import { fetchSingleBlog, mainUrl } from "@/lib";
import Loader from "@/components/loader";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const BlogData = () => {
  // //console.log("params", params);
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // //console.log("id", id);
  // const data = await fetchSingleBlog(id);
  // const res = await data;
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  let lang = pathname.split("/")[1];
  useEffect(() => {
    fetch(`${mainUrl}/blogs/show/${id}`, {
      headers: {
        "X-App-Locale": lang,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [id]);
  const t = useTranslations("blogs");
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={`${styles.dynamicBlogContainer} ${isArabic && "arabic"}`}>
      <div>
        <Link href={`/${lang}/home/blog`}>
          <button className={styles.nav}>
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

            <p> {t("allArticles")}</p>
          </button>
        </Link>
      </div>
      <Grid container columns={12} pt={5} spacing={4}>
        <Grid item xs={12} md={9}>
          <SingleBlogData id={id} data={data} />
        </Grid>
        <Grid item xs={12} md={3}>
          <OtherBlogs isArabic={isArabic} lang={lang} />
        </Grid>
      </Grid>
    </div>
  );
};

export default BlogData;
