"use client";
import React, { useEffect, useState } from "react";
import BlogHeader from "./components/header";
import BlogNav from "./components/nav";
import SingleBlog from "./components/singleBlog";
import styles from "./style.module.scss";
import { fetchBlogPage, mainUrl } from "@/lib";
import { useGetBlogsQuery } from "@/redux/rtk/homePage";
import { usePathname } from "next/navigation";
import Loader from "@/components/loader";
const Blog = async () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  let lang = pathname.split("/")[1];
  useEffect(() => {
    fetch(`${mainUrl}/blogs`, {
      headers: {
        "X-App-Locale": `${lang}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  // const { data, isLoading } = useGetBlogsQuery(lang);
  const allBlogs = data?.data?.data;
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={styles.blogContainer}>
      <BlogHeader isArabic={isArabic} />
      {/* <BlogNav /> */}
      <SingleBlog lang={lang} allBlogs={allBlogs} isArabic={isArabic} />
    </div>
  );
};

export default Blog;
