import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from './action/userAction'; // actions.js dosyasına göre düzenleyin

const Profile = ({ userID, initialUserInfo ,isLoggedIn}) => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(initialUserInfo || { name: '', email: '' });
  const [updateError, setUpdateError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = () => {
    setIsUpdating(true);
  };

  useEffect(() => {
    const updateUserProfile = async () => {
      try {
        dispatch(updateUser(userID, userInfo));
        alert('Profil güncellendi!');
      } catch (error) {
        setUpdateError('Profil güncelleme hatası!');
      } finally {
        setIsUpdating(false);
      }
    };

    if (isUpdating) {
      updateUserProfile();
    }
  }, [dispatch, isUpdating, userID, userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <input type="text" name="email" value={userInfo.email} onChange={handleChange} placeholder="email"/>
      <button onClick={handleUpdate} disabled={isUpdating}>
        {isUpdating ? 'Güncelleniyor...' : 'Güncelle'}
      </button>
      {updateError && <p>{updateError}</p>}
    </div>
  );
};

export default Profile;
