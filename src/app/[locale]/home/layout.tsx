"use client";
import Footer from "@/components/footer";
import NavBar from "@/components/navBar";
import RedirectHandler from "@/components/redirectComponent";
import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "Octar",
  description: "Learning through Imagination",
};
const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <ToastContainer />
      <NavBar></NavBar>
      {children}
      <Footer />
      <RedirectHandler />
    </div>
  );
}
