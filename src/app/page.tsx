import LandPage from "@/components/landingPage";
import { Suspense } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("en/home");

  return <div>{/* <LandPage /> */}</div>;
}
