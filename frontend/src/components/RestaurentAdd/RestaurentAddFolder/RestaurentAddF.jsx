import React, { useContext, useState } from "react";
import "./RestaurentAddF.css";
import OTPButton from "../../loginPopUp/otpButton/OtpBitton";
import axios from "axios";
import { Storecontext } from "../../../context/Storecontext";

const RestaurentAddF = () => {
  const { url, setToken } = useContext(Storecontext);
  const [data, setData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
    phone: "",
    locality: "",
    district: "",
    state: "",
    pin_code: "",
    lati: "",
    longi: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const register = async (e) => {
    e.preventDefault();
    let newUrl = url;
    newUrl += "/api/restro/register";
    const res = await axios.post(newUrl, data);
    if (res.data.success) {
      setToken(res.data.success);
      localStorage.setItem("token", res.data.token);
    } else {
      alert("Error");
    }
    console.log(res.data);
  };

  const onSend = async (e) => {
    e.preventDefault();
    let newUrl = url;
    newUrl += "/api/user/send";
    const res = await axios.post(newUrl, data);
    console.log(newUrl);
    if (!res.data.success) {
      alert("enter email first");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <>
      <div className="Add-restaurent-container">
        <h1>Add Your Restaurent Details</h1>
        <div className="form-start">
          <form onSubmit={register}>
            <div className="form-input">
              <input
                placeholder="Restaurent Name"
                name="name"
                type="text"
                value={data.name}
                onChange={onChangeHandler}
                required
              />
              <input
                placeholder="Mobile Number"
                name="phone"
                type="number"
                value={data.phone}
                onChange={onChangeHandler}
                required
              />
              <div className="Email-otp">
                <input
                  placeholder="Email Id"
                  name="email"
                  type="text"
                  value={data.email}
                  onChange={onChangeHandler}
                  required
                />
                <button type="submit" onClick={onSend}>
                  <OTPButton />
                </button>
              </div>
              <input
                name="otp"
                type="text"
                value={data.otp}
                onChange={onChangeHandler}
                placeholder="Conform OTP"
                required
              />
              <input
                placeholder="Password"
                name="password"
                type="password"
                value={data.password}
                onChange={onChangeHandler}
                required
              />
              <input
                placeholder="Locality"
                name="locality"
                type="text"
                value={data.locality}
                onChange={onChangeHandler}
                required
              />
              <input
                placeholder="District"
                name="district"
                type="text"
                value={data.district}
                onChange={onChangeHandler}
                required
              />
              <input
                placeholder="State"
                name="state"
                type="text"
                value={data.state}
                onChange={onChangeHandler}
                required
              />
              <input
                placeholder="Pin Code (Zip Code)"
                name="pin_code"
                type="text"
                value={data.pin_code}
                onChange={onChangeHandler}
                required
              />
              <input
                placeholder="latitude"
                name="lati"
                type="text"
                value={data.lati}
                onChange={onChangeHandler}
                required
              />
              <input
                placeholder="longitude"
                name="longi"
                type="text"
                value={data.longi}
                onChange={onChangeHandler}
                required
              />
              <button type="submit" className="submitButton">
                Submit Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RestaurentAddF;
