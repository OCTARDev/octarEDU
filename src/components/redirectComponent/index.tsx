"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { resetRedirect } from "@/redux/reducers/navigation";
import { usePathname, useRouter } from "next/navigation";

const RedirectHandler = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathName = usePathname();
  const shouldRedirect = useSelector(
    (state: RootState) => state.navigation.shouldRedirectToOtp
  );
  useEffect(() => {
    if (shouldRedirect) {
      router.push("/en/otp");
    }
  }, [shouldRedirect, router]);

  // Reset shouldRedirectToOtp when the pathname changes

  useEffect(() => {
    dispatch(resetRedirect());
  }, [pathName, router, dispatch]);

  /* console.log("shouldRedirect", shouldRedirect); */

  return null;
};

export default RedirectHandler;
