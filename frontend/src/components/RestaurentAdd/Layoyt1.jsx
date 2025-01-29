import React from "react";
import { Outlet } from "react-router-dom";
import RestaurentAdmin from "./RestaurentAdminPortal/RestaurentAdmin/RestaurentAdmin";

const Layout1 = () => {
  return (
    <>
      <RestaurentAdmin />
      <Outlet />
    </>
  );
};

export default Layout1;
