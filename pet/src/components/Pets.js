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
          <button> </button>
        </Link>
        <div>Dog</div>
        </div>
        
        <div className='buttonCat-container'>
        <Link to="/addCat">
          <button> </button>
        </Link>
        <div>Cat</div>
        </div>
        <div className='buttonBird-container'>
        <Link to="/addBird">
          <button> </button>
        </Link>
        <div>Bird</div>
        </div>
        <div className='buttonOther-container'>
        <Link to="/addOther">
          <button> </button>
        </Link>
        <div>Other</div>
        </div>
      </div> 
    </div>
  );
};

export default AddPetPage;
