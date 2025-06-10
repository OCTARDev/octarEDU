"use client";
import About from "../about";
import WhatIsOctar from "../whatIsOctar";
import Subscription from "../ourSubscription";
import Feedback from "../feedBack";
import { fetcher, mainUrl } from "@/lib";
import WhatIsOctarFor from "../whatIsOctarFor";
import HowItWorks from "../howItWorks";
import React, { useEffect, useState } from "react";
import Loader from "../loader";
import useSWR from "swr";
import { usePathname } from "next/navigation";
import { useGetHomeQuery } from "@/redux/rtk/homePage";

const LandPage = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const fullLink = pathname.split("/");
  let firstLink = fullLink[1];
  // const { data, error, isLoading } = useSWR(`${mainUrl}/home-page`, fetcher);
  const { data, error, isLoading } = useGetHomeQuery(firstLink);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <About data={data} />
      <WhatIsOctar data={data} />
      <WhatIsOctarFor />
      <HowItWorks data={data} />
      <Subscription data={data} isArabic={isArabic} />
      <Feedback data={data} isArabic={isArabic} />
    </div>
  );
};

export default LandPage;
