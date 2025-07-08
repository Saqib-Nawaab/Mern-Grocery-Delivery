import React from "react";
import MainBaner from "../components/MainBaner";
import Catagories from "../components/Catagories";
import BestSeller from "../components/BestSeller";
import BottomBaner from "../components/BottomBaner";
import NewsLetter from "../components/NewsLetter";

function Home() {
  return (
    <div>
      <div className="mt-10">
        <MainBaner />
        <Catagories/> 
        <BestSeller/>
        <BottomBaner/>
        <NewsLetter/>
      </div>
    </div>
  );
}

export default Home;
