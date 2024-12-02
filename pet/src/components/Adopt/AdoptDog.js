import React, { useEffect, useState } from 'react';
import '../styles/AdoptDog.css';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDogsAction } from '../action/dogAction';

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


const AdoptDog = ({ isLoggedIn, fetchDogsAction, dogsState }) => {
 const dogImage = "https://images.squarespace-cdn.com/content/v1/54822a56e4b0b30bd821480c/45ed8ecf-0bb2-4e34-8fcf-624db47c43c8/Golden+Retrievers+dans+pet+care.jpeg";
  const [selectedDog, setSelectedDog] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchDogsAction();
      } catch (error) {
      }
    };
    fetchData();
  }, [fetchDogsAction]);

  // const handleDogClick = (dog) => {
  //   if (selectedDog && selectedDog.id === dog.id) {
  //     setSelectedDog(null);
  //   } else {
  //     setSelectedDog(dog);
  //   }
  // };
  const handleDogClick = (dog) => {
    navigate(`/dog/${dog.id}`);
  }

  return (
    <div style={styles.container}>
            <h2 style={styles.title}>Birds for Adoption</h2>

      {isLoggedIn && (
        <div>
          <Link to="/addDog" style={styles.addButton}>Do you want to add a dog?</Link>
        </div>
      )}
      <div style={styles.grid}>
        {dogsState && dogsState.length > 0 ? (
          dogsState.map(dog => (
            <div key={dog.id} style={styles.card}
            onClick={() => handleDogClick(dog)}>
               <img src={dogImage} alt={dog.name} style={styles.image} />
               <div style={styles.info}>

              <p><strong>Name:</strong> {dog.name}</p>
              <p><strong>Type:</strong> {dog.type}</p>
              {dog.images && dog.images.length > 0 && (
                <img src={`http://localhost:3000/${dog.images[0]}`} alt={`${dog.name}`} className="dog-image" />
              )}
           </div>

          </div>
          ))
        ) : (
          <p>Veri yok</p>
        )}
      </div>
      {selectedDog && (
          <div style={styles.details}>
          <h3 style={styles.detailsTitle}>Bird Details</h3>
          <p><strong>Owner Email:</strong> {selectedDog.email}</p>
          <p><strong>Age:</strong> {selectedDog.age}</p>
          <p><strong>Type:</strong> {selectedDog.type}</p>
          <p><strong>Location:</strong> {selectedDog.location}</p>
          <p><strong>Description:</strong> {selectedDog.description}</p>
          {selectedDog.images && selectedDog.images.map((image, index) => (
            <img key={index} src={`http://localhost:3000/${image}`} alt={`${selectedDog.name}-${index}`} className="dog-image-detail" />
          ))}
                <img src={dogImage} alt="Bird" style={styles.bottomImage} />

        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.user.isLoggedIn,
  dogsState: state.dogs.dogs,
});

const mapDispatchToProps = (dispatch) => ({
  fetchDogsAction: () => dispatch(fetchDogsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdoptDog);
