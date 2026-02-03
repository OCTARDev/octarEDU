"use client";
import React, { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import animation from "../../../../../../../Animation - 1727215150499.json";
import LottieContainer from "@/animation/lottie";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useSubscriptionContactUsMutation } from "@/redux/rtk/contactNursery";
import { toast } from "react-toastify";
import { MenuItem, Select } from "@mui/material";

const number_students = [
  {
    id:1,
    name:"15-30 students"
  },
  {
    id:2,
    name:"31-60 students"
  },
  {
    id:3,
    name:"61-100 students"
  },
  {
    id:4,
    name:"100+ students"
  },
  
]

const Email = () => {
  const pathname: string = usePathname();
  const lang = pathname.split("/")[1];
  const [loading, setLoading] = useState(false);
  const  [sendContactForm,{isSuccess,isError,error}] = useSubscriptionContactUsMutation();
  const isArabic = pathname.includes("/ar");
  const t = useTranslations("emailInquiry");
  const methods: any = useForm({
    mode: "onChange",
    defaultValues:{
      country:"",
      number_students:""
    }
  });
  const { register } = methods;
  const handleSubmit = async (data: any) => {
    setLoading(true);
    await sendContactForm(data);
  };
  useEffect(()=>{
    if(isSuccess){
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your question has been sent successfully!",
        });
        methods.reset();
        setLoading(false);
    }
    if(isError){
      const errorMessage =
        error && "status" in error
        ? (error.data as { message?: string })?.message ??
          "Failed to send your question. Please try again later."
        : error?.message ?? "Unexpected error occurred";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
      setLoading(false);
      console.error("Error sending question:", error);
    }

  },[isSuccess,isError,error]);
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
  console.log("watch", methods.watch("country"));
  return (
    <div className={`${styles.emailContainer} ${isArabic && "arabic"}`}>
      <div className={styles.contnet}>
        <div className={styles.leftDiv}>
          <LottieContainer animation={animation} loop={true} />
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex-grow px-4">
            <div className={styles.rightDiv}>
              <a href="mailto:hello@adgrouptech.com" target="_blank">
                hello@adgrouptech.com
              </a>
              <h1>{t("inquiry")}</h1>
              <p>{t("leave")}</p>

              {/* Nursery Name Field */}
              <div>
                <label htmlFor="name">{t("nursery_name")}</label>
                <input
                  type="text"
                  {...register("nursery_name", { required: "Nursery Name is required" })}
                />
                {methods.formState.errors.nursery_name && (
                  <p className="error">
                    {methods.formState.errors.nursery_name.message}
                  </p>
                )}
              </div>



              {/* Country Field */}
              <div className="">
                <label htmlFor="phone">{t("country")}</label>
                <Select defaultValue={""}  {...register("country")} fullWidth size="small" className="bg-white p-2 rounded-xl shadow-[2.5px_3px_0_#000] !outline-[0px] !border-black">
                      <MenuItem  value="" disabled>
                        {t("country")}
                      </MenuItem>
                  {countries?.map((e: any, index: number) => {
                    return (
                      <MenuItem value={e?.name} key={index}>
                        {e?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>

              {/* Contact Person Field */}
              <div>
                <label htmlFor="name">{t("contact_person_name")}</label>
                <input
                  type="text"
                  {...register("contact_person_name", { required: "Contact Person is required" })}
                />
                {methods.formState.errors.contact_person_name && (
                  <p className="error">
                    {methods.formState.errors.contact_person_name.message}
                  </p>
                )}
              </div>


              {/* Email Field */}
              <div>
                <label htmlFor="email">{t("email")}</label>
                <input
                  type="text"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {methods.formState.errors.email && (
                  <p className="error">
                    {methods.formState.errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone">{t("phone")}</label>
                <input
                  type="text"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {methods.formState.errors.phone && (
                  <p className="error">
                    {methods.formState.errors.phone.message}
                  </p>
                )}
              </div>

              {/* Number Student Field */}
              <div>
                <label htmlFor="phone">{t("number_student")}</label>
                <Select {...register("number_student")} fullWidth size="small" className="bg-white p-2 rounded-xl shadow-[2.5px_3px_0_#000] !outline-[0px] !border-black">
                  {number_students?.map((e: any, index: number) => {
                    return (
                      <MenuItem value={e?.name} key={index}>
                        {e?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
              {/* Details Field */}
              <div>
                <label htmlFor="details">{t("details")}</label>
                <textarea
                  {...register("details", {
                    required: "Details is required",
                  })}
                />
                {methods.formState.errors.details && (
                  <p className="error">
                    {methods.formState.errors.details.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button type="submit" disabled={loading}>
                  {loading ? "Sending...." : "Send"}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Email;
