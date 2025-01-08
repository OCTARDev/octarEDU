"use client";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import animation from "../../../../../../../Animation - 1727215150499.json";
import LottieContainer from "@/animation/lottie";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
const Email = () => {
  const pathname: string = usePathname();
  const [loading, setLoading] = useState(false);

  const isArabic = pathname.includes("/ar");
  const t = useTranslations("emailInquiry");
  const methods: any = useForm({
    mode: "onChange",
  });
  const { register } = methods;
  const handleSubmit = async (data: any) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "https://octarback.adgrouptech.com/api/home-page/contact-us/send-question",
        data
      );

      // Handle success
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Your question has been sent successfully!",
        });
        methods.reset();
      } else {
        throw new Error("Unexpected response");
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send your question. Please try again later.";
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
      console.error("Error sending question:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log("watch", methods.watch("subject"));
  return (
    <div className={`${styles.emailContainer} ${isArabic && "arabic"}`}>
      <div className={styles.contnet}>
        <div className={styles.leftDiv}>
          <div>
            <LottieContainer animation={animation} loop={true} />
            <a href="mailto:hello@adgrouptech.com" target="_blank">
              hello@adgrouptech.com
            </a>
          </div>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <div className={styles.rightDiv}>
              <h1>{t("inquiry")}</h1>
              <p>{t("leave")}</p>

              {/* Name Field */}
              <div>
                <label htmlFor="name">{t("name")}</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                />
                {methods.formState.errors.name && (
                  <p className="error">
                    {methods.formState.errors.name.message}
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

              {/* Subject Field */}
              <div>
                <label htmlFor="subject">{t("subject")}</label>
                <select
                  {...register("subject", { required: "Subject is required" })}
                >
                  <option value="Customer Support">Customer Support</option>
                  <option value="Educational partnership">
                    Educational partnership
                  </option>
                  <option value="Business Relationship">
                    Business Relationship
                  </option>
                  <option value="Content Suggestion">Content Suggestion</option>
                  <option value="App Feedback">App Feedback</option>
                </select>
                {methods.formState.errors.subject && (
                  <p className="error">
                    {methods.formState.errors.subject.message}
                  </p>
                )}
              </div>

              {/* Question Field */}
              <div>
                <label htmlFor="question">{t("question")}</label>
                <textarea
                  {...register("question", {
                    required: "Question is required",
                  })}
                />
                {methods.formState.errors.question && (
                  <p className="error">
                    {methods.formState.errors.question.message}
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
