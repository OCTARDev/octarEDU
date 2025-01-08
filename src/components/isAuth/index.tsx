"use client";
import { useEffect, useLayoutEffect } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";

const isAuthenticated = () => {
  try {
    if (typeof window !== "undefined") {
      const userData: any = localStorage.getItem("octar");
      return userData;
    }
  } catch (e) {
    //console.log("Error", e);
  }
};
export default function IsAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = isAuthenticated();
    const router = useRouter();
    const pathname: string = usePathname();
    const lang = pathname.split("/")[1];
    useLayoutEffect(() => {
      if (!auth) {
        return router.push(`/${lang}/home`);
      }
    }, []);

    if (!auth) {
      return;
    }

    return <Component {...props} />;
  };
}
