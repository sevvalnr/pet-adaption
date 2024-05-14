import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Adopt.css'; // CSS dosyasını ekleyin

const AddPetPage = () => {
  return (
    <div className="adopt-container">
      <h2>Add Pet</h2>
      <div className="button-container">
        <div className='buttonDog-container'>
        <Link to="/addDog">
          <button> Dog</button>
        </Link>
        </div>
        
        <div className='buttonCat-container'>
        <Link to="/addCat">
          <button> Cat</button>
        </Link>
        </div>
        <div className='buttonBird-container'>
        <Link to="/addBird">
          <button> Bird</button>
        </Link>
        </div>
        <div className='buttonOther-container'>
        <Link to="/addOther">
          <button> Other</button>
        </Link>
        </div>
      </div> 
    </div>
  );
};

export default AddPetPage;
