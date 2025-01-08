"use client";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  data: any | null;
}

const data =
  typeof window !== "undefined"
    ? localStorage?.getItem("octar")
      ? JSON.parse(localStorage?.getItem("octar") || "")
      : null
    : false;

const initialState: AuthState = {
  data: data,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.data =
        typeof window !== "undefined"
          ? localStorage?.getItem("octar")
            ? JSON.parse(localStorage?.getItem("octar") || "")
            : null
          : false;
    },
    logOut: (state) => {
      state.data = null;
      typeof window !== "undefined" && localStorage?.removeItem("octar");
    },
  },
});

export const { loginSuccess, logOut } = authSlice.actions;

export default authSlice.reducer;
