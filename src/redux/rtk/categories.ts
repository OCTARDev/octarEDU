import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MAIN_URL } from "../MAIN_URL";

const baseQuery = fetchBaseQuery({
  baseUrl: MAIN_URL,
});

export const categories: any = createApi({
  reducerPath: "categories",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getcategories: builder.query<any, any>({
      query: (lang) => ({
        url: `products/help-data`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
    getMaincategories: builder.query<any, any>({
      query: (lang) => ({
        url: `products/categories`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
  }),
});

export const { useGetcategoriesQuery, useGetMaincategoriesQuery } = categories;
