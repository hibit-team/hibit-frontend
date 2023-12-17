import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/Main';
import styled from '@emotion/styled';
import { Global } from '@emotion/react';
import globalStyles from './fonts/GlobalStyles';
import KaKao from './pages/KaKao';
import PostMyProfile from './pages/MyProfile/PostMyProfile';
import MatchingPage from './pages/Matching';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MatchingPostPage from './pages/MatchPost';
import OtherProfile from './pages/OtherProfile';
import PostPosting from './pages/Posting/PostPosting';
import 'react-day-picker/dist/style.css';
import GoogleRedirectHandler from './components/Login/GoogleRedirectHandler';
import { Suspense, useEffect, useState } from 'react';
import HttpClient, { axiosInstance } from './services/HttpClient';
import NotFound from './pages/NotFound';
import ReportModal from './components/MatchPost/ReportModal';
import PutMyProfile from './pages/MyProfile/PutMyProfile';
import PutPosting from './pages/Posting/PutPosting';
import LottiePageRouting from './components/LottieFiles/LottiePageRouting';
import useIsMobile from './hooks/useIsMobile';
import MobileLanding from './pages/MobileLanding';
import { useSetRecoilState } from 'recoil';
import { profileRegisteredState, userIdxState } from './recoil/atom/LoginInfoState';
import { AxiosError } from 'axios';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { isLoginAtom } from './recoil/atom/isLoginAtom';

function App() {
  const queryClient = new QueryClient();

  const setIsProfileRegistered = useSetRecoilState(profileRegisteredState);
  const setUserIdx = useSetRecoilState(userIdxState);

  const setIsLoginAtom = useSetRecoilState(isLoginAtom);
  const [trigger, setTrigger] = useState(false);

  const refreshToken = () => {
    const accessToken: string | null = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoginAtom(true);
      axiosInstance
        .post(`/api/auth/token/access`)
        .then(res => {
          const token = res?.data?.accessToken;
          if (!!token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('accessToken', `${token}`);
          }
        })
        .catch((error: AxiosError) => {
          if (error?.response?.status === 401 || error?.response?.status === 404) {
            //유효하지않은 문자열 && 토큰 만료 401
            //본인의 토큰이 아닌 경우 404
            localStorage.removeItem('accessToken');
            setIsLoginAtom(false);
            alert('유효하지 않은 토큰입니다. 다시 로그인 해주세요');
            return;
          }
          return;
        });
    }
  };

  // 1. 유효성 검증 통과시 access token 갱신
  useEffect(() => {
    refreshToken();
  }, [trigger]);

  // 2. interceptor 유효성 검사 
  useEffect(() => {
    const accessToken: string | null = localStorage.getItem('accessToken');
    axiosInstance.interceptors.request.use(
      async config => {
        try {
          // decode token
          if (accessToken) {
            const decodedToken = jwtDecode<JwtPayload>(accessToken);
            const currentTime = Date.now() / 1000;
            // 유효성 검증 ( 만료 5분 전을 초과했다면 access 갱신 )
            if (decodedToken.exp && decodedToken.exp < currentTime + 300) {
              setTrigger(!trigger);
            }
          }
        } catch (error) {
          localStorage.removeItem('accessToken'); // refresh 토큰 만료시 로컬스토리지 accessToken 삭제
          alert('유효하지 않은 토큰입니다. 다시 로그인 해주세요');
          throw error;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }, []);

  useEffect(() => {
    const accessToken: string | null = localStorage.getItem('accessToken');
    if (accessToken) {
      HttpClient.get('/api/members/find')
        .then(res => {
          const userIdx: number | null = res.idx;
          const profileRegistered: boolean = res.isprofile;
          setUserIdx(userIdx);
          setIsProfileRegistered(profileRegistered);
        })
        .catch((error: AxiosError) => {
          console.error(error.message);
          return;
        });
    }
  }, []);

  const isMobile = useIsMobile();
  if (isMobile) return <MobileLanding />;

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen />}
        <Global styles={globalStyles} />
        <Suspense
          fallback={
            <div>
              <LottiePageRouting />
            </div>
          }
        >
          <Container>
            <Router>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/matching" element={<MatchingPage />} />
                <Route path="/user/kakao-oauth" element={<KaKao />} />
                <Route path="/post-profile" element={<PostMyProfile />} />
                <Route path="/put-profile" element={<PutMyProfile />} />
                <Route path="/matchPost/:idx" element={<MatchingPostPage />} />
                <Route path="/others/:userID" element={<OtherProfile />} />
                <Route path="/post-posting" element={<PostPosting />} />
                <Route path="/put-posting/:idx" element={<PutPosting />} />
                <Route path="/google-callback" element={<GoogleRedirectHandler />} />
                <Route path="/report/:idx" element={<ReportModal />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Router>
          </Container>
        </Suspense>
      </QueryClientProvider>
    </>
  );
}

export default App;

const Container = styled.div``;
