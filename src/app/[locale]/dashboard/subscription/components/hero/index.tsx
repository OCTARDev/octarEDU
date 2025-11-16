"use client";
import React, { useLayoutEffect, useState } from "react";
import styles from "./style.module.scss";
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
import { useGetProfileQuery } from "@/redux/rtk/profile";
import ErrorModal from "@/components/ErrorModal";
import { clickSubscription } from "../../../lib";
import { PlanCard } from "@/app/[locale]/home/individual/components/plans";

const Hero = ({ subscription_plans, loading }: any) => {
  const t = useTranslations("dashboardSubscription");
  const tN = useTranslations("individual");
  const [showModal,setShowModal] = useState(false);
  const params = useSearchParams();
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const isArabic = pathname.includes("/ar");
  const {data:userData} = useGetProfileQuery();
  const user = userData?.data;
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
    const data = await clickSubscription(params,lang);
    await setdata(data);
  };
  const click = () => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/${lang}/dashboard/subscription`);
    }
  };
  const handleRoute = (id:any)=>{
    if(user?.email_verified_at && user?.phone){
    router.push(`/${lang}/dashboard/subscription/payment?id=${id}`)
    }else{
      setShowModal(true)
    }
  }
  const handleCancelModal = ()=>{
    setShowModal(false);
  }
  const handleConfirmModal = ()=>{
    setShowModal(false);
    router.push(`/${lang}/dashboard/profile`)
  }
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
        {
          showModal && 
          <ErrorModal 
            onCancel={handleCancelModal}
            onConfirm={handleConfirmModal}
          />
        }

          <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4  gap-12 my-10`}>
            {subscription_plans?.map((single: any) => {
              return (
                <PlanCard data={single} key={single.key} isLogged={true}/>
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
            {/* <div className={styles.leftDiv}>
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
            </div> */}
          </div>
        </>
      )}
    </>
  );
};

export default Hero;
