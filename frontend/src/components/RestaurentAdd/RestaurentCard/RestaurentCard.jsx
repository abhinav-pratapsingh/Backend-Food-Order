import React, { useContext } from "react";
import "./RestaurentCard.css";
import { Storecontext } from "../../../context/Storecontext";

//Locality
// city
//name
//image

const RestaurantCard = ({ img, name }) => {
  const { restroRes } = useContext(Storecontext);
  return (
    <>
      <div className="restaurentCard-container">
        {restroRes.map((items, index) => {
          return (
            <>
              <div className="card-details">
                <div className="rest-img">
                  <img src={items.image} />
                </div>
                <div className="rest-text">
                  <h3 className="restaurent-name">{items.name}</h3>
                  <div className="location-menu_button">
                    <span className="location">
                      {items.address.district} <br /> {items.address.locality}
                    </span>
                    <button>View Menu</button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default RestaurantCard;
