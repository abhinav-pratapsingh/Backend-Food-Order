import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { Storecontext } from "../../src/context/Storecontext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const { removeFromCart, url, cartItem, fetchCart, amount } =
    useContext(Storecontext);

  console.log(cartItem);

  useEffect(() => {
    fetchCart();
  }, []);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  return (
    <>
      <div className="cart">
        <div className="cart-items">
          {/* <div className="cart-items-title">
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div> */}
          <br />
          <hr />
          {cartItem.map((item, index) => {
            return (
              <>
                {
                  <>
                    <div
                      key={index}
                      className="cart-items-title cart-items-item"
                    >
                      <img src={item.image} />
                      <p>Title: {item.name}</p>
                      <p>Price: &#x20B9; {item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total: &#x20B9; {item.price * item.quantity}</p>
                      <p
                        className="cross"
                        onClick={() => {
                          removeFromCart(item._id, item.restroId), fetchCart();
                        }}
                      >
                        X
                      </p>
                    </div>
                    <hr />
                  </>
                }
              </>
            );
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                {amount}
              </div>
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                Free
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>&#x20B9; {amount}</b>
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
