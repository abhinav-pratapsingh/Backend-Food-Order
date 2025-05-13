import React, { useContext, useEffect, useState } from "react";
import "./MenuList.css";
import { assets } from "../../../../assets/assets";
import "./MenuList.css";
import { Storecontext } from "../../../../context/Storecontext";
import axios from "axios";

const MenuList = () => {
  const { removeMenu, url } = useContext(Storecontext);
  const [restroId, setRestroId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("tokens");
    setRestroId(id);
  });

  const fetchData = async () => {
    let newUrl = url;
    newUrl += "/api/food/list";

    const login_response = {
      headers: {
        token: restroId,
      },
    };

    try {
      const res = await axios.post(newUrl, null, login_response);
      setData(res.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  });

  const remove = async (id) => {
    try {
      await axios.post(
        url + "/api/food/remove",
        { id: id },
        { headers: { token: restroId } }
      );
      console.log(id);
    } catch {
      alert("Does not");
    }
  };

  return (
    <>
      <div className="menu-list-container">
        {data ? (
          data.map((item, index) => (
            <div className="food-details" key={index}>
              <img src={item.image} alt={item.name} />
              <div className="food-name">
                <span>Name:</span>
                <p>{item.name}</p>
              </div>
              <div className="food-price">
                <span>Price:</span>
                <p>{item.price}</p>
              </div>
              <div className="food-category">
                <span>Category:</span>
                <p>{item.category}</p>
              </div>
              <div>
                <p
                  className="remove-button"
                  onClick={() => {
                    remove(item._id);
                  }}
                >
                  Remove Food
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default MenuList;
