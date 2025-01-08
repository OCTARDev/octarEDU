"use client";
import React from "react";
import styles from "./style.module.scss";
const BlogNav = () => {
  const [value, setValue] = React.useState<string>("Schools");
  const handleChange = (event: any) => {
    //console.log("Value", event.target.value);
    setValue(event.target.value);
  };
  return (
    <div>
      <div className={styles.hero}>
        <div>
          <button
            value="All articles"
            onClick={handleChange}
            className={value === "All articles" ? `${styles.active}` : ""}
          >
            All articles
          </button>
          <button
            value="parents"
            onClick={handleChange}
            className={value === "parents" ? `${styles.active}` : ""}
          >
            Parents
          </button>
          <button
            value="Teachers"
            onClick={handleChange}
            className={value === "Teachers" ? `${styles.active}` : ""}
          >
            Teachers
          </button>

          <button
            value="Students"
            onClick={handleChange}
            className={value === "Students" ? `${styles.active}` : ""}
          >
            Students
          </button>
          <button
            value="kids"
            onClick={handleChange}
            className={value === "kids" ? `${styles.active}` : ""}
          >
            Kids
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogNav;
