import React, { useContext, useEffect, useState } from "react";
import { Storecontext } from "../../src/context/Storecontext";
import "./MyOrder.css";
import axios from "axios";
import { assets } from "../../src/assets/assets";
import OrderList from "../../src/components/RestaurentAdd/RestaurentAdminPortal/OrderList/OrderList";

const MyOrder = () => {
  const { url } = useContext(Storecontext);
  let token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + "/api/order/userorders", null, {
      headers: { token },
    });
    setData(response.data.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  console.log(data);
  return (
    <>
      <div className="my-order">
        <h2>My Order</h2>
        <div className="container">
          {data.map((order, index) => {
            return (
              <>
                <div key={index} className="my-orders-order">
                  <img src={assets.parcel_icon} alt=" " />
                  <p>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " * " + item.quantity;
                      } else {
                        return item.name + " * " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p>&#x20B9; {order.amount}</p>
                  <p>
                    <span>&#x25cf;</span>
                    <b>{order.status}</b>
                  </p>
                  <button>Track Order</button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyOrder;
