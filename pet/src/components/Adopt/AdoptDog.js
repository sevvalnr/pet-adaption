import React, { useEffect, useState } from 'react';
import '../styles/AdoptDog.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDogsAction } from '../action/dogAction';

const AdoptDog = ({ isLoggedIn, fetchDogsAction, dogsState }) => {
  const [selectedDog, setSelectedDog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDogsAction();
      } catch (error) {
      }
    };
    fetchData();
  }, [fetchDogsAction]);

  const handleDogClick = (dog) => {
    if (selectedDog && selectedDog.id === dog.id) {
      setSelectedDog(null);
    } else {
      setSelectedDog(dog);
    }
  };

  return (
    <div>
      {isLoggedIn && (
        <div>
          <Link to="/addDog" className="add-dog-button">Do you want to add a dog?</Link>
        </div>
      )}
      <div className="dog-grid">
        {dogsState && dogsState.length > 0 ? (
          dogsState.map(dog => (
            <div key={dog.id} className="dog-card" onClick={() => handleDogClick(dog)}>
              <p><strong>Name:</strong> {dog.name}</p>
              <p><strong>Type:</strong> {dog.type}</p>
              {dog.images && dog.images.length > 0 && (
                <img src={`http://localhost:3000/${dog.images[0]}`} alt={`${dog.name}`} className="dog-image" />
              )}
            </div>
          ))
        ) : (
          <p>Veri yok</p>
        )}
      </div>
      {selectedDog && (
        <div>
          <p><strong>Owner Email:</strong> {selectedDog.email}</p>
          <p><strong>Age:</strong> {selectedDog.age}</p>
          <p><strong>Type:</strong> {selectedDog.type}</p>
          <p><strong>Location:</strong> {selectedDog.location}</p>
          <p><strong>Description:</strong> {selectedDog.description}</p>
          {selectedDog.images && selectedDog.images.map((image, index) => (
            <img key={index} src={`http://localhost:3000/${image}`} alt={`${selectedDog.name}-${index}`} className="dog-image-detail" />
          ))}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  dogsState: state.dogs.dogs,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDogsAction: () => dispatch(fetchDogsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdoptDog);
