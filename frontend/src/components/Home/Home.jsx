import React, { useState } from "react";
import "./Home.css";
import Header from "../Header/Header";
import Exploremenu from "../Exploremenu/Exploremenu";
import FoodDisplay from "../foodDisplay/FoodDisplay";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      <div>
        <Header />
        <Exploremenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
      </div>
    </>
  );
};

export default Home;
