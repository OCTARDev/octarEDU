import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MAIN_URL } from "../MAIN_URL";
import { baseQuery } from "../helper/BaseQuery";

export const coloringCategories = createApi({
  reducerPath: "ColoringCategoriesApi",
  baseQuery,
  tagTypes: ["coloringCategories"],
  endpoints: (builder) => ({
    getColoringCategories: builder.query<any, any>({
      query: ({ lang, search, status }) => ({
        url: `category-user`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
        params: {
          search,
          status: status,
        },
        providesTags: ["coloringCategory"],
      }),
    }),
  }),
});

export const {
  useGetColoringCategoriesQuery,
  useLazyGetColoringCategoriesQuery,
} = coloringCategories;
