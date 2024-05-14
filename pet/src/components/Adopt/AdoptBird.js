import React, { useState, useEffect } from 'react';
import '../styles/AdoptBird.css'; // CSS dosyasını ekleyin
import { Link } from 'react-router-dom'; // React Router'ı ekleyin

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
    <div>
      <h2>Birds</h2>
      {/* Butonu ekleyin ve "/addBird" sayfasına yönlendirin */}
      <Link to="/addBird" className="add-bird-button">Do you want to add a bird?</Link>
      <div className="bird-grid">
        {birds.map(bird => (
          <div key={bird.id} className="bird-card" onClick={() => handleBirdClick(bird)}>
            <p><strong>Name:</strong> {bird.name}</p>
            <p><strong>Type:</strong> {bird.type}</p>
            {/* Kuşun fotoğrafını göster */}
            <img src={bird.imageUrl} alt={bird.name} className="bird-image" />
          </div>
        ))}
      </div>
      {selectedBird && (
        <div>
          <p><strong>Owner Email:</strong> {selectedBird.email}</p>
          <p><strong>Age:</strong> {selectedBird.age}</p>
          <p><strong>Type:</strong> {selectedBird.type}</p>
          <p><strong>Location:</strong> {selectedBird.location}</p>
          <p><strong>Description:</strong> {selectedBird.description}</p>
          <img src={selectedBird.imageUrl} alt={selectedBird.name} className="bird-image" />
        </div>
      )}
    </div>
  );
};

export default AdoptBird;
