import React, { useContext } from "react";
import "./foodDisplay.css";
import { Storecontext } from "../../context/Storecontext";
import FoodItem from "../foodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(Storecontext);

  return (
    <>
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {food_list.map((item) => {
            if (category === "All" || category === item.category) {
              return (
                <>
                  <div key={item.id}>
                    <FoodItem
                      key={item.id}
                      name={item.name}
                      img={item.image}
                      price={item.price}
                      des={item.description}
                      category={item.category}
                    />
                  </div>
                </>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default FoodDisplay;
