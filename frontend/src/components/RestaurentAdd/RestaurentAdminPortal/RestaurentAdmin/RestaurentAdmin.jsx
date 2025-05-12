import React from "react";
import { Link } from "react-router-dom";
import "./RestaurentAdmin.css";

const RestaurentAdmin = () => {
  return (
    <>
      <div className="Restaurent-admin-container">
        <div className="Admin-button">
          <Link to="Add_item">
            <div className="Add-Button">
              <button>Add Item Here</button>
            </div>
          </Link>
          <Link to="Your_Menu">
            <div className="Menu-Button">
              <button>Your Menu List</button>
            </div>
          </Link>
          <Link to="new_order">
            <div className="Order-Button">
              <button>New Order</button>
            </div>
          </Link>
          <Link to="order-out-for-delivery">
            <div className="Order-Button">
              <button>Out for delivery</button>
            </div>
          </Link>
          <Link to="order-Delivered-list">
            <div className="Order-Button">
              <button>Delivered</button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RestaurentAdmin;
