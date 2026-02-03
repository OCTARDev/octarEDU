"use client";
import Footer from "./components/footer";
import Header from "./components/header";
import { useGetIpQuery } from "@/redux/rtk/ip";

const MainSubPage = () => {
  const {data} = useGetIpQuery("");
  return (
    <div>
      <Header ip={data?.ip} />
      <Footer ip={data?.ip} />
    </div>
  );
};

export default MainSubPage;
