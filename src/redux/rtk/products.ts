import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MAIN_URL } from "../MAIN_URL";

const baseQuery = fetchBaseQuery({
  baseUrl: MAIN_URL,
});

export const products: any = createApi({
  reducerPath: "products",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query<any, any>({
      query: ({ user_ip, category_ids, age_from, age_to, lang }) => ({
        url: `products/index?user_ip=${user_ip}&age_from=${age_from}&age_to=${age_to}${
          category_ids ? `&${category_ids}` : ""
        }`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
    getSingleProduct: builder.query<any, any>({
      query: ({ user_ip, id, lang }) => ({
        url: `products/show/${id}`,
        params: {
          user_ip,
        },
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetSingleProductQuery } = products;
