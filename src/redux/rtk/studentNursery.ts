import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../helper/BaseQuery";

export const StudentNurseryAPI = createApi({
  reducerPath: "StudentNurseryAPI",
  baseQuery,
  tagTypes: ["index","show"],
  endpoints: (builder) => ({

    NurseryIndex:builder.query<any, any>({
      query: ({search,page}) => ({
        url: `/nursery-students`,
        params:{
            search,
            page    
        }
      }),
      providesTags: ["index"],
    }),
    nurseryShow:builder.query<any,any>({
      query: (id) => ({
        url: `/nursery-students/show/${id}`,
      }),
      providesTags: ["show"],
    }),
    deleteNursery: builder.mutation<any, any>({
      query: (id) => ({
        url: `nursery-students/delete/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["index"],
    }),
    changeStatusNursery: builder.mutation<any, any>({
      query: (id) => ({
        url: `nursery-students/change-status/${id}`,
        method: "put",
      }),
      invalidatesTags: ["index"],
    }),
    storeNursery: builder.mutation<any, any>({
      query: (data) => ({
        url: `nursery-students/store`,
        method: "post",
        body:data
      }),
    }),
    updateNursery: builder.mutation<any, any>({
      query: ({id,...data}) => ({
        url: `/nursery-students/update/${id}`,
        method: "put",
        body:data
      }),
    }),
  }),
});

export const { useNurseryIndexQuery , useNurseryShowQuery , useDeleteNurseryMutation , useChangeStatusNurseryMutation , useStoreNurseryMutation , useUpdateNurseryMutation } = StudentNurseryAPI;