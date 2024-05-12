import React, { useState, useEffect } from 'react';
import '../styles/AdoptDog.css'; // CSS dosyasını ekleyin
import { Link } from 'react-router-dom'; // React Router'ı ekleyin

const AdoptOther = () => {
  const [others, setOthers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/other')
      .then(response => response.json())
      .then(data => setOthers(data))
      .catch(error => console.error('Error fetching dogs:', error));
  }, []);

  return (
    <div>
      <h2>others</h2>
      {/* Butonu ekleyin ve "/addDog" sayfasına yönlendirin */}
      <Link to="/addDog" className="add-dog-button">Do you want to add a Other?</Link>
      <div className="dog-grid">
        {others.map(other => (
          <div key={other.id} className="dog-card">
            <p><strong>Name:</strong> {other.name}</p>
            <p><strong>Type:</strong> {other.type}</p>
          </div>
        ))}
      </div>
    </div>
  );

};

export default AdoptOther;
