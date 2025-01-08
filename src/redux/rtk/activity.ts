import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helper/BaseQuery";

export const Activity = createApi({
  reducerPath: "Activity",
  baseQuery: baseQuery,
  tagTypes: ["activity"],

  endpoints: (builder) => ({
    getActivites: builder.query<any, any>({
      query: ({ lang, page, search, status }) => ({
        url: `coloring-activities`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
        params: {
          page,
          search,
          status,
        },
      }),
    }),
    getParentGuides: builder.query<any, any>({
      query: ({ lang, page, search, status }) => ({
        url: `parent-guides`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
        params: {
          page,
          search,
          status,
        },
      }),
    }),
    getSingleParentGuides: builder.query<any, any>({
      query: ({ lang, page, search, status, id }) => ({
        url: `parent-guides/sub-guides/${id}`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
        params: {
          page,
          search,
          status,
        },
      }),
    }),
  }),
});

export const {
  useGetActivitesQuery,
  useGetParentGuidesQuery,
  useGetSingleParentGuidesQuery,
} = Activity;
