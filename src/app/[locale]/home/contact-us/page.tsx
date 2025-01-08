import React from "react";
import styles from "./style.module.scss";
import Header from "./components/header";
import Email from "./components/email";
import { fetchContactUsPage } from "@/lib";
const ContactUS = async () => {
  const res = await fetchContactUsPage();
  //console.log("res server contact us", res);
  return (
    <div>
      {/* <Header /> */}
      <Email />
    </div>
  );
};

export default ContactUS;
