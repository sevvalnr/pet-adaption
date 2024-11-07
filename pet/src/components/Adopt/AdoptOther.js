import React, { useState, useEffect } from 'react';
import '../styles/AdoptDog.css'; // CSS dosyasını ekleyin
import { Link } from 'react-router-dom'; // React Router'ı ekleyin
import { fetchOther } from '../api';
import { connect } from 'react-redux';
import { fetchOthersAction } from '../action/otherAction';

const AdoptOther = ({fetchOthersAction, othersData}) => {
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchOthersAction();
      } catch (error) {
      }
    };
    fetchData();
  }, [fetchOthersAction]);
  return (
    <div>
      <h2>others</h2>
      <Link to="/addOther" className="add-dog-button">Do you want to add a Other?</Link>
      <div className="dog-grid">
      {othersData && othersData.length > 0 ? (
        othersData.map(other => (
          <div key={other.id} className="dog-card" onClick={() => handleCatClick(other)}>
            <p><strong>Name:</strong> {other.name}</p>
            <p><strong>Type:</strong> {other.type}</p>
            </div> 
                ))
  ) : (
    <p>Veri yok</p>
  )}
  
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
const mapStateToProps = (state) => ({
  othersData: state.others.others, 
});

const mapDispatchToProps = (dispatch) => ({
  fetchOthersAction: () => dispatch(fetchOthersAction()), 
});
export default connect(mapStateToProps, mapDispatchToProps)(AdoptOther);
