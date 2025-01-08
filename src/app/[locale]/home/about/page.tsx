"use client";
import AboutSection from "./components/about";
import OurHistory from "./components/ourHistory";
import OurMission from "./components/ourMission";
import OurTeam from "./components/ourTeam";
import OurValues from "./components/ourValues";
import Feedback from "@/components/feedBack";
import OurVision from "./components/ourVision";
import { fetchAboutPage, fetchHomePage, fetcher, mainUrl } from "@/lib";
import NewVision from "./components/newVision";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import useSWR from "swr";
import { useGetHomeQuery } from "@/redux/rtk/homePage";
import { usePathname } from "next/navigation";

const AboutPage = () => {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  // const [data, setData] = useState(null);
  // const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch(`${mainUrl}/home-page`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, []);
  // const { data, error, isLoading } = useSWR(`${mainUrl}/home-page`, fetcher);
  const { data, isLoading } = useGetHomeQuery(lang);

  // const { data, isLoading } = useGetHomePageDataQuery("");
  // //console.log("ressssssssssssssssssssssssssss", data);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`${isArabic && "arabic"}`}>
      {/* <AboutSection isArabic={isArabic} /> */}
      <OurHistory isArabic={isArabic} />
      <OurMission isArabic={isArabic} />
      {/* <OurTeam /> */}
      {/* <OurVision /> */}
      <NewVision isArabic={isArabic} />
      <OurValues isArabic={isArabic} />

      <Feedback data={data} />
    </div>
  );
};

export default AboutPage;
