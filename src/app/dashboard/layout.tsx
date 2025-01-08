"use client";

import DashHeader from "./components/header";
import styles from "./style.module.scss";
import DashNavBar from "./components/navBar";
import isAuth from "@/components/isAuth";
import { Suspense } from "react";
import Loader from "@/components/loader";

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <DashHeader></DashHeader>
      <div className={styles.container}>
        <div className={styles.nav}>
          <DashNavBar />
        </div>
        <div className={styles.children}>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
export default isAuth(RootLayout);
