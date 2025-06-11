"use client";

import DashHeader from "./components/header";
import styles from "./style.module.scss";
import DashNavBar from "./components/navBar";
import IsAuth from "@/components/isAuth";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { usePathname } from "next/navigation";
import RedirectHandler from "@/components/redirectComponent";
import { useSelector } from "react-redux";
import VerifyWarning from "@/components/VerifyWarning";

function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname: string = usePathname();
  const isArabic = pathname.includes("/ar");

  const userData = useSelector((state:any)=>state?.auth?.data);
  
  return (
    <>
    {
      !userData?.user?.email_verified_at && 
      <VerifyWarning />
    }
      <DashHeader/>
      <div className={`${styles.container} ${isArabic ? "arabic" : ""}`}>
        <div className={styles.nav}>
          <DashNavBar />
        </div>
        <div className={styles.children}>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </div>
      </div>
      <RedirectHandler />
    </>
  );
}
export default IsAuth(RootLayout);
