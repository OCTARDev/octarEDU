import React from "react";
import CategoryHero from "./components/categoryHero";
import Available from "./components/available";
import CategoriesProducts from "./components/categoriesProducts";
import SubscriptionCta from "./components/subscriptionCta";
import { fetchCategoryPage } from "@/lib";

const Catergories = async () => {
  // const res = await fetchCategoryPage();
  // //console.log("res categories server", res)Form SelectionForm Selection;
  return (
    <div>
      <CategoryHero />
      <Available />
      <SubscriptionCta />
      {/* <CategoriesProducts /> */}
    </div>
  );
};

export default Catergories;
