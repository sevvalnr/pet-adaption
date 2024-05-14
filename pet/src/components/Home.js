import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-buttons">
        <Link to="/adopt">
          <button className="home-button">I want to adopt</button>
        </Link>
        
        <Link to="/addPet">
          <button className="home-button">I want to put an ad</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;