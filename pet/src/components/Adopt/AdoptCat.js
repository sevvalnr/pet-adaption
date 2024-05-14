import React, { useState, useEffect } from 'react';
import '../styles/AdoptCat.css';
import { Link } from 'react-router-dom';

const AdoptCat = () => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/cat')
      .then(response => response.json())
      .then(data => setCats(data))
      .catch(error => console.error('Error fetching cats:', error));
  }, []);

  const handleCatClick = (cat) => {
    // Eğer tıklanan kedi zaten seçili kedi ise, seçili kedi durumunu null yaparak detayları kapat
    if (selectedCat && selectedCat.id === cat.id) {
      setSelectedCat(null);
    } else {
      setSelectedCat(cat);
    }
  };

  return (
    <div>
      <h2>Cats</h2>
      <Link to="/addCat" className="add-cat-button">Do you want to add a cat?</Link>
      <div className="cat-grid">
        {cats.map(cat => (
          <div key={cat.id} className="cat-card" onClick={() => handleCatClick(cat)}>
            <p><strong>Name:</strong> {cat.name}</p>
            <p><strong>Age:</strong> {cat.age}</p>
          </div>
        ))}
      </div>
      {selectedCat && (
        <div>
          <p><strong>Owner Email:</strong> {selectedCat.email}</p>
          <p><strong>Age:</strong> {selectedCat.age}</p>
          <p><strong>Type:</strong> {selectedCat.type}</p>
          <p><strong>Location:</strong> {selectedCat.location}</p>
          <p><strong>Description:</strong> {selectedCat.description}</p>
        </div>
      )}
    </div>
  );
};

export default AdoptCat;