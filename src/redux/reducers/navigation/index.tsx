import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",
  initialState: { shouldRedirectToOtp: false },
  reducers: {
    redirectToOtp: (state) => {
      state.shouldRedirectToOtp = true;
    },
    resetRedirect: (state) => {
      state.shouldRedirectToOtp = false;
    },
  },
});

export const { redirectToOtp, resetRedirect } = navigationSlice.actions;
export default navigationSlice.reducer;
