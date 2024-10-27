import { useDispatch } from 'react-redux';
import { updateUser } from './action/userAction'; // actions.js dosyasına göre düzenleyin
import React, { useState, useEffect } from 'react';
import './styles/Profile.css'; // 
import axios from 'axios';
import { getUserIdFromToken } from './helpers/auth';
import { fetchBirdsByUserId, fetchCatsByUserId, fetchDogsByUserId, fetchOthersByUserId } from './api';

const Profile = ({ userID, initialUserInfo, isLoggedIn }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState('');
  const[userDogs, setUserDogs] = useState([])
  const[userCats, setUserCats] = useState([])
  const[userOthers, setUserOthers] = useState([])
  const[userBirds, setUserBirds] = useState([])

  const [showAddCat, setShowAddCat] = useState(false);
  const [selectedBird, setSelectedBird] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedDog, setSelectedDog] = useState(null);
  const [selectedOther, setSelectedOther] = useState(null);
  useEffect(() => {
    const id = getUserIdFromToken();
    if (id) {
      setUserId(id); 
    }
  }, []);
  useEffect(() => {
    const fetchBirdsByUser = async () => {
      if (userId) {
      const birdsData = await fetchBirdsByUserId(userId);
      setUserBirds(birdsData);
      }
    };
    fetchBirdsByUser();
  }, [userId]);
  useEffect(() => {
    const fetchDogsByUser = async () => {
      if (userId) {
      const dogsData = await fetchDogsByUserId(userId);
      setUserDogs(dogsData);
      }
    };
    fetchDogsByUser();
  }, [userId]);
  useEffect(() => {
    const fetchCatsByUser = async () => {
      if (userId) {
      const catsData = await fetchCatsByUserId(userId);
      setUserCats(catsData);
      }
    };
    fetchCatsByUser();
  }, [userId]);
  useEffect(() => {
    const fetchOthersByUser = async () => {
      if (userId) {
      const othersData = await fetchOthersByUserId(userId);
      setUserOthers(othersData);
    }
    };
    fetchOthersByUser();
  }, [userId]);


  const handleBirdClick = (userBirds) => {
    if (selectedBird && selectedBird.id === userBirds.id) {
      setSelectedBird(null);
    } else {
      setSelectedBird(userBirds);
    }
  };
  const handleOtherClick = (userOthers) => {
    if (selectedOther && selectedOther.id === userOthers.id) {
      setSelectedOther(null);
    } else {
      setSelectedOther(userOthers);
    }
  };
  const handleCatClick = (userCats) => {
    if (selectedCat && selectedCat.id === userCats.id) {
      setSelectedCat(null);
    } else {
      setSelectedCat(userCats);
    }
  };
  const handleDogClick = (userDogs) => {
    if (selectedDog && selectedDog.id === userDogs.id) {
      selectedDog(null);
    } else {
      selectedDog(userBirds);
    }
  };

  return (
    <div>
  <h2 style={{ margin: '15px auto 20px', width: 'fit-content' }}>User Advertisement</h2>
      <div className="profile-grid">

         <div className="bird-grid">
          {userBirds?.map(userBirds => (
            <div key={userBirds.id} className="bird-card" onClick={() => handleBirdClick(userBirds)}>
              <p><strong>Name:</strong> {userBirds.name}</p>
              <p><strong>Type:</strong> {userBirds.type}</p>
            </div>
          ))}
        </div>
        <div className="bird-grid">
          {userCats?.map(userCats => (
            <div key={userCats.id} className="bird-card" onClick={() => handleCatClick(userCats)}>
              <p><strong>Name:</strong> {userCats.name}</p>
              <p><strong>Type:</strong> {userCats.type}</p>
            </div>
          ))}
        </div>
        <div className="bird-grid">
          {userDogs?.map(userDogs => (
            <div key={userDogs.id} className="bird-card" onClick={() => handleDogClick(userBirds)}>
              <p><strong>Name:</strong> {userDogs.name}</p>
              <p><strong>Type:</strong> {userDogs.type}</p>
            </div>
          ))}
        </div>
        <div className="bird-grid">
          {userOthers?.map(userOthers => (
            <div key={userOthers.id} className="bird-card" onClick={() => handleOtherClick(userOthers)}>
              <p><strong>Name:</strong> {userOthers.name}</p>
              <p><strong>Type:</strong> {userOthers.type}</p>
            </div>
          ))}
        </div>
      </div>
      
      </div>
  );
};

export default Profile;