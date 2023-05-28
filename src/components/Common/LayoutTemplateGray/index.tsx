import React from 'react';
import * as s from "./styles";
import Header from '../Header';
import Footer from '../Footer/intex';

const LayoutTemplateGray = (props: { children: React.ReactNode }) => {
  return (
    <s.Container>
      <Header />
      {props.children}
      <Footer />
    </s.Container>
  )
}

export default LayoutTemplateGray;