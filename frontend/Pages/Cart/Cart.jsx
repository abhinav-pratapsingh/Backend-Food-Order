import React, { useContext, useEffect } from "react";
import "./Cart.css";
import { Storecontext } from "../../src/context/Storecontext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { id } = useParams();

  console.log(id);
  const {
    cartItems,
    food_list,
    setCartItems,
    removeFromCart,
    getTotalCartAmount,
    url,
  } = useContext(Storecontext);

  useEffect(() => {
    const cart = async () => {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios.post(url + "/api/cart/get", null, {
        headers: { token: token },
      });
      console.log(res);
    };
    cart();
  });

  const navigate = useNavigate();
  return (
    <>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item, index) => {
            if (cartItems[item.id] > 0) {
              return (
                <>
                  {
                    <>
                      <div
                        key={index}
                        className="cart-items-title cart-items-item"
                      >
                        <img src={item.image} />
                        <p>{item.name}</p>
                        <p>&#x20B9; {item.price}</p>
                        <p>{cartItems[item.id]}</p>
                        <p>&#x20B9; {item.price * cartItems[item.id]}</p>
                        <p
                          className="cross"
                          onClick={() => removeFromCart(item.id)}
                        >
                          x
                        </p>
                      </div>
                      <hr />
                    </>
                  }
                </>
              );
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                {/* <p>{getTotalCartAmount()}</p> */}
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                {/* <p>{getTotalCartAmount() === 0 ? 0 : 2}</p> */}
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>
                  {/* {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2} */}
                </b>
              </div>
            </div>
            <button onClick={() => navigate("/placeorder")}>
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type="text" placeholder="Enter promocode" />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
