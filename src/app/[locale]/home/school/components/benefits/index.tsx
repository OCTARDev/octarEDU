"use client";
import React from "react";
import styles from "./style.module.scss";
import Email from "@/app/[locale]/home/contact-us/components/email";
import {
  enBenefitsKids,
  enBenefitsParents,
  enBenefitsSchools,
  enBenefitsStudents,
  enBenefitsTeachers,
} from "@/app/[locale]/home/individual/components/benefits/data";
const Benefits = () => {
  const [value, setValue] = React.useState<string>("Schools");
  const handleChange = (event: any) => {
    //console.log("Value", event.target.value);
    setValue(event.target.value);
  };
  let arr: any = [];
  if (value === "parents") {
    arr = enBenefitsParents;
    arr = [...enBenefitsParents];
  }
  if (value === "Schools") {
    arr = enBenefitsSchools;
    arr = [...enBenefitsSchools];
  }
  if (value === "Teachers") {
    arr = enBenefitsTeachers;
    arr = [...enBenefitsTeachers];
  }
  if (value === "Students") {
    arr = enBenefitsStudents;
    arr = [...enBenefitsStudents];
  }
  if (value === "kids") {
    arr = enBenefitsKids;
    arr = [...enBenefitsKids];
  }
  return (
    <>
      <div className={styles.benefitsContainer}>
        <h1>Benefits for</h1>
        <div className={styles.hero}>
          <div>
            <button
              value="Schools"
              onClick={handleChange}
              className={value === "Schools" ? `${styles.active}` : ""}
            >
              Schools
            </button>
            {/* <button
              value="parents"
              onClick={handleChange}
              className={value === "parents" ? `${styles.active}` : ""}
            >
              Parents
            </button> */}
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
            {/* <button
              value="kids"
              onClick={handleChange}
              className={value === "kids" ? `${styles.active}` : ""}
            >
              Kids
            </button> */}
          </div>
          <div>
            <ul>
              {arr?.map((item: any, index: number) => {
                return (
                  <li key={item?.id}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                        fill="black"
                      />
                    </svg>

                    <p>
                      <span>{item?.title}:</span> {item?.content}
                    </p>
                  </li>
                );
              })}
              {/* <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                    fill="black"
                  />
                </svg>

                <p>
                  <span> Enhanced Learning Experience:</span> OCTAR transforms
                  traditional lessons into immersive, 3D experiences, making
                  learning more engaging and effective.
                </p>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                    fill="black"
                  />
                </svg>

                <p>
                  <span> Enhanced Learning Experience:</span> OCTAR transforms
                  traditional lessons into immersive, 3D experiences, making
                  learning more engaging and effective.
                </p>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                    fill="black"
                  />
                </svg>

                <p>
                  <span> Enhanced Learning Experience:</span> OCTAR transforms
                  traditional lessons into immersive, 3D experiences, making
                  learning more engaging and effective.
                </p>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                    fill="black"
                  />
                </svg>

                <p>
                  <span> Enhanced Learning Experience:</span> OCTAR transforms
                  traditional lessons into immersive, 3D experiences, making
                  learning more engaging and effective.
                </p>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                    fill="black"
                  />
                </svg>

                <p>
                  <span> Enhanced Learning Experience:</span> OCTAR transforms
                  traditional lessons into immersive, 3D experiences, making
                  learning more engaging and effective.
                </p>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefits;
