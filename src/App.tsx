import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./pages/Main";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import globalStyles from "./fonts/GlobalStyles";
import KaKao from "./pages/KaKao";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Global styles={globalStyles}></Global>
        <Container>
          <Router>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/user/kakao-oauth" element={<KaKao />} />
            </Routes>
          </Router>
        </Container>
      </RecoilRoot>
    </>
  );
}

export default App;

const Container = styled.div``;
