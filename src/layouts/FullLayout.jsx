import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/sections/Footer";
import Header from "../pages/sections/Header";

const FullLayout = () => {
  return (
    <>
      <div className="md:grid md:min-h-[100vh]">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default FullLayout;
