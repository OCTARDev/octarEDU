import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MAIN_URL } from "../MAIN_URL";
import { baseQuery } from "../helper/BaseQuery";

export const codeCategories = createApi({
  reducerPath: "CodeCategoriesApi",
  baseQuery,
  tagTypes: ["codeCategories"],
  endpoints: (builder) => ({
    getCodeCategories: builder.query<any, any>({
      query: ( lang ) => ({
        url: `code-products/categories`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
        providesTags: ["codeCategories"],
      }),
    }),
    addCodeCategory: builder.mutation<any, { code: string; lang: string }>({
    query: ({ code, lang }) => ({
      url: `code-products/apply`,
      method: 'POST',
      body: { code },
      headers: {
        'Content-Type': 'application/json',
        'X-App-Locale': lang,
      },
    }),
    invalidatesTags: ["codeCategories"], // auto-refetch list
  }),
  }),
});

export const {
  useGetCodeCategoriesQuery,
  useAddCodeCategoryMutation
  
} = codeCategories;
