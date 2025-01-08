"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./style.module.scss";
import { Modal } from "@mui/material";
import { redirect, usePathname } from "next/navigation";
import { toast } from "react-toastify";
import { mainUrl } from "@/lib";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import { useTranslations } from "next-intl";

const ResetPass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [err, setErr] = useState<any>();
  const t = useTranslations("forgetPassword");
  const schema = yup.object({
    email: yup.string().required(t("email_required")).email(t("email_invalid")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const onSubmit = async (data: any) => {
    setLoading(true);
    setErr("");
    try {
      await axios
        .post(`${mainUrl}/auth-user/forgot-password`, {
          ...data,
        })
        .then(function (response: any) {
          setLoading(false);
          toast.success("Check your Email");
          // if (typeof window !== "undefined") {
          //   localStorage.setItem("octar", JSON.stringify(response?.data?.data));
          // }
          // router.push("/dashboard/home");
        })
        .catch(function (error) {
          setLoading(false);
          //console.log("error", error.response.data.message);
          toast.error(`Error ${error?.response?.data?.message}`);
          setErr(error.response.data);
        });
    } catch (e) {}
  };
  const mapForErr = () => {
    if (err?.message) {
      for (const property in err?.message) {
        return (
          <p className="err">
            {property}: {err?.message[property]}
          </p>
        );
      }
    }
  };
  return (
    <>
      <NavBar></NavBar>
      <div className={`${styles.loginContainer} ${isArabic && "arabic"}`}>
        {/* <div className={styles.header}>
        <Image src={logo} alt="logo"></Image>
        <button onClick={handleClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
              fill="black"
            />
          </svg>
        </button>
      </div> */}
        <div className={styles.content}>
          <div>
            <h1> {t("forgot_password")}</h1>
            <h2>{t("instruction")} </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputDiv}>
              <label htmlFor="email">{t("email_label")}</label>
              <div className={styles.inputContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM12 13L20 8V6L12 11L4 6V8L12 13Z"
                    fill="#725073"
                  />
                </svg>
                <input
                  style={{ padding: "0.5rem 45px" }}
                  {...register("email")}
                  placeholder={t("email_placeholder")}
                />
              </div>
              <p>{errors.email?.message}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              {/* <a className={styles.forgetPsd} href="#">
              Forgot password?
            </a> */}
            </div>
            <button type="submit" className={styles.signIin}>
              {loading ? `${t("loading")}` : t("submit")}
            </button>
          </form>
          {mapForErr()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ResetPass;
