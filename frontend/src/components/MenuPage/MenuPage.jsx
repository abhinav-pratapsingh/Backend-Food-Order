import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Storecontext } from "../../context/Storecontext";

const MenuPage = () => {
  const { id } = useParams();
  //   const [menu, setMenu] = useState([]);
  const { url } = useContext(Storecontext);
  const restroId = id;

  const menuItems = async () => {
    let newUrl = url;
    newUrl += "/api/food/menu";

    const response = await axios.post(newUrl, restroId);
    console.log(response);
  };

  useEffect(() => {
    menuItems();
  });
  [];

  //   console.log(menu);

  return <div>MenuPage</div>;
};

export default MenuPage;
