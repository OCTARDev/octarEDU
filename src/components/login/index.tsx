"use clinet";
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

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<number>>;
};
const Login = ({ open, setOpen, setForm }: props) => {
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [err, setErr] = useState<any>();
  const schema = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be valid email"),

    password: yup.string().required("Password is required").min(6),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    setLoading(true);
    setErr("");
    try {
      await axios
        .post(`${mainUrl}/auth-user/login-user`, {
          ...data,
        })
        .then(function (response: any) {
          setLoading(false);
          if (typeof window !== "undefined") {
            localStorage.setItem("octar", JSON.stringify(response?.data?.data));
          }
          router.push(`/${lang}/dashboard/home`);
        })
        .catch(function (error) {
          setLoading(false);
          //console.log("error", error.response.data.message);
          toast.error(`Error ${error?.response?.data?.message}`);
          setErr(error.response.data);
        });
    } catch (e) {}
  };
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
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
    // <Modal
    //   open={open}
    //   onClose={handleClose}
    //   aria-labelledby="modal-modal-title"
    //   aria-describedby="modal-modal-description"
    // >
    <div className={styles.loginContainer}>
      <div className={styles.header}>
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
      </div>
      <div className={styles.content}>
        <div>
          <h1>Sign in</h1>
          <h2>Sign in to get access to your subscriptions.</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputDiv}>
            <label htmlFor="email">Email</label>
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
              <input {...register("email")} placeholder="Enter your email" />
            </div>
            <p>{errors.email?.message}</p>
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="password">Password</label>
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
                placeholder="Enter your password"
              />
            </div>
            <p>{errors.password?.message}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            {/* <a className={styles.forgetPsd} href="#">
              Forgot password?
            </a> */}
          </div>
          <button type="submit" className={styles.signIin}>
            {loading ? "Loading..." : "Sign in"}
          </button>
          <div className={styles.lastDiv}>
            <p>{`Don’t have an account?`}</p>{" "}
            <button onClick={() => setForm(2)}>Sign up</button>
          </div>
        </form>
        {mapForErr()}
      </div>
    </div>
    // </Modal>
  );
};

export default Login;
