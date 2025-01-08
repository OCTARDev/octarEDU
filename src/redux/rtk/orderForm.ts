import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  basicInfo: {},
};
const orderForm = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addBasicInfo(state: any, action: any) {
      state.basicInfo = action.payload;
    },
  },
});

export const { addBasicInfo } = orderForm.actions;
export default orderForm.reducer;
