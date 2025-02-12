"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./style.module.scss";
import { toast } from "react-toastify";
import { mainUrl } from "@/lib";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import CheckIcon from "@mui/icons-material/Check";
import Footer from "@/components/footer";
import NavBar from "@/components/navBar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { Box, MenuItem, Modal, Select, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/redux/reducers/auth/authSlice";

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
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SingUp = () => {
  const dispatch = useDispatch();
  const t = useTranslations("signup");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const [otp, setOtp] = useState("");
  const isArabic = pathname.includes("/ar");
  const [err, setErr] = useState<any>();
  const [phone, setPhoneNO] = React.useState<any>();
  const [country_code, setCountry] = React.useState<any>();
  const [show, setShow] = React.useState<boolean>(false);
  const [showC, setShowC] = React.useState<boolean>(false);
  const schema = yup.object({
    first_name: yup.string().required(t("firstName.required")),
    last_name: yup.string().required(t("lastName.required")),
    country: yup.string().required(t("country_required")),
    email: yup.string().required(t("email.required")).email(t("valid_email")),

    password: yup
      .string()
      .required(t("password.required"))
      .min(8, t("password.requirement_1"))
      .matches(/[a-z]/, t("password.requirement_3"))
      .matches(/[A-Z]/, t("password.requirement_2"))
      .matches(/[0-9]/, t("password.requirement_4"))
      .matches(/[#?!@$%^&*-]/, t("password.requirement_5")),

    c_password: yup
      .string()
      .required(t("confirmPassword.required"))
      .oneOf([yup.ref("password")], t("password_match")),

    // account_type_id: yup
    //   .string()
    //   .required(t("account_type.required"))
    //   .oneOf(["1", "2"], t("account_type_valid")),
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
    const sendData = {
      ...data,
      country_code,
      phone,
      account_type_id: 1,
    };
    try {
      await axios
        .post(`${mainUrl}/auth-user/register-user`, {
          ...sendData,
        })
        .then(function (response: any) {
          setLoading(false);
          toast.success(t("account_created"));
          if (typeof window !== "undefined") {
            console.log("heyooo",response?.data.data);
            
            localStorage.setItem("octar", JSON.stringify(response?.data?.data));
          }
          dispatch(loginSuccess());
          // router.push(`/${lang}/dashboard/home`);
          router.push(`/${lang}/otp`);
        })
        .catch(function (error) {
          setLoading(false);
          toast.error(t("error_occurred"));
          setErr(error.response.data);
        });
    } catch (e) {}
  };
  const handleOpt = () => {};
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = React.useState<any>();
  const accountTypes = data?.data?.account_types;
  const countries = data?.data?.countries;
  React.useEffect(() => {
    const fetchApi = async () => {
      const request = await fetch(
        "https://octarback.adgrouptech.com/api/auth-user/help-data",
        {
          headers: {
            "X-App-Locale": lang,
          },
        }
      );
      const res = await request.json();
      setData(res);
    };
    fetchApi();
  }, []);

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

  return (
    <div>
      <NavBar />
      <div className={`${styles.loginContainer} ${isArabic && "arabic"}`}>
        <div className={styles.content}>
          <div style={{ paddingBottom: "1rem" }}>
            <h1>{t("createAccount")}</h1>
            <h2>{t("des")}</h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <label>{t("accountType.label")}</label>
              <div className={styles.firstDivRadio}>
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
                          disabled={e?.id === 2 ? true : false}
                        />
                        <label htmlFor="html">
                          {isArabic ? e?.title_ar : e?.title_en}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p style={{ width: "100%" }}>{errors.account_type_id?.message}</p>
            </div> */}
            <div className={styles.firstDiv}>
              <div className={styles.inputDiv}>
                <label htmlFor="first_name">{t("firstName.label")}</label>
                <div className={styles.inputContainer}>
                  <input
                    {...register("first_name")}
                    placeholder={t("firstName.placeholder")}
                    type="text"
                  />
                </div>
                <p>{errors.first_name?.message}</p>
              </div>
              <div className={styles.inputDiv}>
                <label htmlFor="last_name">{t("lastName.label")}</label>
                <div className={styles.inputContainer}>
                  <input
                    {...register("last_name")}
                    placeholder={t("lastName.placeholder")}
                    type="text"
                  />
                </div>
                <p>{errors.last_name?.message}</p>
              </div>
            </div>

            <div className={styles.inputDiv}>
              <label htmlFor="phone">{t("phone")}</label>
              <div
                className={styles.inputContainer}
                style={{ direction: "ltr", textAlign: "left" }}
              >
                <PhoneInput
                  country={"us"}
                  onChange={(value: any, country: any) => {
                    setCountry(`+${country?.dialCode}`);
                    setPhoneNO(value?.replace(`${country?.dialCode}`, ""));
                  }}
                  inputClass={styles["custom-phone-input"]}
                />
              </div>
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor="phone">{t("country.label")}</label>
              <Select {...register("country")} fullWidth size="small">
                {countries?.map((e: any, index: number) => {
                  return (
                    <MenuItem value={e?.name} key={index}>
                      {e?.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor="email">{t("email.label")}</label>
              <div className={styles.inputContainer}>
                <input
                  {...register("email")}
                  placeholder={t("email.placeholder")}
                  type="text"
                />
              </div>
              <p>{errors.email?.message}</p>
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor="password">{t("password.label")}</label>
              <div className={styles.inputContainer}>
                <input
                  {...register("password")}
                  type={show ? "text" : "password"}
                  placeholder={t("password.placeholder")}
                />
                <button
                  onClick={() => setShow(!show)}
                  className={styles.eye}
                  type="button"
                  style={{ left: isArabic ? 12 : "95%" }}
                >
                  {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>

              <div className={styles.password}>
                <p
                  className={
                    watchPassword?.length >= 8 ? styles.correct : styles.err
                  }
                >
                  {watchPassword?.length >= 8 && <CheckIcon />}
                  {t("password.requirement_1")}
                </p>
                <p
                  className={
                    /[A-Z]/.test(watchPassword) ? styles.correct : styles.err
                  }
                >
                  {/[A-Z]/.test(watchPassword) && <CheckIcon />}
                  {t("password.requirement_2")}
                </p>
                <p
                  className={
                    /[a-z]/.test(watchPassword) ? styles.correct : styles.err
                  }
                >
                  {/[a-z]/.test(watchPassword) && <CheckIcon />}
                  {t("password.requirement_3")}
                </p>
                <p
                  className={
                    /[0-9]/.test(watchPassword) ? styles.correct : styles.err
                  }
                >
                  {/[0-9]/.test(watchPassword) && <CheckIcon />}
                  {t("password.requirement_4")}
                </p>
                <p
                  className={
                    /[#?!@$%^&*-]/.test(watchPassword)
                      ? styles.correct
                      : styles.err
                  }
                >
                  {/[#?!@$%^&*-]/.test(watchPassword) && <CheckIcon />}
                  {t("password.requirement_5")}
                </p>
              </div>
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor="c_password">{t("confirmPassword.label")}</label>
              <div className={styles.inputContainer}>
                <input
                  {...register("c_password")}
                  type={showC ? "text" : "password"}
                  placeholder={t("confirmPassword.placeholder")}
                />
                <button
                  onClick={() => setShowC(!showC)}
                  className={styles.eye}
                  type="button"
                  style={{ left: isArabic ? 12 : "95%" }}
                >
                  {show ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>
              <p>{errors.c_password?.message}</p>
            </div>
            <div>
              <button type="submit" className={styles.signIin}>
                {loading ? t("loading") : t("signupButton")}
              </button>
            </div>
            <div className={styles.lastDiv}>
              <p>{t("alreadyHaveAccount.question")}</p>
              <Link href={`/${lang}/login`}>
                <button>{t("alreadyHaveAccount.action")}</button>
              </Link>
            </div>
          </form>
          {mapForErr()}
        </div>
      </div>
      {/* <div className={styles.otp}> */}

      {/* </div> */}
      <Footer />
    </div>
  );
};

export default SingUp;
