import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const Storecontext = createContext();

const StoreContextProvider = (props) => {
  //Add to cart funtion
  // const [cartItems, setCartItems] = useState({});

  // const addToCart = (itemId) => {
  //   // setCartItems({ ...prev, [itemId]: 1 });
  //   if (!cartItems[itemId]) {
  //     setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
  //   }
  //   //else {
  //   //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  //   // }
  // };

  // const removeFromCart = (itemId) => {
  //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  // };

  // useEffect(() => {
  //   // console.log(cartItems);
  // }, [cartItems]);

  //End add to cart

  const contextValue = {
    food_list,
  };

  return (
    <Storecontext.Provider value={contextValue}>
      {props.children}
    </Storecontext.Provider>
  );
};

export default StoreContextProvider;
