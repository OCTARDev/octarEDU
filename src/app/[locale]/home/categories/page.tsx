import React from "react";
import Available from "./components/available";
import CategoriesProducts from "./components/categoriesProducts";
import { fetchCategoryPage } from "@/lib";

const Catergories = async () => {
  // const res = await fetchCategoryPage();
  // //console.log("res categories server", res)Form SelectionForm Selection;
  return (
    <div>
      <Available />
      {/* <CategoriesProducts /> */}
    </div>
  );
};

export default Catergories;
