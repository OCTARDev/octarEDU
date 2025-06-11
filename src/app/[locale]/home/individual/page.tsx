import React, { useEffect, useState } from "react";
import Header from "./components/about";
import Plans from "./components/plans";
import Benefits from "./components/benefits";
import Email from "../contact-us/components/email";


const Individual = async () => {
  return (
    <div>
      <Header />
      <Plans />
      <Benefits />
      <Email />
    </div>
  );
};

export default Individual;
