import React, { useState, useEffect } from 'react';
import '../styles/AdoptCat.css';
import { Link } from 'react-router-dom';
import { fetchCats } from '../api';
import { fetchCatsAction } from '../action/catAction';
import { connect } from 'react-redux';

const AdoptCat = ({ fetchCatsAction, catsState}) => {
  const [cats, setCats] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);

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

  const handleCatClick = (cat) => {
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
  {catsState && catsState.length > 0 ? (
    catsState.map(cat => ( 
      <div key={cat.id} className="cat-card" onClick={() => handleCatClick(cat)}>
        <p><strong>Name:</strong> {cat.name}</p>
        <p><strong>Age:</strong> {cat.age}</p>
      </div> 
    ))
  ) : (
    <p>Veri yok</p>
  )}
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
const mapStateToProps = (state) => ({
  catsState: state.cats.cats, 
});

const mapDispatchToProps = (dispatch) => ({
  fetchCatsAction: () => dispatch(fetchCatsAction()), 
});

export default connect(mapStateToProps, mapDispatchToProps)(AdoptCat);
