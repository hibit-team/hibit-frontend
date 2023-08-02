import axios from 'axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GoogleRedirectHandler = () => {
  const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    console.log('Received code:', code);
    const body = {
      code: code,
      redirectUri: redirectUri
    }
    axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/google/token`, body, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((data) => {
        console.log({data});
        // 브라우저에서 토큰 관리
      })
      .catch((err) => {
        console.error({err});
      });

    // window.location.href = '/'; // React Router를 사용하는 경우: history.push('/')
  }, [location.search]);

  return (
    <div>
      Logging in...
    </div>
  );
};

export default GoogleRedirectHandler;
