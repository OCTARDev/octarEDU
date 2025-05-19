import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MAIN_URL } from "../MAIN_URL";

const baseQuery = fetchBaseQuery({
  baseUrl: MAIN_URL,
});

export const categoriesBeforeLogin = createApi({
  reducerPath: "categoriesBeforeLogin",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getCategoriesBeforeLogin: builder.query({
      query: ({ status, search, lang }) => ({
        url: `/category-page`,
        params: { status, search },
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
  }),
});

export const {
  useGetCategoriesBeforeLoginQuery,
  useLazyGetCategoriesBeforeLoginQuery,
} = categoriesBeforeLogin;
