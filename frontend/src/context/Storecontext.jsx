import { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const Storecontext = createContext(null);

const StoreContextProvider = (props) => {
  //Add to cart funtion
  const [cartItems, setCartItems] = useState({});
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
