"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100dvh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2>Page Not Found</h2>
      <p>Could not find requested resource</p>
      <Link
        style={{ color: "#9e32a4", fontSize: "3rem", fontWeight: "700" }}
        href="/"
      >
        Return Home
      </Link>
      <button onClick={() => router.back()}>Go back </button>
    </div>
  );
}
