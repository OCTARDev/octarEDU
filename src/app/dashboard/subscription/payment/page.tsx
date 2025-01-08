"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import { auth, clickSubscription, getIp, isAuthenticated } from "../../lib";
import axios from "axios";
import Loader from "@/components/loader";
import { mainUrl } from "@/lib";
import { toast } from "react-toastify";
import { EwalletIcon, MasterIcon, VisaIcon } from "@/shared/icons";
import { Grid, TextField } from "@mui/material";
import PaymentMethods from "../components/paymentMethods";

const Payment = () => {
  const [data, setdata] = React.useState<any>();
  const [res, setRes] = useState<any>("");
  const [couponRes, setCouponRes] = useState<any>();
  const params = useSearchParams();
  const id = params.get("id");
  const [selected, setSelected] = useState<any>();
  const [ip, setIp] = React.useState<any>();
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState<string>("");
  const [walletData, setWalletData] = useState<any>({});
  const [loadingCopoun, setLoadingCopoun] = useState(false);
  const [payType, setPayType] = React.useState("");
  const [defaultSeleted, setDefaultSeleted] = useState<any>();
  const handleChangeWallet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (files) {
      setWalletData({ ...walletData, [name]: files[0] });
    } else {
      setWalletData({ ...walletData, [name]: value });
    }
  };
  //console.log("walletData", walletData);
  let percentage = couponRes?.data?.data?.percentage || 0;
  let couponCurrency = couponRes?.data?.data?.currency || "";
  let couponID = couponRes?.data?.data?.id;

  const handlClick = async (single: any) => {
    await setLoading(true);
    let params = {
      user_ip: ip,
      subscription_id: id,
    };
    const data = await clickSubscription(params);
    await setLoading(false);
    await setdata(data);
  };
  const checkOutPayPal = async (dataa: any) => {
    const useData: auth = isAuthenticated();
    const token: any = useData?.token || "";
    setLoading(true);
    const header = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
    const data = await axios
      .post(
        `${mainUrl}/paypal/check-out`,
        {
          ...dataa,
        },
        {
          headers: header,
        }
      )
      .then((res: any) => {
        setLoading(false);
        setRes(res?.data);
        // //console.log("Ressssssssssssss", res);
      })
      .catch(() => {
        setLoading(false);
        toast.error("please try again");
      });

    return data;
  };
  const checkOutPayMob = async (dataa: any) => {
    const useData: auth = isAuthenticated();
    const token: any = useData?.token || "";
    setLoading(true);
    const header = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
    const data = await axios
      .post(
        `${mainUrl}/paymob/check-out`,
        {
          ...dataa,
        },
        {
          headers: header,
        }
      )
      .then((res: any) => {
        setLoading(false);
        setRes(res?.data);
        // //console.log("Ressssssssssssss", res);
      })
      .catch(() => {
        setLoading(false);
        toast.error("please try again");
      });

    return data;
  };

  const checkOutWallet = async (dataa: any) => {
    const useData: auth = isAuthenticated();
    const token: any = useData?.token || "";
    setLoading(true);
    const formData: any = new FormData();
    //console.log("dataadataadataadataadataa", dataa);
    for (const property in dataa) {
      formData.append(property, dataa[property]);
      //console.log(property, dataa[property]);
    }
    const header = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    };

    axios({
      method: "post",
      url: `${mainUrl}/wallet/check-out`,
      data: formData,
      headers: header,
    })
      .then((response) => {
        //handle success
        //console.log(response);
        setLoading(false);
        toast.success("You submitied a request");
        setSelected("");
      })
      .then(() => {
        handlClick(id);
      })
      .catch(function (response) {
        //handle error
        //console.log(response);
        setLoading(false);

        toast.error("Something wrong");
      });
    // return data;
    // //console.log("DAtaaaa", dataa);
  };

  const handlClickRadio = (id: any) => {
    setPayType(id);
  };

  const [valueWallet, setValueWallet] = React.useState("");
  useEffect(() => {
    if (payType == "1") {
      setDefaultSeleted(data?.data?.payment_method[0]?.id);
    }
  }, [payType]);
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    // //console.log(res.data);
    // //console.log("testttttttttttttttttttt", res.data.ip);
    setIp(res.data.ip);
  };

  useEffect(() => {
    getData();
  }, []);
  React.useEffect(() => {
    const fetchApi = async () => {
      await handlClick(id);
    };
    if (ip) {
      fetchApi();
    }
  }, [ip]);

  React.useEffect(() => {
    if (defaultSeleted) {
      setSelected(defaultSeleted);
    }
  }, [defaultSeleted, payType]);

  React.useEffect(() => {
    // if (res?.data?.paypal_link) {
    if (res?.data?.paypal_link) {
      window.open(res?.data?.paypal_link, "_self");
    }
    if (res?.data?.url) {
      window.open(res?.data?.url, "_self");
      // //console.log("resLink", res?.data?.url);
    }
    // }
  }, [res]);

  const findData = (id: number) => {
    const paymetnData = data?.data?.payment_method?.find(
      (e: any) => e?.id === id
    );
    return paymetnData;
  };

  const seletedPayment = findData(selected);

  const checkOut = async (e: any) => {
    e.preventDefault();
    if (seletedPayment?.id === 2) {
      const sendData = {
        payment_method_id: 2,
        subscription_plan_id: seletedPayment?.Subscription_plan?.id,
        coupon_id: percentage ? couponID : 0,
      };
      // //console.log("sendData", sendData);
      const res = await checkOutPayMob(sendData);
      return res;
    }
    if (seletedPayment?.id === 1) {
      const sendData = {
        payment_method_id: 1,
        subscription_plan_id: seletedPayment?.Subscription_plan?.id,
        coupon_id: percentage ? couponID : 0,
      };
      const res = await checkOutPayPal(sendData);
      return res;
    }
    if (seletedPayment?.id !== 1 && seletedPayment?.id !== 2) {
      const sendData: any = {
        payment_method_id: selected,
        subscription_plan_id: seletedPayment?.Subscription_plan?.id,
        coupon_id: percentage ? couponID : 0,
        phone: walletData?.phone,
        bill_image: walletData?.bill_image,
      };

      const res = await checkOutWallet(sendData);
      return res;
    }
  };

  const getPercentage = async () => {
    const useData: auth = isAuthenticated();
    const token: any = useData?.token || "";
    setLoadingCopoun(true);
    const header = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };
    let sendData = {
      coupon_code: coupon,
      payment_method_id: seletedPayment?.id,
    };
    const data = await axios
      .post(
        `${mainUrl}/subscription/apply-coupon`,
        {
          ...sendData,
        },
        {
          headers: header,
        }
      )
      .then((res: any) => {
        setLoadingCopoun(false);
        setCouponRes(res);
        // //console.log("Ressssssssssssss", res);
      })
      .catch((e: any) => {
        setLoadingCopoun(false);
        toast.error(`${e?.response?.data?.message}`);
        //console.log("eeeeeeeeeeeeeeeeeeeeeeeee", e?.response?.data?.message);
      });

    return data;
  };

  const walletPay = data?.data?.payment_method?.filter((e: any) => {
    return e?.type === "wallet";
  });
  const cardPay = data?.data?.payment_method?.filter((e: any) => {
    return e?.type === "card";
  });

  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Link href={`/${lang}/dashboard/subscription`}>
        <div className={styles.nav}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M9 18L3 12L9 6L10.4 7.4L6.8 11H21V13H6.8L10.4 16.6L9 18Z"
              fill="black"
            />
          </svg>
          <button>Back</button>
        </div>
      </Link>
      <div className={styles.info}>
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
        <h1>Subscription details</h1>
      </div>
      <div className={styles.enhance}>
        <p>
          Enhance your OCTAR experience with our official coloring books
          available in our{" "}
          <Link href={"/home/store"}>
            <span className={styles.store}> store</span>
          </Link>
          , these specially designed books replace the need for downloading and
          printing targets.
        </p>
      </div>
      <div className={styles.paymentInfo}>
        <div className={styles.money}>
          <div>
            <p className={styles.special}>Your plan details</p>
          </div>
          <div>
            <p> {seletedPayment?.Subscription_plan?.title}</p>
            <p>
              {payType == "1" || payType == "2" ? (
                <>
                  {seletedPayment?.id === 1 ? (
                    <>
                      {couponCurrency === "USD" ? (
                        <>
                          {Number(
                            seletedPayment?.Subscription_plan?.real_price
                          )}{" "}
                          -{` ${percentage}% `} = $
                          {Number(
                            seletedPayment?.Subscription_plan?.real_price
                          ) -
                            (Number(percentage) / 100) *
                              Number(
                                seletedPayment?.Subscription_plan?.real_price
                              )}
                          / {seletedPayment?.Subscription_plan?.period}
                        </>
                      ) : (
                        <>
                          <>$</>
                          {Number(
                            seletedPayment?.Subscription_plan?.real_price
                          )}{" "}
                          /{seletedPayment?.Subscription_plan?.period}
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  {seletedPayment?.id === 2 ? (
                    <>
                      {couponCurrency === "EGY" ? (
                        <>
                          {Number(
                            seletedPayment?.Subscription_plan?.real_price
                          )}{" "}
                          -{` ${percentage}% `} =
                          {Number(
                            seletedPayment?.Subscription_plan?.real_price
                          ) -
                            (Number(percentage) / 100) *
                              Number(
                                seletedPayment?.Subscription_plan?.real_price
                              )}
                          <span>EGY</span> /
                          {seletedPayment?.Subscription_plan?.period}
                        </>
                      ) : (
                        <>
                          {Number(
                            seletedPayment?.Subscription_plan?.real_price
                          )}
                          <span>EGY</span> /
                          {seletedPayment?.Subscription_plan?.period}
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  {seletedPayment?.id !== 1 && seletedPayment?.id !== 2 ? (
                    <>
                      {couponCurrency === "EGY" ? (
                        <>
                          {Number(
                            seletedPayment?.Subscription_plan?.real_price
                          )}{" "}
                          -{` ${percentage}% `} =
                          {Number(
                            seletedPayment?.Subscription_plan?.real_price
                          ) -
                            (Number(percentage) / 100) *
                              Number(
                                seletedPayment?.Subscription_plan?.real_price
                              )}
                          <span>EGY</span> /
                          {seletedPayment?.Subscription_plan?.period}
                        </>
                      ) : (
                        <>
                          {Number(
                            seletedPayment?.Subscription_plan?.real_price
                          )}
                          <span>EGY</span> /
                          {seletedPayment?.Subscription_plan?.period}
                        </>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <>
                  <p> {data?.data?.subscription_plan?.title}</p>
                  {Number(data?.data?.subscription_plan?.real_price) -
                    (Number(percentage) / 100) *
                      Number(data?.data?.subscription_plan?.real_price)}
                  <span>EGY</span> /{data?.data?.subscription_plan?.period}
                  <h1>{payType} </h1>
                </>
              )}
            </p>
          </div>
        </div>
        <div>
          <Link href={`/${lang}/dashboard/subscription`}>
            <button>Change plan</button>
          </Link>
        </div>
      </div>
      <div className={styles.coupon}>
        <h1>Apply coupon</h1>
        <div>
          <input
            type="text"
            placeholder="Enter your coupon"
            onChange={(e) => {
              setCoupon(e.target.value);
            }}
            value={coupon}
          />
          <button onClick={getPercentage}>
            {loadingCopoun ? "Loading..." : "apply"}
          </button>
        </div>
      </div>
      <PaymentMethods
        handlClickRadio={handlClickRadio}
        payType={payType}
        cardPay={cardPay}
        selected={selected}
        setSelected={setSelected}
        checkOut={checkOut}
        walletPay={walletPay}
        seletedPayment={seletedPayment}
        loading={loading}
        walletData={walletData}
        handleChangeWallet={handleChangeWallet}
      />
    </div>
  );
};

export default Payment;
