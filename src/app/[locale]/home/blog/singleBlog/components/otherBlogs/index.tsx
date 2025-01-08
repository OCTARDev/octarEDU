"use clinet";
import React from "react";
import styles from "./style.module.scss";
import { Grid } from "@mui/material";
import NewSignleBlog from "../../../components/newSingleBlog";
import { blogsArr } from "../../../components/data";
import Link from "next/link";
import { fetchBlogPage } from "@/lib";
import { useTranslations } from "next-intl";
import { useGetBlogsQuery } from "@/redux/rtk/homePage";
import Loader from "@/components/loader";
const OtherBlogs = async ({ isArabic, lang }: any) => {
  // const data = await fetchBlogPage(lang);
  const { data, isLoading } = useGetBlogsQuery(lang);
  const allBlogs: any = data?.data?.data;
  //console.log("allBlogs", allBlogs);
  const t = useTranslations("blogs");
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={styles.otherBlogsContainer}>
      <Grid
        container
        columns={12}
        flexShrink={0}
        alignItems={"flex-start"}
        spacing={1}
      >
        <h3>{t("other")}</h3>
        {/* {blogsArr?.map((blog) => {
          return (
            <Grid item xs={12} md={12} lg={12} sm={6} key={blog?.id}>
              <Link
                href={{
                  pathname: "/home/blog/singleBlog",
                  query: { id: `${blog?.id}` },
                }}
              >
                <NewSignleBlog data={blog} />
              </Link>
            </Grid>
          );
        })} */}
        {allBlogs?.map((blog: any) => {
          return (
            <Grid item xs={12} md={12} lg={12} sm={6} key={blog?.id}>
              <Link
                href={{
                  pathname: `/${lang}/home/blog/singleBlog`,
                  query: { id: `${blog?.id}` },
                }}
              >
                <NewSignleBlog data={blog} />
              </Link>
            </Grid>
          );
        })}
        {/* <Grid item xs={12} md={12} lg={12} sm={6}>
          {" "}
          <div className={styles.singleDiv}>
            <h1>
              {` Press: Osso VR Unveils its "Any Specialty, Anytime, Anywhere"
              Campaign, Showcasing Comprehensive Surgical Training Across
              Specialties`}
            </h1>
            <div className={styles.photo}>
              <div></div>
              <p>Stephanie Fraser</p>
            </div>
            <p className={styles.date}>September 21, 2022</p>
          </div>
        </Grid> */}
      </Grid>
    </div>
  );
};

export default OtherBlogs;
