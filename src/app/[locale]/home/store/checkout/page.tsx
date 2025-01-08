"use client";
import React, { useState } from "react";
import DeliveryForm from "./components/deliveryForm";
import Header from "./components/header";
import styles from "./style.module.scss";
import OrderSummary from "./components/summary";
import { useForm } from "react-hook-form";
import { usePlaceOrderMutation } from "@/redux/rtk/order";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addBasicInfo } from "@/redux/rtk/orderForm";
import { useGetCartSubtotalQuery } from "@/redux/rtk/cart";
import Loader from "@/components/loader";
import Swal from "sweetalert2";
import { useTranslations } from "next-intl";

const CHeckOutPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [err, setErr] = useState<any>();
  const [phone, setPhoneNO] = React.useState<any>();
  const [country_code, setCountry] = React.useState<any>();
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");
  const lang = pathname.split("/")[1];
  const t = useTranslations("store");
  const schema = yup.object({
    user_name: yup.string().required("Name is required"),
    address: yup.string().required("address is required"),
    government: yup.object().required("government is required"),
    state: yup.string().required("state is required"),
    city: yup.string().required("city is required"),
    phone: yup.string().required("phone is required"),
  });
  const [placeOrder, { isLoading }] = usePlaceOrderMutation();
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
  const dispatch = useDispatch();
  const { data, isLoading: subTotalLoading } = useGetCartSubtotalQuery("");
  const basicInfo = useSelector((state: any) => state?.orderForm);
  //console.log("basicInfo", basicInfo);
  const subTotal = data?.data?.subtotal;
  const gouv = watch("government");
  //console.log("gouvgouvgouv", gouv);
  const onSubmit = async (data: any) => {
    // setLoading(true);
    // setErr("");
    const sendData = {
      ...data,
      country_code,
      phone: `${country_code}${phone}`,
    };
    try {
      //console.log("sendData", sendData);
      dispatch(addBasicInfo(sendData));
      if (subTotal > 0) {
        router.push(`/${lang}/home/store/paymentMethod`);
      } else {
        Swal.fire({
          title: "No item selected",
          text: "You need to select items",
          icon: "warning",
          confirmButtonText: "OK",
        }).then((result: any) => {
          if (result.isConfirmed) {
            router.push(`/${lang}/home/store`);
          }
        });
      }
    } catch (e: any) {
      // await placeOrder({ ...sendData }).unwrap();
      Swal.fire({
        title: "Error",
        text: e?.data?.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };
  if (subTotalLoading) {
    return <Loader />;
  }
  //console.log("Err", errors);
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.container}>
          <DeliveryForm
            register={register}
            errors={errors}
            setCountry={setCountry}
            setPhoneNO={setPhoneNO}
            control={control}
            watch={watch}
          />
          <OrderSummary data={data} gouv={gouv} />
        </div>
      </form>
    </div>
  );
};

export default CHeckOutPage;
