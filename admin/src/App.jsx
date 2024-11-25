import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Order from "./Pages/Orders/Order";
import Layout from "./components/Layout/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element=<Layout />>
      <Route path="Add" element=<Add /> />
      <Route path="List" element=<List /> />
      <Route path="Order" element=<Order /> />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
