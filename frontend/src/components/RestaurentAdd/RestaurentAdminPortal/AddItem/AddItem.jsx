import React, { useState, useContext, useEffect } from "react";
import "./AddItem.css";
import { Storecontext } from "../../../../context/Storecontext";
import axios from "axios";

const AddItem = () => {
  const { url } = useContext(Storecontext);
  const [restroId, setRestroId] = useState(null);
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState(null);
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    const id = localStorage.getItem("tokens");
    if (id) {
      setRestroId(id);
    } else {
      alert("Restaurant ID not found. Please log in again.");
    }
  }, []);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const AddMenu = async (e) => {
    e.preventDefault();

    if (!restroId) {
      alert("Restaurant ID is missing. Please log in again.");
      window.location.href = "/login";
      return;
    }

    let newUrl = url;
    newUrl += "/api/food/add"; //api/food/list
    console.log(newUrl);
    const login_data = {
      headers: {
        token: restroId,
      },
    };
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const res = await axios.post(newUrl, formData, login_data);
      setResponse(res);
      if (res.data.success) {
        setData({
          name: "",
          price: "",
          description: "",
          category: "",
        });
        setImage(null);
        alert("Item Added Successfully!");
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      alert("Failed to add item. Please try again.");
    }
  };

  // try{
  //   const res = await axios.post(newUrl, formData);
  //   if (res.data.success) {
  //     setData({
  //       name: "",
  //       price: "",
  //       description: "",
  //       category: "",
  //     });
  //     alert("Item Add");
  //     setImage(null);
  //   } else {
  //     alert(res.data.success);
  //   } catch(error){
  //     console.error("error adding item:",error)
  //     alert("Failed to add item. please try again")
  //   }}}}

  // console.log(response);

  return (
    <>
      <div className="Add-container">
        <h3>Add Item here...</h3>
        <div className="Add-item-form">
          <form onSubmit={AddMenu}>
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              placeholder="Enter Item Name..."
              required
            />
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="Enter Item Price..."
              required
            />
            <input
              type="text"
              name="description"
              value={data.description}
              onChange={onChangeHandler}
              placeholder="Enter Item Description(Details)"
              required
            />
            <input
              type="text"
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              placeholder="Enter Iten category (Make category name is correct)"
              required
            />
            <button>Submit Menu</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddItem;
