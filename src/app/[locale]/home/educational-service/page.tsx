import React from "react";
import Header from "./components/Header";
import Email from "../contact-us/components/email";
import EducationsNav from "./components/nav";
import Hero from "./components/hero";

const EducationalService = () => {
  return (
    <div>
      <Header />
      <EducationsNav />
      {/* <Hero /> */}
      <Email />
    </div>
  );
};

export default EducationalService;
