export const loginSuccess = () => ({
    type: 'LOGIN_SUCCESS',
  });
  
  export const logoutSuccess = () => ({
    type: 'LOGOUT_SUCCESS',
  });
  
  export const updateUser = (updatedUserInfo) => {
    return {
      type: 'UPDATE_USER',
      payload: updatedUserInfo
    };
  };
  