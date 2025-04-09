import { configureStore } from "@reduxjs/toolkit";
import { categories } from "../rtk/categories";
import { products } from "../rtk/products";
import { userIP } from "../rtk/ip";
import { cartApi } from "../rtk/cart";
import { authApi } from "../rtk/auth";
import authReducer from "../reducers/auth/authSlice";
import shouldRedirectToOtp from "../reducers/navigation";
import { oderApi } from "../rtk/order";
import orderForm from "../rtk/orderForm";
import { categoriesBeforeLogin } from "../rtk/categoriesBeforeLogin";
import { homePageData } from "../rtk/homePage";
import { Songs } from "../rtk/songs";
import { Activity } from "../rtk/activity";
import { Otp } from "../rtk/otp";
import { coloringCategories } from "../rtk/coloringCategories";
import { navigationMiddleware } from "../middleware";
import { Profile } from "../rtk/profile";

export const makeStore: any = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      navigation: shouldRedirectToOtp,
      orderForm: orderForm,
      [categories.reducerPath]: categories.reducer,
      [products.reducerPath]: products.reducer,
      [userIP.reducerPath]: userIP.reducer,
      [cartApi.reducerPath]: cartApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [oderApi.reducerPath]: oderApi.reducer,
      [categoriesBeforeLogin.reducerPath]: categoriesBeforeLogin.reducer,
      [homePageData.reducerPath]: homePageData.reducer,
      [Songs.reducerPath]: Songs.reducer,
      [Activity.reducerPath]: Activity.reducer,
      [Otp.reducerPath]: Otp.reducer,
      [coloringCategories.reducerPath]: coloringCategories.reducer,
      [Profile.reducerPath]:Profile.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        categories.middleware,
        products.middleware,
        userIP.middleware,
        cartApi.middleware,
        oderApi.middleware,
        authApi.middleware,
        categoriesBeforeLogin.middleware,
        homePageData.middleware,
        Songs.middleware,
        Activity.middleware,
        Otp.middleware,
        coloringCategories.middleware,
        Profile.middleware
        // navigationMiddleware
      ),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
