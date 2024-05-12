import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Adopt.css'; // CSS dosyasını ekleyin

const Adopt = () => {
  return (
    <div className="adopt-container">
      <h2>Pet</h2>
      <div className="button-container">
        <Link to="/adoptDog">
          <button> Dog</button>
        </Link>
        <Link to="/adoptCat">
          <button> Cat</button>
        </Link>
        <Link to="/adoptBird">
          <button> Bird</button>
        </Link>
        <Link to="/adoptOther">
          <button> Other</button>
        </Link>
      </div>
    </div>
  );
}; 

export default Adopt;
