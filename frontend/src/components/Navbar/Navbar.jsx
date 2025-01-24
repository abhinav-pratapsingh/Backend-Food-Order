import React, { useCallback, useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { Storecontext } from "../../context/Storecontext";

const Navbar = ({ setShowLogin, setRestLogin }) => {
  const [menu, setMenu] = useState("Home");
  const { getTotalCartAmount, token, tokens, setToken } =
    useContext(Storecontext);
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
          {!tokens ? (
            <button onClick={() => setRestLogin(true)}>
              Add Your Restaurent Here
            </button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} />
              <ul className="nav-profile-dropdown">
                <li>
                  <img src={assets.bag_icon} alt="" />
                  <p>Order</p>
                </li>
                <hr />
                <li>
                  <img src={assets.logout_icon} alt="" />
                  <p>Log Out</p>
                </li>
              </ul>
            </div>
          )}
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} />
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>
          {!token ? (
            <button onClick={() => setShowLogin(true)}>Log in / sign in</button>
          ) : (
            <div className="navbar-profile">
              <img src={assets.profile_icon} />
              <ul className="nav-profile-dropdown">
                <li>
                  <img src={assets.bag_icon} alt="" />
                  <p>Order</p>
                </li>
                <hr />
                <li>
                  <img src={assets.logout_icon} alt="" />
                  <p>Log Out</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
