import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helper/BaseQuery";

export const SubscriptionsAPI = createApi({
  reducerPath: "SubscriptionsAPI",
  baseQuery,
  endpoints: (builder) => ({

    SubscriptionContactUs:builder.mutation<any,any>({
        query:(body)=>({
            url:"/contact-nursery/store",
            method: "POST",
            body,
        }),
    }),
  }),
});

export const { useSubscriptionContactUsMutation} = SubscriptionsAPI;
