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
      <div className={styles.leftDiv}>
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
      </div>
      <div className={styles.plansContainer}>
        {plans?.map((single: any) => {
          return (
            <div
              className={`${styles.rightDiv} ${
                single?.is_best_value === 1 ? styles.bestValue : ""
              } ${isArabic && "arabic"}`}
              key={single?.id}
            >
              <div
                className={`${styles.limited} ${
                  isArabic ? styles.left : styles.right
                }`}
              >
                <p>{tN("limited")}</p>
              </div>
              {single?.is_best_value === 1 ? (
                <div className={styles.bestValueIcon}>{tN("bestValue")}</div>
              ) : (
                ""
              )}

              <div className={`${styles.first} ${isArabic && "arabic"}`}>
                <h1
                  style={{
                    textAlign: isArabic ? "right" : "left",
                    fontWeight: "700",
                  }}
                >
                  {single?.title}
                </h1>
                <h2>{isArabic ? eArabic(single?.price) : single?.price}</h2>
                {single?.is_instead_of ? (
                  <>
                    <h3
                      style={{
                        textAlign: isArabic ? "right" : "left",
                        fontWeight: "700",
                      }}
                    >
                      {tS("instead")}
                      <span
                        style={{
                          padding: "0 5px",
                          textDecoration: "line-through",
                        }}
                      >
                        {single?.instead_of}
                      </span>
                      <span>
                        {/* {Number(single?.price) / Number(single?.instead_of)} */}
                      </span>
                    </h3>
                  </>
                ) : (
                  <></>
                )}
              </div>
              <div className={styles.second}>
                <ul>
                  {single?.subscription_plan_descriptions?.map((li: any) => {
                    return (
                      <li key={li?.id}>
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
                        <span>{li?.content}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={styles.third}>
                {/* <Link
                      href={{
                        pathname: "/dashboard/subscription/payment",
                        query: { id: `${single?.id}` },
                      }}
                    >
                      <button>Subscribe</button>
                    </Link> */}

                {isLogged ? (
                  <Link
                    href={{
                      pathname: `/${lang}/dashboard/subscription/payment`,
                      query: { id: `${single?.id}` },
                    }}
                  >
                    <button
                    // onClick={() => router.push("/dashboard/subscription")}
                    >
                      {tN("subscribe")}
                    </button>
                  </Link>
                ) : (
                  <Link href={`/${lang}/login`}>
                    <button>{tN("subscribe")}</button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;
