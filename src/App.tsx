import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main";
import styled from "@emotion/styled";
import { Global } from "@emotion/react";
import globalStyles from "./fonts/GlobalStyles";
import KaKao from "./pages/KaKao";
import { RecoilRoot } from "recoil";
import MyProfile from "./pages/MyProfile";
import MatchingPage from "./pages/Matching";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen/>
        <Global styles={globalStyles}></Global>
        <Container>
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path='/matching' element={<MatchingPage></MatchingPage>}/>
              <Route path="/user/kakao-oauth" element={<KaKao />} />
              <Route path="/profile" element={<MyProfile />} />
            </Routes>
          </Router>
        </Container>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
}

export default App;

const Container = styled.div``;
