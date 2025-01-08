import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userIP = createApi({
  reducerPath: "userIP",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getIp: builder.query<any, any>({
      query: (name) => ({
        url: `https://api.ipify.org`,
        params: {
          format: "json",
        },
      }),
    }),
  }),
});
export const { useGetIpQuery } = userIP;
