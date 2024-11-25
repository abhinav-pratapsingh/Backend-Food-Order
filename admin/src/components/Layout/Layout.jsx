import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
