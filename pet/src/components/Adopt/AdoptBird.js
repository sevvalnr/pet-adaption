import React, { useState, useEffect } from 'react';
import '../styles/AdoptBird.css'; // CSS dosyasını ekleyin
import { Link } from 'react-router-dom'; // React Router'ı ekleyin
import birdImage from '../images/bird1.jpg'; // Resmi import edin
import { fetchBirds } from '../api';
import { connect } from 'react-redux';
import { fetchBirdsAction } from '../action/birdAction';


const AdoptBird = ({ fetchBirdsAction, birdsState}) => {
  const [birds, setBirds] = useState([]);
  const [selectedBird, setSelectedBird] = useState(null);

  useEffect(() => {
    const getBirds = async () => {
      const birdsData = await fetchBirds();
      setBirds(birdsData);
    };

    getBirds();
  }, []);

  const handleBirdClick = (bird) => {
    if (selectedBird && selectedBird.id === bird.id) {
      setSelectedBird(null);
    } else {
      setSelectedBird(bird);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchBirdsAction();
      } catch (error) {
      }
    };
    fetchData();
  }, [fetchBirdsAction]);

  return (
    <div className="bird-container">
      <h2 className="bird-title">Birds</h2>
      <Link to="/addBird" className="add-bird-button">Do you want to add a bird?</Link>
      <div className="bird-content">
        <div className="bird-grid">
        {birdsState && birdsState.length > 0 ? (
          birdsState.map(bird => (
            <div key={bird.id} className="bird-card" onClick={() => handleBirdClick(bird)}>
              <p><strong>Name:</strong> {bird.name}</p>
              <p><strong>Type:</strong> {bird.type}</p>
              </div> 
                ))
  ) : (
    <p>Veri yok</p>
  )}
  
        </div>
        {selectedBird && (
          <div className="bird-details">
            <p><strong>Owner Email:</strong> {selectedBird.email}</p>
            <p><strong>Age:</strong> {selectedBird.age}</p>
            <p><strong>Type:</strong> {selectedBird.type}</p>
            <p><strong>Location:</strong> {selectedBird.location}</p>
            <p><strong>Description:</strong> {selectedBird.description}</p>
          </div>
        )}
      </div>
      <img src={birdImage} alt="Bird" className="bottom-right-image" />
    </div>
        
  );
};
const mapStateToProps = (state) => ({
  birdsState: state.birds.birds, 
});

const mapDispatchToProps = (dispatch) => ({
  fetchBirdsAction: () => dispatch(fetchBirdsAction()), 
});
export default connect(mapStateToProps, mapDispatchToProps)(AdoptBird);
