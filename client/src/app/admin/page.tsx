"use client";

import { useRouter } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";

const AdminDashboard = () => {
  const router = useRouter();

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;
