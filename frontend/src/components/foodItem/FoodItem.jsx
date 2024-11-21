import React, { useContext, useState } from "react";
import "./fooditem.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../context/Storecontext";

const FoodItem = ({ id, name, price, des, img }) => {
  const [itemCount, setItemCount] = useState(0);

  const { cartItems, setCartItems, addToCart, removeFromCart } =
    useContext(Storecontext);
  return (
    <>
      <div className="food-item" data-aos="fade-in">
        <div className="food-item-container">
          <img className="food-item-image" src={img} />
          {!itemCount ? (
            <img
              className="add"
              onClick={() => setItemCount((prev) => prev + 1)}
              src={assets.add_icon_white}
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => setItemCount((prev) => prev - 1)}
                src={assets.remove_icon_red}
              />
              <p>{itemCount}</p>
              <img
                onClick={() => setItemCount((prev) => prev + 1)}
                src={assets.add_icon_green}
                alt="add"
              />
            </div>
          )}
        </div>
        <div className="food-item-info">
          <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} />
          </div>
          <p className="food-item-des">{des}</p>
          <p className="food-item-price">&#x20B9; {price}</p>
        </div>
      </div>
    </>
  );

  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////
  ////////////////////

  //   return (
  //     <>
  //       <div className="food-item" data-aos="fade-in">
  //         <div className="food-item-container">
  //           <img className="food-item-image" src={img} />
  //           {!cartItems[id] ? (
  //             <img
  //               className="add"
  //               onClick={() => addToCart(id)}
  //               src={assets.add_icon_white}
  //             />
  //           ) : (
  //             <div className="food-item-counter">
  //               <img
  //                 onClick={() => removeFromCart(id)}
  //                 src={assets.remove_icon_red}
  //               />
  //               <p>{cartItems[id]}</p>
  //               <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
  //             </div>
  //           )}
  //         </div>
  //         <div className="food-item-info">
  //           <div className="food-item-name-rating">
  //             <p>{name}</p>
  //             <img src={assets.rating_starts} />
  //           </div>
  //           <p className="food-item-des">{des}</p>
  //           <p className="food-item-price">&#x20B9; {price}</p>
  //         </div>
  //       </div>
  //     </>
  //   );
};

export default FoodItem;
