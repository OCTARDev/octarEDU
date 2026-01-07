import React, { useEffect, useState } from "react";
import Header from "./components/about";
import Plans from "./components/plans";
import Benefits from "./components/benefits";


const Individual = async () => {
  return (
    <div>
      <Header />
      <Plans />
      <Benefits />
    </div>
  );
};

export default Individual;
