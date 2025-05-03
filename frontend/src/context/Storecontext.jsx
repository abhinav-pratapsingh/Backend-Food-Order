import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets";
import axios from "axios";

export const Storecontext = createContext(null);

const StoreContextProvider = (props) => {
  //Add to cart funtion
  const [district, setDistrict] = useState();
  const [lati, setLatitude] = useState();
  const [longi, setLongitude] = useState();
  const [cartItems, setCartItems] = useState({});
  const [restroRes, setRestroRes] = useState([]);
  const url = "http://localhost:3000";
  const [forLoginToken, setForLoginToken] = useState("");

  const addToCart = (itemId) => {
    // setCartItems({ ...prev, [itemId]: 1 });
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  //End add to cart

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const itemInfo = food_list.find(
          (product) => product.id === parseInt(item)
        );
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("tokens")
  );
  const [tokens, setTokens] = useState(localStorage.getItem("tokens") || "");

  const login = (tokens) => {
    localStorage.setItem("tokens", tokens);
    setTokens();
    setIsLoggedIn(true);
  };

  const logout1 = () => {
    localStorage.removeItem("tokens");
    setTokens("");
    setIsLoggedIn(false);
  };

  const location = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // dist(latitude, longitude);
          // console.log(latitude, longitude);
          setLatitude(latitude);
          setLongitude(longitude);
          distr(latitude, longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    const distr = async (latitude, longitude) => {
      let apiEndPoint = "https://api.opencagedata.com/geocode/v1/json";
      let apikey = "416911d3a90940a6ba7ba4f7aaaa402e";

      const query = `${latitude},${longitude}`;
      const apiUrl = `${apiEndPoint}?key=${apikey}&q=${query}&pretty=1`;

      try {
        const res = await axios(apiUrl);
        const data = res.data;
        const dist = data.results[0].components.state_district;
        setDistrict(dist);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  };

  const userLocation = async (e = null) => {
    if (e) e.preventDefault();

    let newUrl = url;
    newUrl += "/api/restro/near";

    const dataToSend = {
      district: district,
      lati: lati,
      longi: longi,
    };

    console.log("Form Data Sent:", {
      district: district,
      lati: lati,
      longi: longi,
    });

    const res = await axios.post(newUrl, dataToSend);
    if (res.data.success) {
      setDistrict("");
      setLatitude("");
      setLongitude("");
    } else {
      alert(res.data.message);
    }
    setRestroRes(res.data.data);

    console.log(res.data.data[0]._id);
  };

  useEffect(() => {
    location();
  }, []);

  // Automatically execute userLocation when dependencies update
  useEffect(() => {
    if (district && lati && longi) {
      userLocation();
    }
  }, [district, lati, longi]);

  const restroMenuList = async (e = null) => {
    if (e) e.preventDefault();

    let newUrl = url;
    // newUrl+=
  };

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    forLoginToken,
    setForLoginToken,
    location,
    userLocation,
    restroRes,

    // Authentication-related values
    isLoggedIn,
    tokens,
    setTokens,
    login,
    logout1,
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StoreContextProvider;
