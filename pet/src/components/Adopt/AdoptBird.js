import React, { useState, useEffect } from 'react';
import '../styles/AdoptBird.css'; // CSS dosyasını ekleyin
import { Link, useNavigate } from 'react-router-dom'; // React Router'ı ekleyin
import { fetchBirds } from '../api';
import { connect } from 'react-redux';
import { fetchBirdsAction } from '../action/birdAction';


const AdoptBird = ({ fetchBirdsAction, birdsState}) => {
  const birdImage =
  'https://ecologytraining.co.uk/wp-content/uploads/2021/07/Birds-for-Beginners.jpg';

  const navigate = useNavigate();


  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      textAlign: 'center',
      fontSize: '2rem',
      color: '#333',
    },
    addButton: {
      display: 'block',
      width: 'fit-content',
      margin: '20px auto',
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '5px',
      textAlign: 'center',
    },
    addButtonHover: {
      backgroundColor: '#0056b3',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginTop: '20px',
    },
    card: {
      border: '1px solid #ddd',
      borderRadius: '10px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 8px 10px rgba(0, 0, 0, 0.2)',
    },
    image: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    info: {
      padding: '15px',
      textAlign: 'center',
    },
    infoTitle: {
      marginBottom: '10px',
      fontSize: '1.2rem',
      color: '#333',
    },
    infoText: {
      margin: '5px 0',
      color: '#555',
    },
    price: {
      color: '#007bff',
      fontWeight: 'bold',
    },
    details: {
      marginTop: '20px',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
    },
    detailsTitle: {
      marginBottom: '15px',
      fontSize: '1.5rem',
    },
    bottomImage: {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '150px',
      borderRadius: '50%',
      opacity: '0.8',
    },
  };


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
    navigate(`/bird/${bird.id}`);
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
    <div style={styles.container}>
      <h2 style={styles.title}>Birds for Adoption</h2>
      <Link to="/addBird" style={styles.addButton}>
        Do you want to add a bird?
      </Link>
      <div style={styles.grid}>
        {birdsState && birdsState.length > 0 ? (
          birdsState.map((bird) => (
            <div
              key={bird.id}
              style={styles.card}
              onClick={() => handleBirdClick(bird)}
            >
              <img src={birdImage} alt={bird.name} style={styles.image} />
              <div style={styles.info}>
                <h3 style={styles.infoTitle}>{bird.name}</h3>
                <p style={styles.infoText}>
                  <strong>Type:</strong> {bird.type}
                </p>
                <p style={styles.infoText}>
                  <strong>Age:</strong> {bird.age} years
                </p>
                <p style={styles.price}>
                  <strong>Price:</strong> ${bird.price || 'Free'}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No birds available for adoption.</p>
        )}
      </div>
      {selectedBird && (
        <div style={styles.details}>
          <h3 style={styles.detailsTitle}>Bird Details</h3>
          <p>
            <strong>Name:</strong> {selectedBird.name}
          </p>
          <p>
            <strong>Owner Email:</strong> {selectedBird.email}
          </p>
          <p>
            <strong>Age:</strong> {selectedBird.age} years
          </p>
          <p>
            <strong>Type:</strong> {selectedBird.type}
          </p>
          <p>
            <strong>Location:</strong> {selectedBird.location}
          </p>
          <p>
            <strong>Description:</strong> {selectedBird.description}
          </p>
        </div>
      )}
      <img src={birdImage} alt="Bird" style={styles.bottomImage} />
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
