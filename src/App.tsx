import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import globalStyles from "./fonts/GlobalStyles";
import KaKao from "./pages/KaKao";
import { RecoilRoot } from "recoil";
import PostMyProfile from "./pages/MyProfile/PostMyProfile";
import MatchingPage from "./pages/Matching";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import MatchingPostPage from "./pages/MatchPost";
import OtherProfile from "./pages/OtherProfile";
import PostPosting from "./pages/Posting/PostPosting";
import 'react-day-picker/dist/style.css';
import GoogleRedirectHandler from "./components/Login/GoogleRedirectHandler";
import { Suspense, useEffect } from "react";
import axios from "axios";
import { axiosInstance } from "./services/HttpClient";
import NotFound from "./pages/NotFound";
import ReportModal from './components/MatchPost/ReportModal';
import PutMyProfile from "./pages/MyProfile/PutMyProfile";
import PutPosting from "./pages/Posting/PutPosting";

function App() {
  const queryClient = new QueryClient();
  const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

  /* 새로 고침 발생 시 accessToken 재발급 과정 */
  // useEffect(() => {
  //   console.log(document.cookie);
  //   axiosInstance.post(`/api/auth/token/access`)
  //     .then((res) => { 
  //       // accessToken 재발급 및 header로 설정
  //       console.log("new accessToken: ", res.data);
  //       axiosInstance.defaults.headers.common['Authorization'] = res.data.accessToken;
  //     })
  //     .catch((e) => { 
  //       console.error("유효하지 않은 refreshToken.", {e});
  //       alert("유효하지 않은 refreshToken입니다. 다시 로그인을 시도하세요.");
  //     });
  //   return;
  // }, []);

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen/>
          <Global styles={globalStyles}/>
          <Suspense fallback={<div>Loading..</div>}>
            <Container>
              <Router>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path='/matching' element={<MatchingPage></MatchingPage>}/>
                  <Route path="/user/kakao-oauth" element={<KaKao />} />
                  <Route path="/post-profile" element={<PostMyProfile />} />
                  <Route path="/put-profile" element={<PutMyProfile />} />
                  <Route path="/matchPost/:idx" element={<MatchingPostPage />} />
                  <Route path="/others/:userID" element={<OtherProfile />} />
                  <Route path="/post-posting" element={<PostPosting />} />
                  <Route path="/put-posting" element={<PutPosting />} />
                  <Route path="/google-callback" element={<GoogleRedirectHandler />} />
                  <Route path="/report/:idx" element={<ReportModal />} />
                  <Route path="/*" element={<NotFound />} />
                </Routes>
              </Router>
            </Container>
          </Suspense>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;

const Container = styled.div``
