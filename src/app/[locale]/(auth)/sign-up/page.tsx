"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assets/logo.svg";
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
import SideImageComponent from "../_components/SideImage";
import Input from "@/shared/Input";
import { FaRegUser, FaSchool } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import PasswordInput from "../_components/PasswordInput";
import youtubeSVG from "@/assets/youtube.svg";



const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SingUp = () => {
  const dispatch = useDispatch();
  const t = useTranslations("signup");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const isArabic = pathname.includes("/ar");
  const [err, setErr] = useState<any>();
  const [phone, setPhoneNO] = React.useState<any>();
  const [country_code, setCountry] = React.useState<any>();
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
            /* console.log("heyooo",response?.data.data); */
            
            localStorage.setItem("octar", JSON.stringify(response?.data?.data));
          }
          dispatch(loginSuccess());
          // router.push(`/${lang}/dashboard/home`);
          router.push(`/${lang}/home`);
        })
        .catch(function (error) {
          setLoading(false);
          toast.error(t("error_occurred"));
          setErr(error.response.data);
        });
    } catch (e) {}
  };

  const [data, setData] = React.useState<any>();
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
  }, [lang]);

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
  //validation checks under password
  const validationChecks = [
    { regex: /.{8,}/, message: `${t("password.requirement_1")}` },
    { regex: /[A-Z]/, message: `${t("password.requirement_2")}` },
    { regex: /[a-z]/, message: `${t("password.requirement_3")}` },
    { regex: /[0-9]/, message: `${t("password.requirement_4")}` },
    { regex: /[@$!%*?&]/, message: `${t("password.requirement_5")}` },
  ];
  return (
    <div>
      <NavBar />
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-screen py-48 ${isArabic && "arabic"}`}>
      {/* left form */}
      <section className='flex flex-col gap-2 px-2'>
        <div className='flex-grow flex flex-col items-center justify-center md:pb-10'>
          <div className='flex flex-col gap-1 max-w-full'>
            <h2 className='text-base sm:text-2xl font-bold mt-6'>{t("createAccount")}</h2>
            <span className='text-start text-gray-500'>{t("des")}</span>
            {/* form */}
            <form className='mt-4 flex flex-col justify-center px-2 gap-4' onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* first name */}
                <Input
                register={register}
                icon={<FaRegUser size={18} className='text-gray-500'/>}
                id={"first_name"}
                placeholder={t("firstName.placeholder")}
                type={"text"}
                errors={errors}
                />
                {/* last name */}
                <Input 
                register={register}
                icon={<FaRegUser size={18} className='text-gray-500'/>}
                id={"last_name"}
                placeholder={t("lastName.placeholder")}
                type={"text"}
                errors={errors}
                />
              </div>
              
              
              {/* phone number */}
              <div>
              <label htmlFor="phone" >{t("phone")}</label>
              <div
                className="flex"
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
              {/* email */}
              <Input 
                id="email"
                placeholder={t("email.placeholder")}
                register={register}
                type={"email"}
                icon={<MdMailOutline size={18} className='text-gray-500 font-bold'/>}
                errors={errors}
              />
              {/* password */}
              <PasswordInput
              register={register}
              placeholder={t("password.placeholder")}
              id='password'
              errors={errors}
              />
              {/* Validations */}
              <ul className="mt-2 text-sm">
                {validationChecks.map((check, index) => (
                  <li key={index} className={check.regex.test(watchPassword) ? "text-green-500" : "text-red-500"}>
                    {check.message}
                  </li>
                ))}
              </ul>
              
              {/* confirm password */}
              <PasswordInput 
              register={register}
              placeholder={t("confirmPassword.placeholder")}
              id='c_password'
              errors={errors}
              />
              {/* submit button */}
              <div className='w-full mt-4'>
                <button 
                className='btn btn-primary w-full !py-3 !rounded-3xl' 
                title='submit' 
                type='submit'>
                  {loading ? t("loading") : t("signupButton")}
                </button>
              </div>
              {/* Link to login */}
              <div className='text-sm text-center flex gap-1'>
                <span>{t("alreadyHaveAccount.question")}</span>
                <Link className='text-[#9e32a4] underline' href={`/${lang}/login`}>{t("alreadyHaveAccount.action")}</Link>
              </div>
              {/* How To Register Video */}
              <div className="flex justify-center mt-2">
                <a 
                href={t("youtube_link")} 
                target="_blank" 
                className="border-2 w-fit px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                  <span>
                    <Image
                  src={youtubeSVG}
                  alt="youtube svg"
                  width={32}
                  height={32}
                  />
                  </span>
                  <span>{t("youtube_label")}</span>
                </a>
              </div>
            </form>
            {mapForErr()}
          </div>
          
        </div>
      </section>
      {/* right image */}
      <SideImageComponent />
    </div>
      <Footer />
    </div>
  );
};

export default SingUp;
