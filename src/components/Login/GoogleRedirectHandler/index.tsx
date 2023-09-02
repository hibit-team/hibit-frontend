import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { accessTokenState, profileRegisteredState, userIdxState } from '../../../recoil/atom/LoginInfoState';
import { axiosInstance } from '../../../services/HttpClient';

const GoogleRedirectHandler = () => {
  const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const location = useLocation();

  const setAccessToken = useSetRecoilState(accessTokenState);
  const setIsProfileRegistered = useSetRecoilState(profileRegisteredState);
  const setUserIdx = useSetRecoilState(userIdxState);
  
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    const body = {
      code: code,
      redirectUri: redirectUri
    }
    axios.post(`${process.env.REACT_APP_SERVER_BASE_HTTPS_URL}/api/auth/google/token`, body, {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        const accessToken = res.data.accessToken;
        const userIdx = res.data.id;
        const profileRegistered = res.data.isProfileRegistered;

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        setAccessToken(accessToken);
        setUserIdx(userIdx);
        setIsProfileRegistered(profileRegistered);

        localStorage.setItem('accessToken', `Bearer ${accessToken}`);
        localStorage.setItem('userIdx', userIdx);
        localStorage.setItem('isProfileRegistered', profileRegistered);
        
        navigate('/');
      })
      .catch((err) => {
        console.error({err});
      });

    }, [location.search]);
    
  return (
    <div>
      Logging in Google...
    </div>
  );
};

export default GoogleRedirectHandler;
