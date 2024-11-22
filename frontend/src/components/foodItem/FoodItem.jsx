import React, { useContext } from "react";
import "./fooditem.css";
import { assets } from "../../assets/assets";
import { Storecontext } from "../../context/Storecontext";

const FoodItem = ({ id, name, price, des, img }) => {
  // const [itemCount, setItemCount] = useState(0);

  const { cartItems, addToCart, removeFromCart } = useContext(Storecontext);
  // console.log(itemCount);

  return (
    <>
      <div className="food-item" data-aos="fade-in">
        <div className="food-item-container">
          <img className="food-item-image" src={img} />
          {!cartItems[id] ? (
            <img
              className="add"
              onClick={() => addToCart(id)}
              src={assets.add_icon_white}
            />
          ) : (
            <div className="food-item-counter">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
              />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} />
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

  // console.log(itemCount);

  // const addToCart = () => {
  //   setItemCount(itemCount + 1);
  //   console;
  // };

  // const removeFromCart = () => {
  //   setItemCount(itemCount - 1);
  //   if (counter > 0) {
  //     setItemCount(itemCount - 1);
  //     console.log(counter);
  //   }
  // };

  //   return (
  //     <>
  //       <div className="food-item" data-aos="fade-in">
  //         <div className="food-item-container">
  //           <img className="food-item-image" src={img} />
  //           {!itemCount ? (
  //             <img
  //               className="add"
  //               onClick={addToCart}
  //               src={assets.add_icon_white}
  //             />
  //           ) : (
  //             <div className="food-item-counter">
  //               <img onClick={removeFromCart} src={assets.remove_icon_red} />
  //               <p>{itemCount}</p>
  //               <img
  //                 onClick={() => setItemCount((prev) => prev + 1)}
  //                 src={assets.add_icon_green}
  //                 alt="add"
  //               />
  //             </div>
  //           )}
  //         </div>
  //         <div className="food-item-info">
  //           <div className="food-item-name-rating">
  //             <p>
  //               <span>{name}</span>
  //             </p>
  //             <img src={assets.rating_starts} />
  //           </div>
  //           <p className="food-item-des">{des}</p>
  //           <p className="food-item-price">
  //             <h2>&#x20B9; {price}</h2>
  //           </p>
  //         </div>
  //       </div>
  //     </>
  //   );
};

export default FoodItem;
