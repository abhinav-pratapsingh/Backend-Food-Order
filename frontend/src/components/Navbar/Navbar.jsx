import React, { useCallback, useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { Storecontext } from "../../context/Storecontext";

const Navbar = ({ setShowLogin, setRestLogin }) => {
  const {
    getTotalCartAmount,
    forLoginToken,
    setForLoginToken,
    tokens,
    setTokens,
    logout1,
  } = useContext(Storecontext);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setForLoginToken("");
    navigate("/");
  };
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
          {!forLoginToken ? (
            !tokens ? (
              <button onClick={() => setRestLogin(true)}>
                Restaurent Portal
              </button>
            ) : (
              /* <p>You are enter in portal</p> */
              <button onClick={logout1}>Log Out</button>
            )
          ) : (
            console.log("")
          )}

          {/* {!tokens ? (
            <button onClick={() => setRestLogin(true)}>
              Restaurent Portal
            </button>
          ) : (
            <p>You are enter in portal</p>
          )} */}
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} />
          <div className="navbar-search-icon">
            <Link to="/cart">
              <img src={assets.basket_icon} />
            </Link>
            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
          </div>

          {!tokens ? (
            !forLoginToken ? (
              <button onClick={() => setShowLogin(true)}>
                Log in / sign in
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
                    <img onClick={logout} src={assets.logout_icon} alt="" />
                    <p>Log Out</p>
                  </li>
                </ul>
              </div>
            )
          ) : (
            console.log("")
          )}

          {/* {!forLoginToken ? (
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
                  <img onClick={logout} src={assets.logout_icon} alt="" />
                  <p>Log Out</p>
                </li>
              </ul>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
