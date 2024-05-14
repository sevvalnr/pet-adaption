import React, { useState, useEffect } from 'react';
import '../styles/AdoptDog.css'; // CSS dosyasını ekleyin
import { Link } from 'react-router-dom'; // React Router'ı ekleyin

const AdoptOther = () => {
  const [others, setOthers] = useState([]);
  const [selectedBird, setSelectedBird] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/other')
      .then(response => response.json())
      .then(data => setOthers(data))
      .catch(error => console.error('Error fetching dogs:', error));
  }, []);

  const handleCatClick = (other) => {
    // Eğer tıklanan kedi zaten seçili kedi ise, seçili kedi durumunu null yaparak detayları kapat
    if (selectedBird && selectedBird.id === other.id) {
      setSelectedBird(null);
    } else {
      setSelectedBird(other);
    }
  };

  return (
    <div>
      <h2>others</h2>
      {/* Butonu ekleyin ve "/addDog" sayfasına yönlendirin */}
      <Link to="/addDog" className="add-dog-button">Do you want to add a Other?</Link>
      <div className="dog-grid">
        {others.map(other => (
          <div key={other.id} className="dog-card" onClick={() => handleCatClick(other)}>
            <p><strong>Name:</strong> {other.name}</p>
            <p><strong>Type:</strong> {other.type}</p>
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
        </div>
      )}
    </div>
  );

};

export default AdoptOther;
