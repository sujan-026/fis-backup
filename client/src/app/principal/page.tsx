"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/principal/reports")}>Reports</button>
    </div>
  );
};

export default Page;
