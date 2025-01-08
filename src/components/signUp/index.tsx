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

import CheckIcon from "@mui/icons-material/Check";
type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setForm: React.Dispatch<React.SetStateAction<number>>;
};
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignUp = ({ open, setOpen, setForm }: props) => {
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [err, setErr] = useState<any>();
  const schema = yup.object({
    first_name: yup.string().required("first_name is required"),
    last_name: yup.string().required("last_name is required"),
    phone: yup
      .string()
      .required("phone is required")
      .matches(phoneRegExp, "Phone number is not valid"),
    email: yup
      .string()
      .required("Email is required")
      .email("Must be valid email"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "at least 8 digits")
      .matches(/[a-z]/, "at least on lower case letter")
      .matches(/[A-Z]/, "at least on upper case letter")
      .matches(/[0-9]/, "at least one numeric number")
      .matches(/[#?!@$%^&*-]/, "at least one special symbol"),
    c_password: yup
      .string()
      .required("must re enter paswword ")
      .oneOf([yup.ref("password")], "Passwords must match"),
    account_type_id: yup
      .string()
      .required("Account type is reqired")
      .oneOf(["1", "2"], "You must select one of Account type"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    setLoading(true);
    setErr("");
    try {
      await axios
        .post(`${mainUrl}/auth-user/register-user`, {
          ...data,
        })
        .then(function (response: any) {
          setLoading(false);
          toast.success("You have created account");
          handleClose();
          if (typeof window !== "undefined") {
            localStorage.setItem("octar", JSON.stringify(response?.data?.data));
          }
          router.push(`/${lang}/dashboard/home`);
        })
        .catch(function (error) {
          setLoading(false);
          //console.log("error", error.response.data.message);
          toast.error(`Error `);
          setErr(error.response.data);
        });
    } catch (e) {}
  };
  const [data, setData] = React.useState<any>();
  const accountTypes = data?.data?.account_types;
  //console.log("accountTypes", accountTypes);
  React.useEffect(() => {
    const fetchApi = async () => {
      const request = await fetch(
        "https://octarback.adgrouptech.com/api/home-page"
      );
      const res = await request.json();
      setData(res);
    };
    fetchApi();
  }, []);
  //console.log("err", err?.message);
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
  //console.log("watchPassword", watchPassword);
  if (watchPassword) {
    if (watchPassword.length < 8) {
    }
  }
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
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
        <div style={{ paddingBottom: "1rem" }}>
          <h1>Sing up</h1>
          <h2>Don’t have an account? Sign up now to get instant access!</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <label>Account type</label>
            <div className={styles.firstDivRadio}>
              {/* <div className={styles.inputDiv}>
                <div
                  className={`${styles.inputContainer} ${styles.inputContainerRadio}`}
                >
                  <input
                    type="radio"
                    {...register("account_type_id")}
                    value="1"
                  />
                  <label htmlFor="html">Individual account</label>
                </div>
              </div>
              <div className={styles.inputDiv}>
                <div
                  className={`${styles.inputContainer} ${styles.inputContainerRadio}`}
                >
                  <input
                    type="radio"
                    {...register("account_type_id")}
                    value="2"
                  />
                  <label htmlFor="html">School account</label>
                </div>
              </div> */}
              {accountTypes?.map((e: any) => {
                return (
                  <div className={styles.inputDiv} key={e?.id}>
                    <div
                      className={`${styles.inputContainer} ${styles.inputContainerRadio}`}
                    >
                      <input
                        type="radio"
                        {...register("account_type_id")}
                        value={e?.id}
                      />
                      <label htmlFor="html">{e?.title} account</label>
                    </div>
                  </div>
                );
              })}
            </div>
            <p style={{ width: "100%" }}>{errors.account_type_id?.message}</p>
          </div>
          <div className={styles.firstDiv}>
            <div className={styles.inputDiv}>
              <label htmlFor="first_name">First name</label>
              <div className={styles.inputContainer}>
                <input
                  {...register("first_name")}
                  placeholder="Enter your First name"
                  type="text"
                />
              </div>
              <p>{errors.first_name?.message}</p>
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor="last_name">Last name</label>
              <div className={styles.inputContainer}>
                <input
                  {...register("last_name")}
                  placeholder="Enter your Last name"
                  type="text"
                />
              </div>
              <p>{errors.last_name?.message}</p>
            </div>
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="phone">phone</label>
            <div className={styles.inputContainer}>
              <input
                {...register("phone")}
                type="text"
                placeholder="Enter your phone"
              />
            </div>
            <p>{errors.phone?.message}</p>
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputContainer}>
              <input
                {...register("email")}
                placeholder="Enter your email"
                type="text"
              />
            </div>
            <p>{errors.email?.message}</p>
          </div>
          <div className={styles.inputDiv}>
            <div className={styles?.password}>
              <h4>You password should contain all</h4>
              <p>
                {watchPassword?.length > 8 && (
                  <>
                    <CheckIcon />
                  </>
                )}
                8 characters long
              </p>
              <p>
                {/[A-Z]/.test(watchPassword) && (
                  <>
                    <CheckIcon />
                  </>
                )}
                should contain at-least 1 Uppercase
              </p>
              <p>
                {/[a-z]/.test(watchPassword) && (
                  <>
                    <CheckIcon />
                  </>
                )}
                should contain at-least 1 Lowercase
              </p>
              <p>
                {" "}
                {/[0-9]/.test(watchPassword) && (
                  <>
                    <CheckIcon />
                  </>
                )}
                should contain at-least 1 Numeric
              </p>
              <p>
                {" "}
                {/[#?!@$%^&*-]/.test(watchPassword) && (
                  <>
                    <CheckIcon />
                  </>
                )}
                should contain at-least 1 special character.
              </p>
            </div>
            <label htmlFor="password">Password</label>
            <div className={styles.inputContainer}>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <p>{errors.password?.message}</p>
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor="c_password">Confirm Password</label>
            <div className={styles.inputContainer}>
              <input
                {...register("c_password")}
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <p>{errors.c_password?.message}</p>
          </div>
          <div>
            <button type="submit" className={styles.signIin}>
              {loading ? "Loading..." : "Sign up"}
            </button>
          </div>
          <div className={styles.lastDiv}>
            <p>Already have an account?</p>
            <button onClick={() => setForm(1)}>Sign in</button>
          </div>
        </form>
        {/* {err} */}
        {mapForErr()}
      </div>
    </div>
    // </Modal>
  );
};

export default SignUp;
