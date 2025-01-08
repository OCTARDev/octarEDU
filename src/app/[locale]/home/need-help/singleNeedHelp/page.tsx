"use client";

import { fetchHelpPage, mainUrl } from "@/lib";
import React, { useEffect, useState } from "react";
import Hero from "./components/hero/index";
import Loader from "@/components/loader";
import { usePathname } from "next/navigation";
import { useGetFaqsQuery } from "@/redux/rtk/homePage";

const SingleFaq = () => {
  // const res = await fetchHelpPage();
  // const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch(`${mainUrl}/home-page/help`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);
  // if (isLoading) {
  //   return <Loader />;
  // }
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
      <Hero data={data} lang={lang} />
    </div>
  );
};

export default SingleFaq;
