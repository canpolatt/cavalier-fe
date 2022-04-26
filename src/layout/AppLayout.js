import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AppLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default AppLayout;
