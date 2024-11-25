import React from "react";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink to="Add" className="sidebar-option">
            <img src={assets.add_icon} /> <p>Add Item</p>
          </NavLink>
          <NavLink to="List" className="sidebar-option">
            <img src={assets.order_icon} /> <p>Listb Item</p>
          </NavLink>
          <NavLink to="Order" className="sidebar-option">
            <img src={assets.order_icon} /> <p>Order</p>
          </NavLink>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Sidebar;
