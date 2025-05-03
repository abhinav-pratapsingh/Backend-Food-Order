import React, { useState, useContext, useEffect } from "react";
import "./loginPopUp.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../context/Storecontext";
import axios from "axios";
import OTPButton from "./otpButton/OtpBitton";

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setForLoginToken, location, userLocation } =
    useContext(Storecontext);
  const [currState, setCurrState] = useState("Sign Up");
  // const [restDisplay, setRestDisplay] = useState();
  const [district, setDistrict] = useState();
  const [lati, setLatitude] = useState();
  const [longi, setLongitude] = useState();

  const [data, setData] = useState({
    name: "",
    email: "",
    otp: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setForLoginToken(token);
      setShowLogin(false);
    }
  }, [setForLoginToken, setShowLogin]);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSend = async (e) => {
    e.preventDefault();
    let newUrl = url; /*"http://localhost:3000/api/user/send"*/
    newUrl += "/api/user/send";
    const res = await axios.post(newUrl, data);
    console.log(res);
    if (!res.data.success) {
      alert("enter email first");
    } else {
      alert(res.data.message);
    }
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const res = await axios.post(newUrl, data);
    if (res.data.success) {
      setForLoginToken(res.data.token);
      setShowLogin(false);
    } else {
      alert(res.data.message);
    }
  };

  // const location = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;
  //         // dist(latitude, longitude);
  //         // console.log(latitude, longitude);
  //         setLatitude(latitude);
  //         setLongitude(longitude);
  //         distr(latitude, longitude);
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }

  //   const distr = async (latitude, longitude) => {
  //     let apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";
  //     let apikey = "416911d3a90940a6ba7ba4f7aaaa402e";

  //     const query = `${latitude},${longitude}`;
  //     const apiUrl = `${apiEndPoint}?key=${apikey}&q=${query}&pretty=1`;

  //     try {
  //       const res = await axios(apiUrl);
  //       const data = res.data;
  //       const dist = data.results[0].components.state_district;
  //       setDistrict(dist);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  // };

  // const userLocation = async (e) => {
  //   e.preventDefault();

  //   let newUrl = "http://localhost:3000/api/restro/near";

  //   const dataToSend = {
  //     district: district,
  //     lati: lati,
  //     longi: longi,
  //   };

  //   console.log("Form Data Sent:", {
  //     district: district,
  //     lati: lati,
  //     longi: longi,
  //   });

  //   const res = await axios.post(newUrl, dataToSend);
  //   if (res.data.success) {
  //     setDistrict("");
  //     setLatitude("");
  //     setLongitude("");
  //     alert("Done");
  //   } else {
  //     alert(res.data.message);
  //   }
  //   console.log(res);
  // };

  return (
    <>
      <div className="login-popup">
        <form
          onSubmit={onLogin}
          className="login-popup-container"
          data-aos="zoom-in"
        >
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
          </div>
          <div className="login-popup-input">
            {currState === "Login" ? (
              <></>
            ) : (
              <input
                name="name"
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                placeholder="Your name"
                required
              />
            )}
            <div className="email-otp">
              <input
                // onClick={location}
                type="email"
                name="email"
                onChange={onChangeHandler}
                value={data.email}
                placeholder="Your emal"
                required
              />
              {currState === "Login" ? (
                ""
              ) : (
                <button className="otp" type="submit" onClick={onSend}>
                  <OTPButton />
                </button>
              )}
            </div>
            {currState === "Login" ? (
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
              // onClick={userLocation}
              type="password"
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              placeholder="password"
              required
            />
          </div>
          <button type="submit">
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to term of use & privacy policy.</p>
          </div>
          {currState === "Login" ? (
            <p>
              Create a new account?
              <span
                onClick={() => (setCurrState("Sing UP"), setShowLogin(false))}
              >
                Click here
              </span>
            </p>
          ) : (
            <p>
              Already have an account?
              <span onClick={() => setCurrState("Login")}>Login here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default LoginPopUp;
