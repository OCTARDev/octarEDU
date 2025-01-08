"use client";
import React, { useLayoutEffect, useState } from "react";
import styles from "./style.module.scss";
import { clickSubscription } from "@/app/dashboard/lib";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import Loader from "@/components/loader";
import axios from "axios";
import { useTranslations } from "next-intl";
import { arPlans, enPlans } from "./staticData";
import LottieContainer from "@/animation/lottie";
import animation from "../../../../../../../Animation-gift.json";
const Hero = ({ subscription_plans, loading }: any) => {
  const t = useTranslations("dashboardSubscription");
  const tN = useTranslations("individual");
  const params = useSearchParams();
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const isArabic = pathname.includes("/ar");

  //console.log("lang", lang);
  const message = params.get("message");
  const [ip, setIp] = useState("");
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    // //console.log(res.data);
    // //console.log("testttttttttttttttttttt", res.data.ip);
    setIp(res.data.ip);
  };
  const [data, setdata] = React.useState("");
  const router = useRouter();
  const handlClick = async (single: any) => {
    let params = {
      user_ip: ip,
      subscription_id: single?.id,
    };
    const data = await clickSubscription(params);
    await setdata(data);
  };
  const click = () => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/${lang}/dashboard/subscription`);
    }
  };

  useLayoutEffect(() => {
    if (message) {
      if (message == "Transaction Success") {
        Swal.fire({
          title: "Thanks for your payment",
          icon: "success",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            click();
          }
        });
      }
      if (
        message == "Transaction Canceled" ||
        message == "Please Try Again Later..."
      ) {
        Swal.fire({
          title: `${message}`,
          icon: "error",
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            click();
          }
        });
      }
    }
  }, [message]);
  if (loading) {
    return <Loader></Loader>;
  }

  let x = true;
  const dataMap = lang === "ar" ? arPlans : enPlans;
  // Use a regular expression to match and capture the numeric part

  return (
    <>
      {loading ? (
        <>
          <Loader></Loader>
        </>
      ) : (
        <>
          <div className={styles.plansContainer}>
            {subscription_plans?.map((single: any) => {
              return (
                <div
                  className={`${styles.rightDiv} ${
                    single?.is_best_value === 1 ? styles.bestValue : ""
                  }`}
                  key={single?.id}
                >
                  <div
                    className={`${styles.limited} ${
                      isArabic ? styles.left : styles.right
                    }`}
                  >
                    <p>{t("limited")}</p>
                  </div>
                  {single?.is_best_value === 1 ? (
                    <div className={styles.bestValueIcon}>{t("bestValue")}</div>
                  ) : (
                    ""
                  )}

                  <div className={styles.first}>
                    <h1>{single?.title}</h1>
                    <h2>{single?.price}</h2>
                    {single?.is_instead_of ? (
                      <>
                        <h3>
                          {t("instead")} <span>{single?.instead_of} </span>
                        </h3>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className={styles.second}>
                    <ul>
                      {single?.subscription_plan_descriptions?.map(
                        (li: any) => {
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
                        }
                      )}
                    </ul>
                  </div>
                  <div className={styles.third}>
                    <Link
                      href={{
                        pathname: `/${lang}/dashboard/subscription/payment`,
                        query: { id: `${single?.id}` },
                      }}
                    >
                      <button>{t("subscribe")}</button>
                    </Link>
                  </div>
                </div>
              );
            })}
            {/* <div className={styles.rightDiv}>
        <div>
          <h1>Individual</h1>
          <h2>8000 EGP / Year</h2>
        </div>
        <div>
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
              <span>Access all available targets</span>
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
              <span>Control classes through our dashboard</span>
            </li>
          </ul>
        </div>
        <div>
          <button>Subscribe</button>
        </div>
        <div>
          <p>Charged yearly</p>
        </div>
      </div> */}
            <div className={styles.leftDiv}>
              <h3>{t("individualPlans")}</h3>
              <ul>
                {dataMap?.map((e) => {
                  return (
                    <li key={e?.id}>
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
                      <span>{`${e?.plan}`}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Hero;
