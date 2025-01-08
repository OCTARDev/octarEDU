"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from "./style.module.scss";
import { toast } from "react-toastify";
import { mainUrl } from "@/lib";
import axios from "axios";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import CheckIcon from "@mui/icons-material/Check";
import Footer from "@/components/footer";
import NavBar from "@/components/navBar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { Grid, MenuItem, Select } from "@mui/material";
import {
  useGetCitiesQuery,
  useGetGovernmentsQuery,
  useGetStatesQuery,
  usePlaceOrderMutation,
} from "../../../../../../../redux/rtk/order";
import { watch } from "fs";
import { useGetIpQuery } from "@/redux/rtk/ip";

const DeliveryForm = ({
  register,
  errors,
  setCountry,
  setPhoneNO,
  control,
  watch,
}: any) => {
  const state = watch("state");
  const city = watch("city");
  const gouv = watch("government");
  //console.log("state", state);
  const { data: ip } = useGetIpQuery("");
  const {
    data: states,
    isLoading: statesLoading,
    isFetching: statesFetching,
  } = useGetStatesQuery(ip?.ip);
  const {
    data: cities,
    isLoading: citiesLoading,
    isFetching: citiesFetching,
  } = useGetCitiesQuery(state);
  const {
    data: governments,
    isLoading: governmentsLoading,
    isFetching: governmentsFetching,
  } = useGetGovernmentsQuery(city);
  //console.log("states", states?.data);
  //console.log("cities", cities?.data);
  //console.log("governments", governments?.data);
  //console.log("gouvgouvgouv", gouv);
  return (
    <div className={styles.formContainer}>
      <Grid container columns={12} spacing={2}>
        <Grid xs={12}>
          <h2>Deliver to</h2>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.inputDiv}>
            <label htmlFor="first_name">Name</label>
            <div className={styles.inputContainer}>
              <input
                {...register("user_name")}
                placeholder="Enter your Name"
                type="text"
              />
            </div>
            <p>{errors.user_name?.message}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.inputDiv}>
            <label htmlFor="phone">phone</label>
            <div className={styles.inputContainer}>
              <Controller
                control={control}
                name={"phone"}
                render={({ field: { value, onChange, ...field } }) => {
                  return (
                    <PhoneInput
                      country={"eg"}
                      //   value={state.phone}
                      //   onChange={phone => setState({ phone })}
                      // className={styles.phoneNumber}
                      inputStyle={{ width: "100%" }}
                      onChange={(
                        value: any,
                        country: any,
                        e: any,
                        formattedValue
                      ) => {
                        setCountry(`+${country?.dialCode}`);
                        setPhoneNO(value?.replace(`${country?.dialCode}`, ""));
                        onChange(
                          `+${country?.dialCode}${value?.replace(
                            `${country?.dialCode}`,
                            ""
                          )}`
                        );
                      }}
                    />
                  );
                }}
              />
            </div>
            <p>{errors.phone?.message}</p>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={styles.inputDiv}>
            <label htmlFor="email">Address</label>
            <div className={styles.inputContainer}>
              <input
                {...register("address")}
                placeholder="Enter your Address"
                type="text"
              />
            </div>
            <p>{errors.address?.message}</p>
          </div>
        </Grid>

        {/* <Grid item xs={12} md={6}>
          <div className={styles.inputDiv}>
            <label htmlFor="city">City</label>
            <div className={styles.inputContainer}>
              <input
                {...register("city")}
                placeholder="Enter your City"
                type="text"
              />
            </div>
            <p>{errors.city?.message}</p>
          </div>
        </Grid> */}
        <Grid item xs={12} md={6}>
          <div className={styles.inputDiv}>
            <label htmlFor="phone">States{statesLoading && "Loading..."}</label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register("state")}
              fullWidth
              size="small"
              sx={{ height: "2.1rem" }}
            >
              {states?.data?.map(
                (e: { id: number; name: string; country_id: number }) => {
                  return (
                    <MenuItem value={e.id} key={e?.id}>
                      {e.name}
                    </MenuItem>
                  );
                }
              )}
            </Select>
            {/* </div> */}
            <p>{errors.state?.message}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.inputDiv}>
            <label htmlFor="phone">
              Cities{citiesLoading || (citiesFetching && " Loading...")}
            </label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register("city")}
              fullWidth
              size="small"
              sx={{ height: "2.1rem" }}
            >
              {cities?.data?.map(
                (e: { id: number; name: string; state_id: number }) => {
                  return (
                    <MenuItem value={e.id} key={e?.id}>
                      {e.name}
                    </MenuItem>
                  );
                }
              )}
            </Select>
            {/* </div> */}
            <p>{errors.city?.message}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className={styles.inputDiv}>
            <label htmlFor="phone">
              Districts
              {governmentsLoading || (governmentsFetching && " Loading...")}
            </label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register("government")}
              fullWidth
              size="small"
              sx={{ height: "2.1rem" }}
            >
              {governments?.data?.map(
                (e: any | { id: number; name: string; country_id: number }) => {
                  return (
                    <MenuItem value={e} key={e?.id}>
                      {e.name}
                    </MenuItem>
                  );
                }
              )}
            </Select>
            {/* </div> */}
            <p>{errors.government?.message}</p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryForm;
