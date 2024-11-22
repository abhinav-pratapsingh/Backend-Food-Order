import React, { useState } from "react";
import "./Home.css";
import Header from "../../src/components/Header/Header";
import Exploremenu from "../../src/components/Exploremenu/Exploremenu";
import FoodDisplay from "../../src/components/foodDisplay/FoodDisplay";
import DownloadApp from "../../src/components/DownloadApp/DownloadApp";

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
