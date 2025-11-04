"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import styles from "./style.module.scss";
import { user } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import SiwtchingForms from "@/components/switchForms";
import Link from "next/link";
import { fetchSubscriptionPage, mainUrl } from "@/lib";
import axios from "axios";
import Loader from "@/components/loader";
import { useTranslations } from "next-intl";
import LottieContainer from "@/animation/lottie";
import animation from "../../../../../../../Animation-gift.json";
import Image from "next/image";
const Plans = () => {
  const [ip, setIp] = useState<any>("");
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const isArabic = pathname.includes("/ar");
  const router = useRouter();
  const [open, setOpen] = React.useState<boolean>(false);
  const [plans, setPlans] = useState<any>([]);
  const getTheUserData: user | any =
    typeof window !== "undefined" ? localStorage.getItem("octar") : false;
  const userData = JSON.parse(getTheUserData);
  const isLoggedWithToken = userData?.token ? true : false;

  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  React.useLayoutEffect(() => {
    const fetchApi = async () => {
      await setLoading(true);
      const params: any = {
        user_ip: ip,
        account_type_id: 1,
      };
      const queryParams = new URLSearchParams(params).toString();

      const data = await fetch(
        `${mainUrl}/home-page/show-subscription-plan?${queryParams}`,
        {
          cache: "no-store",
          headers: {
            "X-App-Locale": lang,
          },
        }
      )
        .then((response) => response.json())
        .then((res) => {
          setLoading(false);
          setPlans(res?.data?.subscription_plans);
        })
        .catch(() => {
          setLoading(false);
        });
    };

    if (ip) {
      fetchApi();
    }
  }, [ip, lang]);
  useLayoutEffect(() => {
    if (isLoggedWithToken) {
      setIsLogged(true);
    }
    if (!isLoggedWithToken) {
      setIsLogged(false);
    }
  }, [isLoggedWithToken]);

  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");

    setIp(res.data.ip);
  };

  useEffect(() => {
    getData();
  }, []);

  const t = useTranslations("individual");
  const tN = useTranslations("dashboardSubscription");
  const tS = useTranslations("store");
  if (loading) {
    return <Loader />;
  }
  function eArabic(x: number) {
    return x.toLocaleString("ar-EG");
  }
  //console.log(eArabic(123456.789));
  console.log("plans", plans);
  return (
    <div className={`${styles.container} ${isArabic && "arabic"}`}>
      {/* <div className={styles.leftDiv}>
        <h3>{t("list.name")}</h3>
        <ul>
          <li>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                  fill="black"
                />
              </svg>
            </span>
            <span>{t("list.dive")}</span>
          </li>
          <li>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                  fill="black"
                />
              </svg>
            </span>
            <span>{t("list.discover")}</span>
          </li>
          <li>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                  fill="black"
                />
              </svg>
            </span>
            <span>{t("list.enjoy")}</span>
          </li>
          <li>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9.54998 17.9996L3.84998 12.2996L5.27498 10.8746L9.54998 15.1496L18.725 5.97461L20.15 7.39961L9.54998 17.9996Z"
                  fill="black"
                />
              </svg>
            </span>
            <span>{t("list.unlock")}</span>
          </li>
        </ul>
      </div> */}
      <div className="mb-10 space-y-4">
        <h1 className="font-bold text-4xl">{t("list.name")}</h1>
        <p>{t("list.body")}</p>
      </div>
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12`}>
        {plans?.map((single: any) => {
          return (
            <Card {...single} key={single.id}/>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;


const Card = (data:{
  id:number | string;
  title:string;
  price:string;
  price_number:number;
  instead_of:string;
  instead_of_number:number;
  is_instead_of:boolean;
  period:string;
  is_best_value:boolean;
  is_free:boolean;
  media?:string;
  subscription_plan_descriptions:{
    id:number;
    subscription_plan_id:number;
    content:string;
    }[];

})=>{
  return(
    <div className="border rounded-2xl  flex flex-col gap-4 h-full px-3 border-t-0 ">
      {/* Header */}
      <div className="-mx-5"> 
        <svg
          width="100%"
          height="auto"
          viewBox="0 0 294 125"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient
              id="paint0_linear_29_850"
              x1="147"
              y1="0"
              x2="147"
              y2="126"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#D552D8" />
              <stop offset="0.5" stopColor="#E07DE2" />
              <stop offset="1" stopColor="#BF44C6" />
            </linearGradient>
          </defs>

          <path
            d="M0 19.2504C0 8.61868 8.61867 0 19.2503 0H274.75C285.381 0 294 8.61867 294 19.2503V70.6109L153.788 123.442C149.413 125.091 144.587 125.091 140.212 123.442L0 70.6109V19.2504Z"
            fill="url(#paint0_linear_29_850)"
          />

          <foreignObject x="0" y="0" width="100%" height="100%">
            <div className="flex flex-col justify-center items-center text-white h-full pb-6">
              <h3 className="font-bold text-lg md:text-2xl">{data.title}</h3>
              <p className="font-semibold">{data.price}</p>
            </div>
              
          </foreignObject>
        </svg>
      </div>
      {/* Image */}
      {
        data.media && 
        <div className="flex justify-center w-full"> 
        <Image 
        src={data.media}
        alt="Card Image"
        width={100}
        height={100}
        className="w-full h-auto"
        />
        </div>
      }
      <div className="py-10 flex flex-col gap-4">
        <div>
          <h4 className="mb-4 font-bold text-lg">Features</h4>
          <ul className="flex flex-col gap-4 px-4">
            {data.subscription_plan_descriptions.map((s)=>{
              return(
                <li key={s.id} className="flex items-center gap-2">
                  <span>
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="0.766784" y="0.766784" width="16.8693" height="16.8693" rx="8.43463" stroke="#9E32A4" stroke-width="1.53357"/>
                      <path d="M13.2908 6.13428L7.66776 11.7574L5.11182 9.20141" stroke="#9E32A4" stroke-width="1.53357" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span className="">{s.content}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="mt-auto -mx-3">
        <button className="text-center w-full py-4 bg-[linear-gradient(180deg,#D552D8_0%,#E07DE2_50%,#BF44C6_100%)] text-white font-bold tracking-wider rounded-b-2xl">Subscribe Now</button>
      </div>
    </div>
  )
}
