import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import LoginPopUp from "../loginPopUp/LoginPopUp";
import RestaurentAdd from "../RestaurentAdd/RestaurentAdd";

const Layout = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [restLogin, setRestLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      {restLogin ? <RestaurentAdd setRestLogin={setRestLogin} /> : <></>}
      <Navbar setShowLogin={setShowLogin} setRestLogin={setRestLogin} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
