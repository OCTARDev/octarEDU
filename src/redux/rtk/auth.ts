import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MAIN_URL } from "../MAIN_URL";

const baseQuery = fetchBaseQuery({
  baseUrl: MAIN_URL,
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<any, any>({
      query: (body) => ({
        url: "auth-user/login-user",
        method: "POST",
        body,
      }),
    }),

  }),
});

export const { useLoginMutation  } = authApi;
