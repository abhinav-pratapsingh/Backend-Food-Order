import React, { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Cart from "../Pages/Cart/Cart";
import Home from "../Pages/Home/Home";
import PlaceOrder from "../Pages/Placeorder/PlaceOrder";
import AOS from "aos";
import "aos/dist/aos.css";
import Exploremenu from "./components/Exploremenu/Exploremenu";
import RestaurentAddF from "./components/RestaurentAdd/RestaurentAddFolder/RestaurentAddF";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element=<Layout />>
      <Route path="" element=<Home /> />
      <Route path="cart" element=<Cart /> />
      <Route path="/placeorder" element=<PlaceOrder /> />
      <Route path="/AddRestaurent" element=<RestaurentAddF /> />
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
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
