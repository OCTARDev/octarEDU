"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./style.module.scss";
import { Box, Modal, Typography } from "@mui/material";
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
import OtpInput from "react-otp-input";
import { useResendOTPMutation, useVerifyEmailMutation } from "@/redux/rtk/otp";
import { log } from "util";

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<number>>;
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const OtpPage = () => {
  const pathname: string = usePathname();
  const lastPathName = pathname.split("/");
  let firstLink = lastPathName[1];
  const isArabic = pathname.includes("/ar");
  const [otp, setOtp] = useState("");
  const [counter, setCounter] = React.useState(0);
  const [verify, { isLoading, isError, isSuccess }] = useVerifyEmailMutation();
  const [sendOTP, { isLoading: otpLoading }] = useResendOTPMutation();
  const router = useRouter();
  const [err, setErr] = useState<any>();
  const schema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be valid email"),

    password: yup.string().required("Password is required").min(6),
  });
  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  const t = useTranslations("login");

  console.log("counter", counter);
  useEffect(() => {
    if (isSuccess) {
      router.push(`/${firstLink}/dashboard/home`);
    }
  }, [isSuccess]);
  console.log("otp.length", otp.length);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setErr("");
      if (otp.length === 6) {
        const res = await verify({ otp: otp }).unwrap();
        console.log(res);
        
        await toast.success("Account verfied successfully");
        await router.push(`/${firstLink}/dashboard/home`);
      } else {
        setErr("Opt is required");
      }

      // await localStorage.setItem("octar", JSON.stringify(res.data));
      // await dispatch(loginSuccess());
      // await router.push(`/${firstLink}/dashboard/home`);
    } catch (error: any) {
      console.log("e",error);
      
      toast.error(`Error ${error?.data?.message}`);
    }
  };
  const reSendOtp = async () => {
    setCounter(120);

    try {
      await sendOTP("");
      toast.success("Otp has been sent to Your Email");
    } catch (e) {}
  };
  return (
    <>
      <NavBar></NavBar>
      <div className={`${styles.loginContainer} ${isArabic && "arabic"}`}>
        <h1>Otp</h1>
        <form onSubmit={onSubmit}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={styles.inputStyle}
            shouldAutoFocus
          />
          {err && <p className="error">{err}</p>}

          <button className={styles.signIin}>
            {isLoading ? "Loading..." : "Verify Email"}
          </button>
        </form>
        <div className={styles.otp}>
          <p>Time Remaining: {counter}s</p>
          <button
            disabled={counter === 0 ? false : true}
            onClick={() => {
              reSendOtp();
            }}
            type="button"
          >
            <span> {otpLoading ? "Loading" : "Resend OTP"} </span>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OtpPage;
