import React, { useContext, useMemo } from "react";
import "./foodDisplay.css";
import { Storecontext } from "../../context/Storecontext";
import FoodItem from "../foodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(Storecontext);

  const randomizedFoodList = useMemo(() => {
    return food_list
      .filter((item) => category === "All" || category === item.category)
      .sort(() => Math.random() - 0.5) // Sorting random sirf mount hone par hoga
      .slice(0, 12); // Sirf 12 items select honge
  }, [food_list, category]); // food_list ya category badalne par firse shuffle hoga

  return (
    <>
      <div className="food-display" id="food-display">
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
          {randomizedFoodList.map((item, index) => (
            <FoodItem
              key={index}
              id={item.id}
              name={item.name}
              img={item.image}
              price={item.price}
              des={item.description}
              category={item.category}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default FoodDisplay;
