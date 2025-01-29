import React, { useContext } from "react";
import "./MenuList.css";
import { assets } from "../../../../assets/assets";
import "./MenuList.css";
import { Storecontext } from "../../../../context/Storecontext";

const MenuList = () => {
  const { removeFromCart } = useContext(Storecontext);
  return (
    <>
      <div className="menu-list-container">
        <div className="food-details">
          <img src={assets.food_1}></img>
          <div className="food-name">
            <span>Name:---</span>
            <p>Food</p>
          </div>
          <div className="food-price">
            <span>Name:---</span>
            <p>Food Price</p>
          </div>
          <div className="food-category">
            <span>Name:---</span>
            <p>Food Category</p>
          </div>
          <button>
            <img src={assets.cross_icon}></img>
          </button>
        </div>

        <div className="food-details">
          <img src={assets.food_1}></img>
          <div className="food-name">
            <span>Name:---</span>
            <p>Food</p>
          </div>
          <div className="food-price">
            <span>Name:---</span>
            <p>Food Price</p>
          </div>
          <div className="food-category">
            <span>Name:---</span>
            <p>Food Category</p>
          </div>
          <button onClick={() => removeFromCart()}>
            <img src={assets.cross_icon}></img>
          </button>
        </div>
      </div>
    </>
  );
};

export default MenuList;
