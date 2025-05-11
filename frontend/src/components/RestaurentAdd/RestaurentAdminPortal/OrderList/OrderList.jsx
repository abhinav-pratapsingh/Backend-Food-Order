import React from "react";
import "./OrderList.css";
import { assets } from "../../../../assets/assets";

const OrderList = () => {
  return (
    <>
      <div className="order add">
        <h3>Order List</h3>
        <div className="order-list">
          <div className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food"></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
