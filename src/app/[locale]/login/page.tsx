"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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
import Swal from "sweetalert2";
import { useLoginMutation } from "@/redux/rtk/auth";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/reducers/auth/authSlice";
import { useTranslations } from "next-intl";
type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<number>>;
};
const Login = () => {
  const pathname: string = usePathname();
  const lastPathName = pathname.split("/");
  let firstLink = lastPathName[1];
  const isArabic = pathname.includes("/ar");

  const [loading, setLoading] = useState<boolean>(false);
  const [login, { isLoading, isError, isSuccess, data }] = useLoginMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [err, setErr] = useState<any>();
  const schema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be valid email"),

    password: yup.string().required("Password is required").min(6),
  });
  const t = useTranslations("login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  console.log("dataLogin", data?.data?.user?.email_verified_at);
  useEffect(() => {
    if (data) {
      if (data?.data?.user?.email_verified_at) {
        router.push(`/${firstLink}/dashboard/home`);
      } else {
        router.push(`/${firstLink}/otp`);
      }
    }
  }, [data]);
  const onSubmit = async (data: any) => {
    try {
      const res = await login({ ...data }).unwrap();
      await localStorage.setItem("octar", JSON.stringify(res.data));
      await dispatch(loginSuccess());
      if (res?.data?.email_verified_at) {
        // await router.push(`/${firstLink}/dashboard/home`);
      } else {
        // await router.push(`/${firstLink}/otp`);
      }
      // await router.push(`/${firstLink}/dashboard/home`);
    } catch (error: any) {
      toast.error(`${error.data.message}`);
    }
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
        <div className={styles.content}>
          <div>
            <h1>{t("signIn")}</h1>
            <h2>{t("des")}</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputDiv}>
              <label htmlFor="email">{t("email")}</label>
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
                <input {...register("email")} placeholder={t("enterEmail")} />
              </div>
              <p>{errors.email?.message}</p>
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor="password">{t("pass")}</label>
              <div className={styles.inputContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 22C5.45 22 4.97917 21.8042 4.5875 21.4125C4.19583 21.0208 4 20.55 4 20V10C4 9.45 4.19583 8.97917 4.5875 8.5875C4.97917 8.19583 5.45 8 6 8H7V6C7 4.61667 7.4875 3.4375 8.4625 2.4625C9.4375 1.4875 10.6167 1 12 1C13.3833 1 14.5625 1.4875 15.5375 2.4625C16.5125 3.4375 17 4.61667 17 6V8H18C18.55 8 19.0208 8.19583 19.4125 8.5875C19.8042 8.97917 20 9.45 20 10V20C20 20.55 19.8042 21.0208 19.4125 21.4125C19.0208 21.8042 18.55 22 18 22H6ZM12 17C12.55 17 13.0208 16.8042 13.4125 16.4125C13.8042 16.0208 14 15.55 14 15C14 14.45 13.8042 13.9792 13.4125 13.5875C13.0208 13.1958 12.55 13 12 13C11.45 13 10.9792 13.1958 10.5875 13.5875C10.1958 13.9792 10 14.45 10 15C10 15.55 10.1958 16.0208 10.5875 16.4125C10.9792 16.8042 11.45 17 12 17ZM9 8H15V6C15 5.16667 14.7083 4.45833 14.125 3.875C13.5417 3.29167 12.8333 3 12 3C11.1667 3 10.4583 3.29167 9.875 3.875C9.29167 4.45833 9 5.16667 9 6V8Z"
                    fill="#725073"
                  />
                </svg>
                <input
                  {...register("password")}
                  type="password"
                  placeholder={t("enterPass")}
                />
              </div>
              <p>{errors.password?.message}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <a
                className={styles.forgetPsd}
                href={`/${firstLink}/forget-password`}
              >
                {t("forget")}
              </a>
            </div>
            <button type="submit" className={styles.signIin}>
              {loading || isLoading ? `${t("signIn")}...` : t("signIn")}
            </button>
            <div className={styles.lastDiv}>
              <p>{t("dont")}</p>
              <Link href={`/${firstLink}/sign-up`}>
                <button> {t("create")}</button>
              </Link>
            </div>
          </form>
          {/* {mapForErr()} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
