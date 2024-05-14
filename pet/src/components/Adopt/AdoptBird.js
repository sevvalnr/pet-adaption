import React, { useState, useEffect } from 'react';
import '../styles/AdoptBird.css'; // CSS dosyasını ekleyin
import { Link } from 'react-router-dom'; // React Router'ı ekleyin
import birdImage from '../images/bird1.jpg'; // Resmi import edin


const AdoptBird = () => {
  const [birds, setBirds] = useState([]);
  const [selectedBird, setSelectedBird] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/bird')
      .then(response => response.json())
      .then(data => setBirds(data))
      .catch(error => console.error('Error fetching birds:', error));
  }, []);

  const handleBirdClick = (bird) => {
    // Eğer tıklanan kuş zaten seçili kuş ise, seçili kuş durumunu null yaparak detayları kapat
    if (selectedBird && selectedBird.id === bird.id) {
      setSelectedBird(null);
    } else {
      setSelectedBird(bird);
    }
  };

  return (
    <div className="bird-container">
      <h2 className="bird-title">Birds</h2>
      {/* Butonu ekleyin ve "/addBird" sayfasına yönlendirin */}
      <Link to="/addBird" className="add-bird-button">Do you want to add a bird?</Link>
      <div className="bird-content">
        <div className="bird-grid">
          {birds.map(bird => (
            <div key={bird.id} className="bird-card" onClick={() => handleBirdClick(bird)}>
              <p><strong>Name:</strong> {bird.name}</p>
              <p><strong>Type:</strong> {bird.type}</p>
            </div>
          ))}
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

export default AdoptBird;
