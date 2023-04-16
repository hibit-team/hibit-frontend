import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from './pages/Main';
import styled from "@emotion/styled";
import KaKao from './pages/KaKao';

function App() {
  return (
    <Container>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/user/kakao-oauth' element={<KaKao />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.div``;