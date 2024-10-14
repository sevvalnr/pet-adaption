import React, { useState, useEffect } from 'react';
import '../styles/AdoptDog.css'; // CSS dosyasını ekleyin
import { Link } from 'react-router-dom'; // React Router'ı ekleyin
import { fetchOther } from '../api';

const AdoptOther = () => {
  const [others, setOthers] = useState([]);
  const [selectedBird, setSelectedBird] = useState(null);
  useEffect(() => {
    const getOther = async () => {
      const otherData = await fetchOther();
      setOthers(otherData);
    };

    getOther();
  }, []);
  const handleCatClick = (other) => {
    if (selectedBird && selectedBird.id === other.id) {
      setSelectedBird(null);
    } else {
      setSelectedBird(other);
    }
  };

  return (
    <div>
      <h2>others</h2>
      <Link to="/addOther" className="add-dog-button">Do you want to add a Other?</Link>
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
