"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/hod/reports")}>Reports</button>
    </div>
  );
};

export default Page;
