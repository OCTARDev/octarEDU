import { mainUrl } from "@/lib";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const homePageData = createApi({
  reducerPath: "homePageData",
  baseQuery: fetchBaseQuery({ baseUrl: mainUrl }),
  endpoints: (builder) => ({
    getHome: builder.query<string, string>({
      query: (lang) => ({
        url: `/home-page`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
    getFaqs: builder.query<string, string>({
      query: (lang) => ({
        url: `/home-page/help`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
    getSingleFaq: builder.query<string, string>({
      query: (lang) => ({
        url: `/home-page/help`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
    getBlogs: builder.query<any, any>({
      query: (lang) => ({
        url: `/blogs`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
    getSingleBlog: builder.query<any, any>({
      query: (lang) => ({
        url: `/home-page/help`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetFaqsQuery, useGetHomeQuery, useGetBlogsQuery } =
  homePageData;
