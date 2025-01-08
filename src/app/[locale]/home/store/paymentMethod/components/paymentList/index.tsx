"use client";
import React, { useState } from "react";
import pay1 from "../../../../../../../assets/store/payment methods/image 23.png";
import pay2 from "../../../../../../../assets/store/payment methods/Frame 2123786442.png";
import pay3 from "../../../../../../../assets/store/payment methods/image 26.png";
import Image from "next/image";
import {
  FormControlLabel,
  Grid,
  Radio,
  TextField,
  styled,
} from "@mui/material";
import styles from "./style.module.scss";
import { Controller } from "react-hook-form";

const CustomRadio = styled(Radio)({
  "&.Mui-checked": {
    color: "#9E32A4",
    border: "1px soild #9E32A4",
  },
});

const PaymentList = ({
  helpData,
  register,
  errors,
  setCountry,
  setPhoneNO,
  control,
  watch,
  selectedMethod,
  setSelectedMethod,
}: any) => {
  const handleChange = (event: any) => {
    setSelectedMethod(event.target.value);
    console.log("event.target.value", event.target.value);
  };
  const watchPayment = watch("payment_method_id");
  const bill_imagePayment = watch("bill_image");
  const handleSubmit = () => {};
  return (
    <div className={styles.paymentContainer}>
      <h2>Choose payment method</h2>
      <form>
        {helpData?.data?.payment_methods?.map((e: any) => {
          return (
            <div key={e?.id}>
              <div className={styles.paymentOption}>
                <div>
                  <Controller
                    control={control}
                    name={"payment_method_id"}
                    render={({ field: { value, onChange, ...field } }) => {
                      return (
                        <FormControlLabel
                          value={e?.id}
                          control={
                            <CustomRadio
                              value={e?.id}
                              checked={
                                Number(watchPayment?.id) === Number(e?.id)
                              }
                              onChange={(event: any) => {
                                // onChange(JSON.stringify(event.target.value));
                                onChange(
                                  helpData?.data?.payment_methods.find(
                                    (option: any) =>
                                      option.id == event.target.value
                                  )
                                );
                                console.log(
                                  "Check",
                                  helpData?.data?.payment_methods.find(
                                    (option: any) =>
                                      option.id == event.target.value
                                  )
                                );
                              }}
                            />
                          }
                          label={e?.title}
                        />
                      );
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="3">
                    <Image
                      width={500}
                      height={200}
                      src={e?.media?.file_path}
                      alt="eWallet"
                      className={styles.icon}
                    />
                  </label>
                </div>
              </div>
              {Number(watchPayment?.id) === Number(e?.id) && (
                <>
                  {e?.type === "wallet" && (
                    <>
                      <div className={styles.walletContainer}>
                        <Grid container columns={12} spacing={2}>
                          <Grid item xs={12}>
                            <p className={styles.pay}>
                              Pay using Vodafone Cash through: {e?.phone}
                            </p>
                          </Grid>

                          <Grid item xs={12}>
                            <div className={styles.inputDiv}>
                              <label htmlFor="transfer_phone">phone</label>
                              <div className={styles.inputContainer}>
                                <TextField
                                  {...register("transfer_phone")}
                                  placeholder="Enter your phone"
                                  type="text"
                                  required
                                  size="small"
                                  fullWidth
                                />
                              </div>
                              <p className={styles.err}>
                                {errors.transfer_phone?.message}
                              </p>
                            </div>
                          </Grid>

                          <Grid item xs={12}>
                            <div className={styles.inputDiv}>
                              <label htmlFor="bill_image">Bill image</label>
                              <div className={styles.inputContainer}>
                                <Controller
                                  control={control}
                                  name={"bill_image"}
                                  render={({
                                    field: { value, onChange, ...field },
                                  }) => {
                                    return (
                                      <TextField
                                        {...field}
                                        name={"bill_image"}
                                        value={value?.fileName}
                                        onChange={(event: any) => {
                                          onChange(event.target.files[0]);
                                        }}
                                        type="file"
                                        id="picture"
                                      />
                                    );
                                  }}
                                />
                              </div>
                              <p className={styles.err}>
                                {errors.bill_image?.message}
                              </p>
                            </div>
                          </Grid>
                        </Grid>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
        <p className={styles.err}>{errors?.payment_method_id?.type?.message}</p>
      </form>
    </div>
  );
};

export default PaymentList;
