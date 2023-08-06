import React from 'react';

const useIsLogin = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

export default useIsLogin;
