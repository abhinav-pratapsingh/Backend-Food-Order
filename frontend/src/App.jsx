import React, { useEffect, useState, useContext } from "react";
import Layout from "./components/Layout/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Cart from "../Pages/Cart/Cart";
import Home from "../Pages/Home/Home";
import PlaceOrder from "../Pages/Placeorder/PlaceOrder";
import AOS from "aos";
import "aos/dist/aos.css";
import Exploremenu from "./components/Exploremenu/Exploremenu";
import RestaurentAddF from "./components/RestaurentAdd/RestaurentAddFolder/RestaurentAddF";
import AddItem from "./components/RestaurentAdd/RestaurentAdminPortal/AddItem/AddItem";
import Layout1 from "./components/RestaurentAdd/Layoyt1";
import MenuList from "./components/RestaurentAdd/RestaurentAdminPortal/MenuList/MenuList";
import OrderList from "./components/RestaurentAdd/RestaurentAdminPortal/OrderList/OrderList";

import RestaurentAdd from "./components/RestaurentAdd/RestaurentAdd";
import StoreContextProvider, { Storecontext } from "./context/Storecontext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(Storecontext);
  console.log(children);

  return isLoggedIn ? children : <Navigate to="/" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element=<Layout />>
      <Route path="" element=<Home /> />
      <Route path="cart" element=<Cart /> />
      <Route path="/placeorder" element=<PlaceOrder /> />
      <Route path="/AddRestaurent" element=<RestaurentAddF /> />
      <Route path="/AddRestaurent" element={<RestaurentAdd />} />
      <Route
        path="Layout1"
        element={
          <ProtectedRoute>
            <Layout1 />
          </ProtectedRoute>
        }
      >
        <Route path="Add_item" element=<AddItem /> />
        <Route path="Your_Menu" element=<MenuList /> />
        <Route path="Check-Order" element=<OrderList /> />
      </Route>
    </Route>
  )
);

const App = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <StoreContextProvider>
        <div className="app">
          <RouterProvider router={router} />
        </div>
      </StoreContextProvider>
    </>
  );
};

export default App;
