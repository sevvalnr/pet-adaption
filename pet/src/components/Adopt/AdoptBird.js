import React, { useState, useEffect } from 'react';
import '../styles/AdoptDog.css'; // CSS dosyasını ekleyin
import { Link } from 'react-router-dom'; // React Router'ı ekleyin

const AdoptCat = () => {
  const [birds, setBirds] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/bird')
      .then(response => response.json())
      .then(data => setBirds(data))
      .catch(error => console.error('Error fetching birds:', error));
  }, []);

  return (
    <div>
      <h2>Birds</h2>
      {/* Butonu ekleyin ve "/addDog" sayfasına yönlendirin */}
      <Link to="/addBird" className="add-dog-button">Do you want to add a bird?</Link>
      <div className="dog-grid">
        {birds.map(bird => (
          <div key={bird.id} className="dog-card">
            <p><strong>Name:</strong> {bird.name}</p>
            <p><strong>Type:</strong> {bird.type}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

export default AdoptCat;
