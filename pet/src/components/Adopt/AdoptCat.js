import React, { useState, useEffect } from 'react';
import '../styles/AdoptDog.css'; // CSS dosyasını ekleyin
import { Link } from 'react-router-dom'; // React Router'ı ekleyin

const AdoptCat = () => {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/cat')
      .then(response => response.json())
      .then(data => setDogs(data))
      .catch(error => console.error('Error fetching dogs:', error));
  }, []);

  return (
    <div>
      <h2>Dogs</h2>
      {/* Butonu ekleyin ve "/addDog" sayfasına yönlendirin */}
      <Link to="/addDog" className="add-dog-button">Do you want to add a dog?</Link>
      <div className="dog-grid">
        {dogs.map(dog => (
          <div key={dog.id} className="dog-card">
            <p><strong>Name:</strong> {dog.name}</p>
            <p><strong>Type:</strong> {dog.type}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

export default AdoptCat;
