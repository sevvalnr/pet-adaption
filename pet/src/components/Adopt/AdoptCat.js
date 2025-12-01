import React, { useState, useEffect } from 'react';
import '../styles/AdoptCat.css';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCats } from '../api';
import { fetchCatsAction } from '../action/catAction';
import { connect } from 'react-redux';

const AdoptCat = ({ fetchCatsAction, catsState}) => {
  const catImage = "https://media.istockphoto.com/id/1443562748/tr/foto%C4%9Fraf/cute-ginger-cat.jpg?s=612x612&w=0&k=20&c=kFW-8Y04WTQgsf0jXufY4TecXBDQ7rQq9LOFnDskI10="
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

  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

 const navigate = useNavigate();

 const handleCatClick = (cat) => {
  navigate(`/cat/${cat.id}`)
 }

  useEffect(() => {
    const getCats = async () => {
      const catsData = await fetchCats();
      setCats(catsData);
    };

    getCats();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCatsAction();
      } catch (error) {
      }
    };
    fetchData();
  }, [fetchCatsAction]);

  // const handleCatClick = (cat) => {
  //   if (selectedCat && selectedCat.id === cat.id) {
  //     setSelectedCat(null);
  //   } else {
  //     setSelectedCat(cat);
  //   }
  // };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cats for Adoption</h2>
      <Link to="/addCat" style={styles.addButton}>Do you want to add a cat?</Link>
      <div style={styles.grid}>
  {catsState && catsState.length > 0 ? (
    catsState.map(cat => ( 
      <div key={cat.id} style={styles.card} onClick={() => handleCatClick(cat)}>
                      <img src={catImage} alt={cat.name} style={styles.image} />
                      <div style={styles.info}>
        <p style={styles.infoText}><strong>Name:</strong> {cat.name}</p>
        <p style={styles.infoText} ><strong>Age:</strong> {cat.age}</p>
        </div>

      </div> 
    ))
  ) : (
    <p>Veri yok</p>
  )}
</div>
      {selectedCat && (
        <div style={styles.details}>
          <h3 style={styles.detailsTitle}>Bird Details</h3>

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
const mapStateToProps = (state) => ({
  catsState: state.cats.cats, 
});

const mapDispatchToProps = (dispatch) => ({
  fetchCatsAction: () => dispatch(fetchCatsAction()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(AdoptCat);
