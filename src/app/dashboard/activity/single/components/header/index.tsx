"use client";
import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import axios from "axios";

const Header = ({ data }: any) => {
  //console.log("data?.data?.file_pdf", data?.data);
  const handleDownload = () => {
    // Replace 'pdf_link_here' with the actual link to your PDF file
    const pdfLink = `${data?.data?.file_pdf}`;

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = pdfLink;
    link.target = "_blank";
    link.download = "downloaded_file.pdf"; // Specify the filename for the downloaded file
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
  };
  //console.log("data", data?.data);
  return (
    <div>
      <Link href={"/dashboard/activity"}>
        <div className={styles.firstDiv}>
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
          <p>View all categories</p>
        </div>
      </Link>
      <div className={styles.secondDiv}>
        <div>
          <h1>Available items in {data?.data?.category_name} category</h1>
          <p>
            {/* Lorem ipsum dolor sit amet consectetur. Tristique ipsum purus odio
            fames viverra turpis. Eget malesuada vestibulum habitasse in nullam
            pellentesque. Eget aliquam eros tristique augue sem gravida eget. */}
          </p>
        </div>
        <div>
          <a
            href={data?.data?.file_pdf ? data?.data?.file_pdf : ""}
            target="_blank"
          >
            <button>Download items</button>
          </a>
          {/* <button onClick={handleDownload}>Download PDF</button> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
