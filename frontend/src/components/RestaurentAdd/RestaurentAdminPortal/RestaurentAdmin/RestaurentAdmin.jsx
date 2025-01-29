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
          <Link to="Check-Order">
            <div className="Order-Button">
              <button>Check Order List</button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RestaurentAdmin;
