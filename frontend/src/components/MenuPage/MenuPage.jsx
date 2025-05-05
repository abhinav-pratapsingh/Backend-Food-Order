import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Storecontext } from "../../context/Storecontext";
import FoodItem from "../foodItem/FoodItem";
import "./MenuPage.css";

const MenuPage = () => {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const { url } = useContext(Storecontext);
  const restroId = id;

  const menuItems = async () => {
    let newUrl = url;
    newUrl += "/api/food/menu";

    const response = await axios.post(newUrl, { restroId: restroId });
    setMenu(response.data.data);
    console.log(response.data.data);
  };

  useEffect(
    (e = null) => {
      if (e) e.preventDefault();
      menuItems();
    },
    [id]
  );

  // console.log(menu);

  return (
    <>
      <div className="Restro-Menu-List">
        {menu.map((item, index) => {
          return (
            <>
              <div>
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  img={item.image}
                  price={item.price}
                  des={item.description}
                  category={item.category}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default MenuPage;
