import React, { useState } from "react";
import "./Home.css";
import Header from "../Header/Header";
import Exploremenu from "../Exploremenu/Exploremenu";
import FoodDisplay from "../foodDisplay/FoodDisplay";
import DownloadApp from "../DownloadApp/DownloadApp";

const Home = () => {
  const [category, setCategory] = useState("All");
  return (
    <>
      <div>
        <Header />
        <Exploremenu category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <DownloadApp />
      </div>
    </>
  );
};

export default Home;
