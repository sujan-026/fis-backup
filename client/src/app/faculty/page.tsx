"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import Header from "@/components/dashboard/Header";
// import NavBar from "@/components/NavBar";

const Page = () => {
  
  return (
    <div className="min-h-screen">
      <Header />
      {/* <NavBar title="Dashboard" navLinksHome="Home"/> */}
      <Dashboard />
    </div>
  );
};

export default Page;
