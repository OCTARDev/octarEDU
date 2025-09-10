import { toast } from "react-toastify";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MAIN_URL } from "../MAIN_URL";
import { RootState } from "../store";
import { logOut } from "../reducers/auth/authSlice";
import Swal from "sweetalert2";
import { redirectToOtp } from "../reducers/navigation";

export const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const baseQueryFunction = fetchBaseQuery({
    baseUrl: MAIN_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth?.data?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  });

  const result = await baseQueryFunction(args, api, extraOptions);

  if (result.error && (result.error as any).status === 401) {
    api.dispatch(logOut());
    return {
      error: {
        status: 401,
        data: "Unauthorized - Redirecting to login",
      },
    };
  }

  if (result.error && (result.error as any).status === 403) {
    Swal.fire({
      title: "You need to verify your email",
      icon: "warning",
      confirmButtonText: "Ok",
    }).then((swalResult) => {
      if (swalResult.isConfirmed) {
        api.dispatch(redirectToOtp()); // Dispatch the action to trigger redirect
      }
    });

    toast.error("You need to verify your email");
    return {
      error: {
        status: 403,
        data: "",
      },
    };
  }

  if (result.error && (result.error as any).status === 500) {
    toast.error("Internal Server Error");
    return {
      error: {
        status: 500,
        data: "",
      },
    };
  }

  return result;
};
