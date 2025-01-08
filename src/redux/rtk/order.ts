import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MAIN_URL } from "../MAIN_URL";
import { baseQuery } from "../helper/BaseQuery";

export const oderApi = createApi({
  reducerPath: "oderApi",
  baseQuery,
  tagTypes: ["order"],
  endpoints: (builder) => ({
    getHelpData: builder.query<any, any>({
      query: ({ user_ip }) => ({
        url: `products/order/help-data`,
        params: { user_ip: user_ip },
      }),
    }),
    placeOrder: builder.mutation<any, any>({
      query: (body) => ({
        url: `products/order/make-order`,
        method: "post",
        body,
      }),
    }),
    getStates: builder.query<any, any>({
      query: (user_ip) => ({
        url: `products/delivery-fees/index-states`,
        params: { user_ip },
      }),
    }),
    getCities: builder.query<any, any>({
      query: (state_id) => ({
        url: `products/delivery-fees/index-cities`,
        params: { state_id },
      }),
    }),
    getGovernments: builder.query<any, any>({
      query: (city_id) => ({
        url: `products/delivery-fees/index-governments`,
        params: { city_id },
      }),
    }),
  }),
});

export const {
  useGetHelpDataQuery,
  usePlaceOrderMutation,
  useGetCitiesQuery,
  useGetGovernmentsQuery,
  useGetStatesQuery,
} = oderApi;
