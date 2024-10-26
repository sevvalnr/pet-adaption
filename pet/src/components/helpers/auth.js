
import Cookies from 'js-cookie';
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
                const decodedToken = jwtDecode(token);
                return decodedToken.userId;
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

export const getUserIdFromToken = () => {
  const name = "user_token=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodedCookie.split(';');
  for (let cookie of cookiesArray) {
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      const token = cookie.substring(name.length, cookie.length);
      const decoded = jwtDecode(token);
      return decoded.user_id;
    }
  }
  return null;
};

  