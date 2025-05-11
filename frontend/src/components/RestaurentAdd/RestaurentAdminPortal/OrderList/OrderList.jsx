import React, { useContext, useEffect, useState } from "react";
import "./OrderList.css";
import { assets } from "../../../../assets/assets";
import { Storecontext } from "../../../../context/Storecontext";
import axios from "axios";

const OrderList = () => {
  const [order, setOrder] = useState([]);
  const { url } = useContext(Storecontext);

  const token = localStorage.getItem("tokens");
  console.log(token);

  const fetchAllOrder = async () => {
    const response = await axios.post(url + "/api/order/pending", null, {
      headers: { token: token },
    });

    console.log(response);
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);
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
