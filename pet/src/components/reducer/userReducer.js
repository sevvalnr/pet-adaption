const initialState = {
    isLoggedIn: false,
    userInfo: null
  };
  
  // const userReducer = (state = initialState, action) => {
  //   switch (action.type) {
  //     case 'LOGIN_SUCCESS':
  //       return {
  //         ...state,
  //         isLoggedIn: true,
  //         userInfo: action.payload
  //       };
  //     case 'LOGOUT':
  //     case 'LOGOUT_SUCCESS':
  //       return {
  //         ...state,
  //         isLoggedIn: false,
  //         userInfo: null
  //       };
  //     default:
  //       return state;
  //   }
  // };
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          isLoggedIn: true,
          userInfo: action.payload
        };
      case 'LOGOUT':
      case 'LOGOUT_SUCCESS':
        return {
          ...state,
          isLoggedIn: false,
          userInfo: null
        };
      case 'UPDATE_USER':
        // Kullanıcıyı güncelle
        const updatedUserInfo = action.payload;
        return {
          ...state,
          userInfo: {
            ...state.userInfo,
            ...updatedUserInfo
          }
        };
      default:
        return state;
    }
  };
  

  export default userReducer;