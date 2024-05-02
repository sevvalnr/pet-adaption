import axios from 'axios';

export const loginUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3000/login', userData);

    return response.data;
  } catch (error) {
    throw error; 
  }
};

export const updateUserAsync = (userID, updatedUserInfo) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/user/update/${userID}`, updatedUserInfo);

      dispatch({
        type: 'UPDATE_USER',
        payload: response.data 
      });
    } catch (error) {
      console.error('Kullanıcı güncelleme hatası:', error);
    }
  };
};

