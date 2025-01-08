import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helper/BaseQuery";

export const Otp = createApi({
  reducerPath: "OTP",
  baseQuery,
  tagTypes: ["OTP"],
  endpoints: (builder) => ({
    verifyEmail: builder.mutation<any, any>({
      query: (body) => ({
        url: "auth-user/verify-email",
        method: "POST",
        body,
      }),
      invalidatesTags: ["OTP"],
    }),

    resendOTP: builder.mutation<any, any>({
      query: (body) => ({
        url: "auth-user/resend-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["OTP"],
    }),
  }),
});

export const { useResendOTPMutation, useVerifyEmailMutation } = Otp;
