import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MAIN_URL } from "../MAIN_URL";
import { baseQuery } from "../helper/BaseQuery";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery,
  tagTypes: ["cart"],
  endpoints: (builder) => ({
    getCartSubtotal: builder.query<any, any>({
      query: (lang) => ({
        url: `products/cart/subtotal`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation<any, any>({
      query: (body) => ({
        url: `products/cart/add-to-cart`,
        method: "post",
        body,
      }),
      invalidatesTags: ["cart"],
    }),
    getAllCart: builder.query<any, any>({
      query: (lang) => ({
        url: `products/cart/index`,
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
      providesTags: ["cart"],
    }),
    updateCart: builder.mutation<any, any>({
      query: ({ body, id }) => ({
        url: `products/cart/update-amount/${id}`,
        method: "put",
        body,
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCart: builder.mutation<any, any>({
      query: (id) => ({
        url: `products/cart/delete-item/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["cart"],
    }),
    getSingleProduct: builder.query<any, any>({
      query: ({ user_ip, id, lang }) => ({
        url: `products/show/${id}`,
        params: {
          user_ip,
        },
        headers: {
          "X-App-Locale": `${lang}`,
        },
      }),
      providesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartSubtotalQuery,
  useAddToCartMutation,
  useGetAllCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useGetSingleProductQuery,
} = cartApi;
