import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helper/BaseQuery";

export const userSubscription = createApi({
  reducerPath: "userSubscription",
  baseQuery: baseQuery,
  tagTypes: ["subscription"],

  endpoints: (builder) => ({
    getSubscriptionStatus: builder.query<any, any>({
      query: ({ lang, user_ip }) => ({
        url: `subscription`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
        params: {
          user_ip
        },
      }),
    }),


  }),
});

export const {
  useGetSubscriptionStatusQuery,
} = userSubscription;
