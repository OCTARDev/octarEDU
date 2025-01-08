import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helper/BaseQuery";

export const Songs = createApi({
  reducerPath: "Songs",
  baseQuery,
  tagTypes: ["song"],
  endpoints: (builder) => ({
    getSongs: builder.query<any, any>({
      query: (lang) => ({
        url: `songs?lang=all`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
      providesTags: ["song"],
    }),
  }),
});

export const { useGetSongsQuery } = Songs;
