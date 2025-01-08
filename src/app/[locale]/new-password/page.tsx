"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./style.module.scss";
import { Modal } from "@mui/material";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { mainUrl } from "@/lib";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckIcon from "@mui/icons-material/Check";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const NewPass = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");
  const email = params.get("email");
  const [err, setErr] = useState<any>();
  const [show, setShow] = React.useState<boolean>(false);
  const [showC, setShowC] = React.useState<boolean>(false);
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const schema = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .min(8, "at least 8 digits")
      .matches(/[a-z]/, "at least on lower case letter")
      .matches(/[A-Z]/, "at least on upper case letter")
      .matches(/[0-9]/, "at least one numeric number")
      .matches(/[#?!@$%^&*-]/, "at least one special symbol"),
    password_confirmation: yup
      .string()
      .required("must re enter paswword ")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      password: "",
    },
  });
  let timerInterval: any;
  const testSwal = () => {
    Swal.fire({
      title: "Password has been rested successfullt",
      html: "You bill direcred to Login in <b></b> Miliseconds",
      icon: "success",
      timer: 2000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const popup = Swal.getPopup();
        if (popup) {
          // Null check added here
          const timer: any = popup.querySelector("b");
          const timerInterval = setInterval(() => {
            if (timer) {
              // Add another null check for `timer`
              timer.textContent = `${Swal.getTimerLeft()}`;
            }
          }, 100);
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        //console.log("I was closed by the timer");
        router.push(`/${lang}/login`);
      }
    });
  };
  const onSubmit = async (data: any) => {
    setLoading(true);
    setErr("");
    const sendData = {
      ...data,
      token: token?.replace("{", "")?.replace("}", ""),
      email: email?.replace("{", "")?.replace("}", ""),
    };
    try {
      await axios
        .post(`${mainUrl}/auth-user/reset-password`, { ...sendData })
        .then(function (response: any) {
          setLoading(false);
          toast.success("Password has been edited successfully");
          testSwal();
          //   if (typeof window !== "undefined") {
          //     localStorage.setItem("octar", JSON.stringify(response?.data?.data));
          //   }
          //   router.push("/dashboard/home");
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
  const watchPassword = watch("password");
  //console.log("token", token?.replace("{", "")?.replace("}", ""));
  //console.log("email", email?.replace("{", "")?.replace("}", ""));
  //console.log("watchPassword", watchPassword);
  //console.log("Check this", /[a-z]/.test(watchPassword));
  return (
    <>
      <NavBar></NavBar>
      <div className={styles.loginContainer}>
        <div className={styles.content}>
          <div>
            <h1>New password</h1>
            <h2>Enter your new password</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputDiv}>
              <label htmlFor="password">Password</label>
              <div className={styles.inputContainer}>
                <input
                  {...register("password")}
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  onClick={() => setShow(!show)}
                  className={styles.eye}
                  type="button"
                >
                  {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>
              {/* <p>{errors.password?.message}</p> */}

              <div className={styles?.password}>
                <p
                  className={
                    watchPassword?.length > 8 ? styles?.correct : styles?.err
                  }
                >
                  {watchPassword?.length > 8 && (
                    <>
                      <CheckIcon />
                    </>
                  )}
                  8 characters long
                </p>
                <p
                  className={
                    /[A-Z]/.test(watchPassword) ? styles?.correct : styles?.err
                  }
                >
                  {/[A-Z]/.test(watchPassword) && (
                    <>
                      <CheckIcon />
                    </>
                  )}
                  should contain at-least 1 Uppercase
                </p>
                <p
                  className={
                    /[a-z]/.test(watchPassword) ? styles?.correct : styles?.err
                  }
                >
                  {/[a-z]/.test(watchPassword) && (
                    <>
                      <CheckIcon />
                    </>
                  )}
                  should contain at-least 1 Lowercase
                </p>
                <p
                  className={
                    /[0-9]/.test(watchPassword) ? styles?.correct : styles?.err
                  }
                >
                  {/[0-9]/.test(watchPassword) && (
                    <>
                      <CheckIcon />
                    </>
                  )}
                  should contain at-least 1 Numeric
                </p>
                <p
                  className={
                    /[#?!@$%^&*-]/.test(watchPassword)
                      ? styles?.correct
                      : styles?.err
                  }
                >
                  {/[#?!@$%^&*-]/.test(watchPassword) && (
                    <>
                      <CheckIcon />
                    </>
                  )}
                  should contain at-least 1 special character.
                </p>
              </div>
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor="password_confirmation">Confirm Password</label>
              <div className={styles.inputContainer}>
                <input
                  {...register("password_confirmation")}
                  type={showC ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  onClick={() => setShowC(!showC)}
                  className={styles.eye}
                  type="button"
                >
                  {showC ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>
              <p>{errors.password_confirmation?.message}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              {/* <a className={styles.forgetPsd} href="#">
              Forgot password?
            </a> */}
            </div>
            <button type="submit" className={styles.signIin}>
              {loading ? "Loading..." : "Reset password"}
            </button>
          </form>
          {mapForErr()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NewPass;
