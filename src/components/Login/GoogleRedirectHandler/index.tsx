import axios from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../../recoil/atom/AccessToken';

const GoogleRedirectHandler = () => {
  const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
  const location = useLocation();
  const [cookies, setCookies] = useCookies(['refreshToken']);
  
  const [accessTokenAtom, setAccessTokenAtom] = useRecoilState<string | null>(accessTokenState);

  const handleSetAccessToken = (newAccessToken: string | null) => {
    setAccessTokenAtom(newAccessToken);
  };

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
        const refreshToken = res.data.refreshToken;

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        handleSetAccessToken(accessToken);

        setCookies('refreshToken', refreshToken, {path: '/', maxAge: 604800});
      })
      .catch((err) => {
        console.error({err});
      });
      
      // window.location.href = '/';
    }, [location.search, redirectUri, setCookies]);
    
  console.log('accessTokenAtom', {accessTokenAtom});
  return (
    <div>
      Logging in...
    </div>
  );
};

export default GoogleRedirectHandler;
