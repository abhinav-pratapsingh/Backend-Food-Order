import React, { useCallback, useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { Storecontext } from "../../context/Storecontext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount,token,setToken } = useContext(Storecontext);
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img
            data-aos="fade-right"
            src={assets.logo}
            alt="logo"
            className="logo"
          />
        </Link>
        <ul className="navbar-menu">
          <Link to="home">
            <li
              onClick={() => {
                setMenu("Home");
              }}
              className={menu === "Home" ? "active" : ""}
            >
              Home
            </li>
          </Link>
          <li
            onClick={() => {
              setMenu("Menu");
            }}
            className={menu === "Menu" ? "active" : ""}
          >
            Menu
          </li>
          <li
            onClick={() => {
              setMenu("Mobile-App");
            }}
            className={menu === "Mobile-App" ? "active" : ""}
          >
            Mobile App
          </li>
          <li
            onClick={() => {
              setMenu("Contact-Us");
            }}
            className={menu === "Contact-Us" ? "active" : ""}
          >
            Contact Us
          </li>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} />
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token?<button onClick={() => setShowLogin(true)}>sign in</button>:<div className="navbar-profile">
            <img src={assets.profile_icon}/>
            <ul className="nav-profile-dropdown">
              <li> <img src={assets.bag_icon} alt=""/><p>Order</p></li>
              <hr/>
              <li> <img src={assets.logout_icon} alt=""/><p>Log Out</p></li>
            </ul>
            </div>}
          
        </div>
      </div>
    </>
  );
};

export default Navbar;
