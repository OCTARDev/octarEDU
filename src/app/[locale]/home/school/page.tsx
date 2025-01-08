import React from "react";
import Header from "./components/about";
import SchoolBenefits from "./components/ourSchoolPlans";
import Email from "../contact-us/components/email";
import Plans from "./components/plans";
import Benefits from "./components/benefits";
import ComingSoon from "@/shared/comingSoong";

const Individual = () => {
  return (
    <div>
      {/* <Header />
      <SchoolBenefits />
      <Plans />
      <Benefits />
      <Email /> */}
      <ComingSoon />
    </div>
  );
};

export default Individual;
