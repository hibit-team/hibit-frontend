import * as s from './styles';

const MobileNavbar =()=>{
  const isLogged = true;//상태관리 필요
    if(isLogged) {
      return(
        <s.MobileNavbarWrapper>
        <s.MobileNavDiv>서비스 소개</s.MobileNavDiv>
        <s.MobileNavDiv>매칭</s.MobileNavDiv>
        <s.MobileNavDiv>회원가입</s.MobileNavDiv>
        <s.MobileNavDiv>프로필</s.MobileNavDiv>
        <s.MobileNavDiv>로그아웃</s.MobileNavDiv>
        <s.MobileNavDiv> </s.MobileNavDiv>
      </s.MobileNavbarWrapper>
      );
    }
    return( <s.MobileNavbarWrapper>
      <s.MobileNavDiv>회원가입</s.MobileNavDiv>
      <s.MobileNavDiv>로그인</s.MobileNavDiv>
      <s.MobileNavDiv>서비스 소개</s.MobileNavDiv>
      <s.MobileNavDiv>매칭</s.MobileNavDiv>
      <s.MobileNavDiv>프로필</s.MobileNavDiv>
      <s.MobileNavDiv> </s.MobileNavDiv>
    </s.MobileNavbarWrapper>);
};

export default MobileNavbar;