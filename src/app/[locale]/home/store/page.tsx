import React from "react";
import Categories from "./components/mainCategories";
import Header from "./components/header";
import ComingSoon from "@/shared/comingSoong";

const page = () => {
  return (
    <div>
      <Header />
      <Categories />
      {/* <ComingSoon /> */}
    </div>
  );
};

export default page;
