import { Middleware } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import { redirectToOtp } from "../reducers/navigation/index.jsx";

// Define a custom middleware
export const navigationMiddleware: Middleware =
  (storeAPI) => (next) => (action: any) => {
    if (action.type === redirectToOtp.type) {
      const router = useRouter();
      router.push("/en/otp");
    }

    return next(action);
  };
