import React, { useContext, useEffect, useState } from "react";
import { assets } from "../../../../../assets/assets";
import { Storecontext } from "../../../../../context/Storecontext";
import axios from "axios";

const OutForDelivery = () => {
  const [order, setOrder] = useState([]);
  const { url } = useContext(Storecontext);

  const token = localStorage.getItem("tokens");
  // console.log(token);
  const fetchAllOrder = async () => {
    const response = await axios.post(url + "/api/order/outfordelivery", null, {
      headers: { token: token },
    });

    setOrder(response.data.data);
    console.log(response);
  };

  const status = async (event, orderId) => {
    const response = await axios.post(
      url + "/api/order/update",
      {
        orderId,
        orderStatus: event.target.value,
      },
      {
        headers: { token: token },
      }
    );
    console.log(response);

    console.log(event, orderId);
  };

  useEffect(() => {
    fetchAllOrder();
  }, []);
  return (
    <>
      <div className="order add">
        <h3>Order List</h3>
        <div className="order-list">
          {order.map((orders, index) => {
            return (
              <>
                <div key={index} className="order-item">
                  <img src={assets.parcel_icon} alt="" />
                  <div>
                    <p className="order-item-food">
                      {orders.items.map((item, index) => {
                        if (index === orders.item?.lenght - 1) {
                          return item.name + " x " + item.quantity;
                        } else {
                          return item.name + " x " + item.quantity + " ,";
                        }
                      })}
                    </p>
                    <p className="order-item-name">
                      {orders.address.firstName + " " + orders.address.lastName}
                    </p>
                    <div className="order-item-address">
                      <p>{orders.address.street + ", "}</p>
                      <p>
                        {orders.address.city +
                          ", " +
                          orders.address.state +
                          ", " +
                          orders.address.country +
                          ", " +
                          orders.address.pincode}
                      </p>
                      <p className="order-item-phone">{orders.address.phone}</p>
                    </div>
                    <p>&#x20B9; {orders.amount}</p>
                  </div>
                  <select
                    onChange={(event) => status(event, orders._id)}
                    value={order.status}
                  >
                    <option value="out for delivery">Out for delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OutForDelivery;
