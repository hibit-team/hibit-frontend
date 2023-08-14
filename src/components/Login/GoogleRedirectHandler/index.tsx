import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState, isLoggedInState } from '../../../recoil/atom/AccessToken';

const GoogleRedirectHandler = () => {
  const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const location = useLocation();
  const setAccessToken = useSetRecoilState(accessTokenState);
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const handleSetAccessToken = (newAccessToken: string) => {
    setAccessToken(newAccessToken);
  };
  
  const navigate = useNavigate();
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
      .then((res) => {
        console.log(res.data);
        const accessToken = res.data.accessToken;

        axios.defaults.headers.common['Authorization'] = `${accessToken}`;
        setAccessToken(accessToken);

        navigate('/');
      })
      .catch((err) => {
        console.error({err});
      });

    }, [location.search, redirectUri]);
    
  return (
    <div>
      Logging in Google...
    </div>
  );
};

export default GoogleRedirectHandler;
