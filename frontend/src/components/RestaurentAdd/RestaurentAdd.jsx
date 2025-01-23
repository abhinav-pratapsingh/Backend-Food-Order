import React, { useState, useContext } from "react";
import "../loginPopUp/LoginPopUp.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../context/Storecontext";
import axios from "axios";
import OTPButton from "../loginPopUp/otpButton/OtpBitton";

const RestaurentAdd = ({ setRestLogin }) => {
  const { url, setToken } = useContext(Storecontext);
  const [currState, setCurrState] = useState("Add_Restaurent");
  const [data, setData] = useState({
    restaurent_name: "",
    restaurent_email: "",
    otp: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  //   const onSend = async (e) => {
  //     e.preventDefault();
  //     let newUrl = "http://localhost:3000/api/user/send";
  //     const res = await axios.post(newUrl, data);
  //     if (!res.data.success) {
  //       alert("enter email first");
  //     } else {
  //       alert(res.data.message);
  //     }
  //   };

  //   const onLogin = async (e) => {
  //     e.preventDefault();
  //     let newUrl = url;
  //     if (currState === "Login") {
  //       newUrl += "/api/user/login";
  //     } else {
  //       newUrl += "/api/user/register";
  //     }
  //     const res = await axios.post(newUrl, data);
  //     if (res.data.success) {
  //       setToken(res.data.token);
  //       localStorage.setItem("token", res.data.token);
  //       setRestLogin(false);
  //     } else {
  //       alert(res.data.message);
  //     }
  //   };

  return (
    <>
      <div className="login-popup">
        <form
          //   onSubmit={onLogin}
          className="login-popup-container"
          data-aos="zoom-in"
        >
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setRestLogin(false)} src={assets.cross_icon} />
          </div>
          <div className="login-popup-input">
            {currState === "Restaurent_Login" ? (
              <></>
            ) : (
              <input
                name="restaurent_name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your restaurent name"
                required
              />
            )}
            <div className="email-otp">
              <input
                type="email"
                name="restaurent_email"
                onChange={onChangeHandler}
                value={data.email}
                placeholder="Your restaurent emal"
                required
              />
              {currState === "Restaurent_Login" ? (
                ""
              ) : (
                <button className="otp" type="submit" /*onClick={onSend}*/>
                  <OTPButton />
                </button>
              )}
            </div>
            {currState === "Restaurent_Login" ? (
              ""
            ) : (
              <input
                type="text"
                name="otp"
                onChange={onChangeHandler}
                value={data.otp}
                placeholder="Conform Otp"
                required
              />
            )}
            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              placeholder="password"
              required
            />
          </div>
          <button type="submit">
            {currState === "Add_Restaurent"
              ? "Create restaurent account"
              : "Login restaurent"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to term of use & privacy policy.</p>
          </div>
          {currState === "Restaurent_Login" ? (
            <p>
              Add Restaurent?
              <span onClick={() => setCurrState("Add_Restaurent")}>
                {" "}
                Click for Add Restaurent here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setCurrState("Restaurent_Login")}>
                Restaurent Login here
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default RestaurentAdd;
