import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/sections/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="grid min-h-[100vh]">
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
