"use client";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import Header from "../checkout/components/header";
import pay1 from "../../../../../assets/store/payment methods/image 23.png";
import pay2 from "../../../../../assets/store/payment methods/Frame 2123786442.png";
import pay3 from "../../../../../assets/store/payment methods/image 26.png";
import Image from "next/image";
import { FormControlLabel, Radio, styled } from "@mui/material";
import OrderSummary from "./components/summary";
import PaymentList from "./components/paymentList";
import { useSelector } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetHelpDataQuery, usePlaceOrderMutation } from "@/redux/rtk/order";
import { useGetIpQuery } from "@/redux/rtk/ip";
import Loader from "@/components/loader";
import { useGetCartSubtotalQuery } from "@/redux/rtk/cart";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

const SUPPORTED_FORMATS = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webP ",
];

const PaymentMethodPage = () => {
  const [selectedMethod, setSelectedMethod] = useState();
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const t = useTranslations("store");
  const schema = yup.object({
    payment_method_id: yup
      .object({
        type: yup.string().required("Please select a method type"),
      })
      .required("Please select a method"),

    transfer_phone: yup.string().when("payment_method_id.type", {
      is: "wallet",
      then: (schema) => schema.required("phone is required"),
    }),
    bill_image: yup.mixed().when("payment_method_id.type", {
      is: "wallet",
      then: (schema) =>
        schema
          .required("A file is required")
          .test("fileType", "Unsupported file format", (value: any) => {
            if (!value) return true; // If no file is provided, don't perform validation
            return SUPPORTED_FORMATS.includes(value.type);
          }),
    }),
  });

  const { data: ip, isLoading: iploading } = useGetIpQuery("");
  const { data: cartData, isLoading: cartLoading } =
    useGetCartSubtotalQuery("");

  const params = {
    user_ip: ip?.ip,
  };
  const { data: helpData, isLoading } = useGetHelpDataQuery(params);
  const [placeOrder, { data: orderData, isLoading: orderLoading }] =
    usePlaceOrderMutation();
  const router = useRouter();

  const basicInfo = useSelector((state: any) => state?.orderForm);
  useEffect(() => {
    if (!basicInfo?.basicInfo?.address) {
      router.push("/home/store/checkout");
    }
  }, [basicInfo?.basicInfo?.address]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (orderData?.data?.url) {
      window?.open(orderData?.data?.url, "_self");
    }
  }, [orderData?.data?.url]);
  const watchPayment = watch("payment_method_id");
  const onSubmit = async (data: any) => {
    //console.log("datadata", data);
    const formData = new FormData();
    formData.append("payment_method_id", data?.payment_method_id?.id);
    formData.append("user_ip", ip?.ip);
    for (const property in basicInfo?.basicInfo) {
      if (
        typeof basicInfo?.basicInfo[property] === "object" &&
        basicInfo?.basicInfo[property] !== null
      ) {
        formData.append("delivery_fees", basicInfo?.basicInfo[property]?.price);
        formData.append("government", basicInfo?.basicInfo[property]?.name);
      } else {
        formData.append(`${property}`, basicInfo?.basicInfo[property]);
      }
    }
    if (watchPayment?.type === "wallet") {
      formData.append("transfer_phone", data?.transfer_phone);
      formData.append("bill_image", data?.bill_image);
    } else {
    }
    try {
      await placeOrder(formData).unwrap();
      await toast.success("Order has been placed");
    } catch (e: any) {
      Swal.fire({
        title: "Error",
        text: e?.data?.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  if (isLoading || iploading || cartLoading) {
    return <Loader />;
  }
  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <PaymentList
            helpData={helpData}
            register={register}
            errors={errors}
            control={control}
            watch={watch}
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
          />
          <OrderSummary cartData={cartData} orderLoading={orderLoading} />
        </div>
      </form>
    </>
  );
};

export default PaymentMethodPage;
