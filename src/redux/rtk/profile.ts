import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helper/BaseQuery";

export const Profile = createApi({
  reducerPath: "Profile",
  baseQuery,
  tagTypes: ["profile","help"],
  endpoints: (builder) => ({
    getProfile: builder.query<any, void>({
      query: () => ({
        url: "user/show",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    getHelp: builder.query<any, void>({
      query: () => ({
        url: "auth-user/help-data",
        method: "GET",
      }),
      providesTags: ["profile","help"],
    }),
    updateProfile:builder.mutation<any,any>({
        query:(body)=>({
            url:"user/update",
            method: "PUT",
            body,
        }),
        invalidatesTags:["profile"]
    }),
    updatePassword:builder.mutation<any,any>({
        query:(body)=>({
            url:"user/reset-password",
            method: "PUT",
            body,
        }),
    }),
  }),
});

export const { useGetProfileQuery , useGetHelpQuery , useUpdateProfileMutation , useUpdatePasswordMutation} = Profile;
