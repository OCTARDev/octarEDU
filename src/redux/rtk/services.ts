import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MAIN_URL } from "../MAIN_URL";

const baseQuery = fetchBaseQuery({
  baseUrl: MAIN_URL,
});

export const servicesAPI: any = createApi({
  reducerPath: "servicesAPI",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getServiceCategories: builder.query<any, any>({
      query: (lang) => ({
        url: `/our-services/help-data`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
    getService: builder.query<any, any>({
      query: ({lang,id}) => ({
        url: `/our-services?category_id=${id}`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
  }),
});

export const { useGetServiceCategoriesQuery, useGetServiceQuery } = servicesAPI;
