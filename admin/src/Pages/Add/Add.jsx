import React, { useEffect, useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";

const Add = () => {
  const [img, setImg] = useState(false);
  const [data, setData] = useState({
    name: "",
    des: "",
    price: "",
    category: "Select",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <>
      <div className="add">
        <form className="flex-col">
          <div className="add-img-upload flex-col">
            <p>upload img</p>
            <label htmlFor="image">
              <img
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt=""
              />
            </label>
            <input
              onChange={(e) => {
                setImg(e.target.files[0]);
              }}
              type="file"
              id="image"
              required
              hidden
            />
          </div>
          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="Type here"
            />
          </div>
          <div className="add-product-des flex-col">
            <p>Product description</p>
            <textarea
              onChange={onChangeHandler}
              value={data.des}
              name="des"
              rows="6"
              placeholder="Right Content Here"
              required
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={onChangeHandler} name="category">
                <option value="Select">Select</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="0"
              />
            </div>
          </div>
          <button type="submit" className="add-button">
            Add
          </button>
        </form>
      </div>
    </>
  );
};
export default Add;
