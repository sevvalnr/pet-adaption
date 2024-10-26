
import Cookies from 'js-cookie'; // Import ifadelerini en üstte sıralayın
import { jwtDecode } from 'jwt-decode'; 

const axios = require("axios").default;
const createBearerToken = () => {
    const bearerToken = `Bearer ${getCookie("user_token")}`;
    return bearerToken;
  };
  const checkUserToken = () => {
    if (getCookie("user_token")) {
      return true;
    } else {
      return false;
    }
  };
    export const getUserId = () => {
        const token = Cookies.get('user_token');

        if (token) {
            try {
                // Token'ı decode et
                const decodedToken = jwtDecode(token);
                // userId'yi döndür
                return decodedToken.userId; // userId'nin token'daki anahtarı
            } catch (error) {
                console.error("Token decode hatası:", error);
            }
        }
        console.log(token,"auth")
        return null; 
    };
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };    

  const checkAuthentication = async (apiUrl) => {
    if (!checkUserToken()) {
      return false;
    }
  
    try {
      const bearerToken = createBearerToken();
  
      await axios.get(`${apiUrl}/users/${getUserId()}/companies`, {
        headers: {
          Authorization: bearerToken,
        },
      });
    } catch (e) {
      document.cookie =
        "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      return false;
    }
  
    return true;
  };


  