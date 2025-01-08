"use client";
import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { mainUrl } from "@/lib";
import Hero from "../hero";
import axios from "axios";
import { useUserIp } from "@/app/dashboard/components/getIp";
import Loader from "@/components/loader";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const isAuthenticated = () => {
  try {
    if (typeof window !== "undefined") {
      const userData: any = localStorage.getItem("octar");
      return JSON.parse(userData);
    }
  } catch (e) {
    //console.log("Error", e);
  }
};
type auth = {
  token?: string;
};
const Header = ({ ip }: any) => {
  const [data, setData] = React.useState<any>();
  const [word, setWord] = React.useState("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const useData: auth = isAuthenticated();
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  //console.log("lang", lang);
  const t = useTranslations("dashboardSubscription");
  const token: any = useData?.token || "";

  const header = {
    Authorization: `Bearer ${token}`,
    "X-App-Locale": lang,
  };
  React.useLayoutEffect(() => {
    const fetchApi = async () => {
      await setLoading(true);
      const data = await fetch(`${mainUrl}/subscription?user_ip=${ip}&`, {
        headers: header,
      })
        .then((response) => {
          setLoading(false);
          return response.json();
        })
        .catch((e) => {
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
      setData(data);
    };

    if (ip) {
      fetchApi();
    }
  }, [ip, lang]);
  const userData: any = data?.data;
  const subscription_plans = userData?.account_type_details?.subscription_plans;
  console.log("userData", userData?.renew);
  // //console.log("userData", userData);
  // //console.log("subscription_plans", subscription_plans);
  // const getData = async () => {
  //   const res = await axios.get("https://api.ipify.org/?format=json");
  //   //console.log(res.data);
  //   //console.log("testttttttttttttttttttt", res.data.ip);
  // };

  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  // }, []);
  // if (loading) {
  //   return <Loader></Loader>;
  // }
  //console.log("userData?.renewal", userData?.renew?.renew_date);
  return (
    <>
      {loading || !userData ? (
        <>{<Loader />}</>
      ) : (
        <>
          <div className={styles.headerContainer}>
            <div className={styles.firstDiv}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M4 22.5C3.45 22.5 2.97917 22.3042 2.5875 21.9125C2.19583 21.5208 2 21.05 2 20.5V10.5C2 9.95 2.19583 9.47917 2.5875 9.0875C2.97917 8.69583 3.45 8.5 4 8.5H20C20.55 8.5 21.0208 8.69583 21.4125 9.0875C21.8042 9.47917 22 9.95 22 10.5V20.5C22 21.05 21.8042 21.5208 21.4125 21.9125C21.0208 22.3042 20.55 22.5 20 22.5H4ZM10 19.5L16 15.5L10 11.5V19.5ZM4 7.5V5.5H20V7.5H4ZM7 4.5V2.5H17V4.5H7Z"
                  fill="#321433"
                />
              </svg>
              <h1>{t("subscriptionDetails")}</h1>
            </div>
            {/* <div className={styles.secondDiv}>
          {`You’re registered for a free trial for 48 hours. Subscribe a plan to maintain your subscription`}
        </div> */}
            <div className={styles.thridDiv}>
              <h2>
                {userData?.renew == null ? (
                  <>{t("subscriptionMessage")}</>
                ) : (
                  <>
                    {userData?.renew?.id === 0 ? (
                      <>
                        {/* {t("freeTrialMessage")} : */}
                        {/* {new Intl.DateTimeFormat("en-GB")?.format(
                          new Date(userData?.renew?.renew_date)
                        )} */}
                      </>
                    ) : (
                      <>
                        {`${t(
                          "renewSubscriptionDate"
                        )} : ${new Intl.DateTimeFormat("en-GB")?.format(
                          new Date(userData?.renew?.renew_date)
                        )}
                        
                        `}
                      </>
                    )}
                    {}
                  </>
                )}
              </h2>
              <h1>
                {userData?.renew?.id === 0
                  ? t("free")
                  : t("yourSubscriptionPlan")}
              </h1>
            </div>
          </div>
          <Hero
            subscription_plans={subscription_plans}
            ip={ip}
            loading={loading}
          />
        </>
      )}
    </>
  );
};

export default Header;
