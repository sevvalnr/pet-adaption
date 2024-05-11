import React from "react";
import { Link } from "react-router-dom";
//import "./styles/Home.css";

const Home = () => {
  return (
    <div className="button-wrapper">
      <Link to="/pets">
        <button className="adapt-button">I want to adapt</button>
      </Link>
      <Link to="/pets">
        <button className="ad-button">I want to put an ad</button>
      </Link>
    </div>

  );
  
};

export default Home;