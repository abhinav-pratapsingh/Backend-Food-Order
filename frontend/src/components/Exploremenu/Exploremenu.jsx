import React from "react";
import "./Exploremenu.css";
import { menu_list } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Exploremenu = ({ category, setCategory }) => {
  return (
    <>
      <div id="explore-menu">
        <h1>Explore our menu</h1>
        <p className="explore-menu-text">
          Choose from a diverse menu featuring a delectable array of dishes. Our
          mission is to satisfy your cravings and elevate your experience, one
          delicious meal at a time.
        </p>
        <div className="explore-menu-list">
          {menu_list.map((data, index) => {
            return (
              <div
                data-aos="fade-right"
                key={data.id}
                className="explore-menu-list-item"
              >
                <NavLink
                  onClick={() => {
                    setCategory((prev) =>
                      prev === data.menu_name ? "All" : data.menu_name
                    );
                  }}
                >
                  <img
                    className={category === data.menu_name ? "active" : ""}
                    src={data.menu_image}
                    alt="menu-list"
                  />
                  <p>{data.menu_name}</p>
                </NavLink>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </>
  );
};

export default Exploremenu;
