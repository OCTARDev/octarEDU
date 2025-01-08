import React from "react";
import styles from "./style.module.scss";
import { Grid } from "@mui/material";
import Link from "next/link";
import NewSignleBlog from "../newSingleBlog";
import { blogsArr } from "../data";
const SingleBlog = ({ allBlogs, lang, isArabic }: any) => {
  //console.log("allBlogs", allBlogs);
  return (
    <div>
      <div className={`${styles.blogContanier} ${isArabic && "arabic"}`}>
        <Grid
          container
          columns={12}
          flexShrink={0}
          alignItems={"flex-start"}
          spacing={5}
        >
          {/* <Grid item xs={12} md={6} lg={4}>
            {" "}
            <Link
              href={{
                pathname: "/home/blog/singleBlog",
                query: { id: `1` },
              }}
            >
              <div className={styles.singleDiv}>
                <h1>
                  Press: Research Continues to Support the Benefits of Osso VR
                  for Surgical Training
                </h1>
                <div className={styles.photo}>
                  <div></div>
                  <p>Stephanie Fraser</p>
                </div>
                <p className={styles.date}>September 21, 2022</p>
              </div>
            </Link>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {" "}
            <div className={styles.singleDiv}>
              <h1>
                Press: Osso VR Doubles Company Footprint, Attracts Top Talent as
                Demand for Innovation in Surgical Training and Medical Education
                Soars
              </h1>
              <div className={styles.photo}>
                <div></div>
                <p>Stephanie Fraser</p>
              </div>
              <p className={styles.date}>September 21, 2022</p>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <div className={styles.singleDiv}>
              <h1>
                {`   Press: Osso VR Unveils its "Any Specialty, Anytime, Anywhere"
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
          {allBlogs?.map((blog: any) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={blog?.id}>
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
          {/* <Grid item xs={12} md={6} lg={4}>
            <Link
              href={{
                pathname: "/home/blog/singleBlog",
                query: { id: `1` },
              }}
            >
              <NewSignleBlog />
            </Link>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Link
              href={{
                pathname: "/home/blog/singleBlog",
                query: { id: `2` },
              }}
            >
              <NewSignleBlog />
            </Link>{" "}
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Link
              href={{
                pathname: "/home/blog/singleBlog",
                query: { id: `3` },
              }}
            >
              <NewSignleBlog />
            </Link>{" "}
          </Grid> */}
        </Grid>
      </div>
    </div>
  );
};

export default SingleBlog;
