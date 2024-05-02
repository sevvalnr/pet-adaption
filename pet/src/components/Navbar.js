import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { logoutSuccess } from './action/userAction';
//import Cookies from 'js-cookie';
import "./styles/Navbar.css"; 

const Navbar = ({  }) => {
//   useEffect(() => {
//     // Her bileşen yeniden render edildiğinde cookie kontrolü yapılacak
//     const jwtCookie = Cookies.get('jwt');
//     const isLoggedInCookie = !!jwtCookie;
//     if (isLoggedIn !== isLoggedInCookie) {
//       // isLoggedIn değeri cookie değerine eşit değilse, durumu güncelle
//       dispatch({
//         type: isLoggedInCookie ? 'LOGIN_SUCCESS' : 'LOGOUT_SUCCESS'
//       });
//     }
//   }, [dispatch, isLoggedIn]);

//   const handleLogout = () => {
//     dispatch(logoutSuccess());
//     Cookies.remove('jwt'); // Cookie'yi sil
//   };

  return (
    <div className="navbar">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/profile">Profile</Link>
      </div>
      <div >
        <Link to="/signUp">SignUp</Link>
      </div>
      <div>
        <Link to="/pets">Pets</Link>
      </div>
      <div>
        
          <Link to="/login">Log In</Link>
        
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  //isLoggedIn: state.user.isLoggedIn,
});

export default connect(mapStateToProps)(Navbar);
