"use client";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/hero";
import Email from "../contact-us/components/email";
import { fetchHelpPage, mainUrl } from "@/lib";
import Loader from "@/components/loader";
import { usePathname } from "next/navigation";
import { useGetFaqsQuery } from "@/redux/rtk/homePage";
// import { useGetFaq } from "@/redux/rtk/homePage";

const Page = async () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const fullLink = pathname.split("/");
  let lang = fullLink[1];
  const { data, isLoading } = useGetFaqsQuery(lang);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <Header isArabic={isArabic} />
      <Hero res={data} />
      <Email />
    </div>
  );
};

export default Page;
