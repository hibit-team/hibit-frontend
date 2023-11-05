import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { accessTokenState, profileRegisteredState, userIdxState } from '../../../recoil/atom/LoginInfoState';
import { axiosInstance } from '../../../services/HttpClient';
import LottiePageRouting from '../../LottieFiles/LottiePageRouting';

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
        const accessToken: string | null = res.data.accessToken;
        const userIdx: number | null = res.data.id;
        let profileRegistered: boolean | null;
        if(res.data.isProfileRegistered === 0) {
          profileRegistered = false;
          setAccessToken(accessToken);
          setUserIdx(userIdx);
          setIsProfileRegistered(profileRegistered);
        }
        else if (res.data.isProfileRegistered === 1) {
          profileRegistered = true;
          setAccessToken(accessToken);
          setUserIdx(userIdx);
          setIsProfileRegistered(profileRegistered);
        }
        console.log({res});
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('accessToken', `Bearer ${accessToken}`);

        navigate('/');
      })
      .catch((err) => {
        console.error({err});
      });

    }, [location.search]);
    
  return (
    <div>
      <LottiePageRouting/>
    </div>
  );
};

export default GoogleRedirectHandler;
