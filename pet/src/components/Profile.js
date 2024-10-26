import { useDispatch } from 'react-redux';
import { updateUser } from './action/userAction'; // actions.js dosyasına göre düzenleyin
import React, { useState, useEffect } from 'react';
import './styles/Profile.css'; // 

// import AddDog from './AddDog'; 
// import AddCat from './AddCat'; 
// import AddBird from './AddBird';
// import AddOther from './AddOther'; 
import axios from 'axios';
// const [setError, setSetError] = useState(null);

const Profile = ({ userID, initialUserInfo, isLoggedIn }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(initialUserInfo || { name: '', email: '' });
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [userDogAds, setUserDogAds] = useState([]);
  const [userCatAds, setUserCatAds] = useState([]);
  const [userBirdAds, setUserBirdAds] = useState([]);
  const [userOtherAds, setUserOtherAds] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form gönderme işlemleri
  };

  useEffect(() => {
    // Kullanıcı bilgilerini getir
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/:email'); 
        setUserInfo(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError('An error occurred while fetching user info. Please try again later.');
      }
    };

    const fetchUserDogAds = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/dog/${userInfo.email}`);
        setUserDogAds(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user dog ads:', error);
        setError('An error occurred while fetching user dog ads. Please try again later.');
      }
    };
    
    const fetchUserCatAds = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/cat/${userInfo.email}`);
        setUserCatAds(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user cat ads:', error);
        setError('An error occurred while fetching user cat ads. Please try again later.');
      }
    };
    const fetchUserBirdAds = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/bird/${userInfo.email}`);
        setUserBirdAds(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user bird ads:', error);
        setError('An error occurred while fetching user bird ads. Please try again later.');
      }
    };
    const fetchUserOtherAds = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/others/${userInfo.email}`);
        setUserOtherAds(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching user other ads:', error);
        setError('An error occurred while fetching user other ads. Please try again later.');
      }
    };
    fetchUserInfo();
    fetchUserDogAds();
    fetchUserCatAds();
    fetchUserBirdAds();
    fetchUserOtherAds();
  }, [userInfo.email]);

  const handleUpdate = () => {
    setIsUpdating(true);
    try {
      dispatch(updateUser(userID, userInfo));
      alert('Profil güncellendi!');
    } catch (error) {
      setUpdateError('Profil güncelleme hatası!');
    } finally {
      setIsUpdating(false);
    }
  };
  // const handleDeleteCat = async (name) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:3000/cats/${name}`);
  //     alert(response.data.message);
  //     // Kedi silindikten sonra ilanları yeniden yükle
  //     fetchUserCatAds();
  //   } catch (error) {
  //     console.error('Error deleting cat:', error);
  //     alert('An error occurred while deleting the cat. Please try again later.');
  //   }
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Kullanıcı bilgilerini güncelleme
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      {/* Kullanıcı bilgilerini gösterme */}
      {/* <input type="text" name="email" value={userInfo.email} onChange={handleChange} placeholder="email" />
      <button onClick={handleUpdate} disabled={isUpdating}>
        {isUpdating ? 'Güncelleniyor...' : 'Güncelle'}
      </button>
      {updateError && <p>{updateError}</p>}

      Kullanıcının ilanlarını gösterme */}
  <h2 style={{ margin: '15px auto 20px', width: 'fit-content' }}>User Advertisement</h2>
      <div className="profile-grid">

        {userDogAds.map((dogAd, index) => (
             
          <div key={index} className="profile-grid-item1">
               <h3>Dog</h3>
            <p><strong>Name:</strong> {dogAd.name}</p>
            <p><strong>Type:</strong> {dogAd.type}</p>
            {/* Diğer ilan bilgilerini gösterme */}
          </div>
        ))}
        {userCatAds.map((catAd, index) => (
          <div key={index} className="profile-grid-item2">
                 <h3>Cat</h3>
            <p><strong>Name:</strong> {catAd.name}</p>
            <p><strong>Type:</strong> {catAd.type}</p>
            {/* Diğer ilan bilgilerini gösterme */}
          </div>
        ))}
        {userBirdAds.map((birdAd, index) => (
          <div key={index} className="profile-grid-item3">
                 <h3>Bird</h3>
            <p><strong>Name:</strong> {birdAd.name}</p>
            <p><strong>Type:</strong> {birdAd.type}</p>
            {/* Diğer ilan bilgilerini gösterme */}
          </div>
        ))}
        {userOtherAds.map((otherAd, index) => (
          <div key={index} className="profile-grid-item4">
                 <h3>Other</h3>
            <p><strong>Name:</strong> {otherAd.name}</p>
            <p><strong>Type:</strong> {otherAd.type}</p>
            {/* Diğer ilan bilgilerini gösterme */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;