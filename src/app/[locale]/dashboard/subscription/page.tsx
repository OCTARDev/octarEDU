"use client";
import axios from "axios";
import { useUserIp } from "../components/getIp";
import { clickSubscription, getIp } from "../lib";
import Footer from "./components/footer";
import Header from "./components/header";
import Hero from "./components/hero";
import { useEffect, useState } from "react";

const MainSubPage = () => {
  const ipSecond = useUserIp();
  const [ip, setIp] = useState<any>("");
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    // //console.log(res.data);
    // //console.log("testttttttttttttttttttt", res.data.ip);
    setIp(res.data.ip);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header ip={ip} />
      {/* <Hero ip={ip} /> */}
      <Footer ip={ip} />
    </div>
  );
};

export default MainSubPage;
