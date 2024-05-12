import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Adopt.css'; // CSS dosyasını ekleyin

const AddPetPage = () => {
  return (
    <div className="adopt-container">
      <h2>Add Pet</h2>
      <div className="button-container">
        <Link to="/addDog">
          <button> Dog</button>
        </Link>
        <Link to="/addCat">
          <button> Cat</button>
        </Link>
        <Link to="/addBird">
          <button> Bird</button>
        </Link>
        <Link to="/addOther">
          <button> Other</button>
        </Link>
      </div> 
    </div>
  );
};

export default AddPetPage;
