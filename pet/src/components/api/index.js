import axios from 'axios';
//import Cookies from 'js-cookie';

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//       if (isLoggedIn) {
//           console.log('Kullanıcı zaten giriş yapmış.');
//           return;
//       }

//       const response = await axios.post(`${apiBaseUrl}/login`, {
//           email,
//           password
//       }, {
//           headers: {
//               'Content-Type': 'application/json',
//           }
//       });

//       const data = response.data;

//       if (response.status === 200) {
//           setIsLoggedIn(true);
//           dispatch(loginSuccess());

//           // JWT'yi cookie içine yerleştirme
//           Cookies.set('jwt', data.token, { expires: 1, secure: true, sameSite: 'strict' });

//           navigate('/profile');
//       } else {
//           setError(data.message);
//       }
//   } catch (error) {
//       console.error('Giriş yaparken hata oluştu:', error);
//   }
// };

export  const fetchDogs = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/dog`);
    console.log(response.data,"havvv")
    return response.data;
  } catch (error) {
    console.error('Error fetching dogs:', error);
  }
};

export  const fetchCats = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/cat`);

    return response.data;
  } catch (error) {
    console.error('Error fetching dogs:', error);
  }
};

export  const fetchBirds = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/bird`);

    return response.data;
  } catch (error) {
    console.error('Error fetching dogs:', error);
  }
};

export  const fetchOther = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/other`);

    return response.data;
  } catch (error) {
    console.error('Error fetching dogs:', error);
  }
};