import React from "react";
import { assets } from "../../../assets/assets";
import "./RestaurentCard.css";

const RestaurantCard = ({ img, name }) => {
  return (
    <>
      <div className="restaurentCard-container">
        <div className="card-details">
          <div className="rest-img">
            <img src={assets.food_1} />
            <h2>20% OFF UPTO &#8377;</h2>
          </div>
          <div className="rest-text">
            <h3 className="restaurent-name">Maa Ki Rasoi</h3>
            <div className="location-menu_button">
              <span className="location">
                India <br /> New Mandi
              </span>
              <button>View Menu</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantCard;
