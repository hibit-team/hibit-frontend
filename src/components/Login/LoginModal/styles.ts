import styled from "@emotion/styled";

interface IModalOpen {
  isOpen: boolean;
};

export const Wrapper = styled.div<IModalOpen>`
  font-family: 'SUIT';
  display: ${(props) => props.isOpen ? "flex" : "none"};
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 5;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 680px;
  height: 466px;
  border-radius: 16px;
  background-color: rgba(255, 255, 255, 1);
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 76px;
  background-color: #804DD3;
`;

export const HeaderText = styled.div`
  color: white;
  font-size: 24px;
  font-weight: 800;
  margin-left: 28px;
`;

export const CloseBtn = styled.div`
  margin-right: 24px;
  cursor: pointer;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

export const IconContainer = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 180px;
  height: 180px;
  color: #797979;
`;

export const StrongText = styled.div`
  font-size: 24px;
  font-weight: 500;
  margin-top: 20px;
`;

export const NormalText = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 10px;
`;

export const VerticalLine = styled.div`
  width: 0.1px;
  height: 180px;
  margin-top: 40px;
  border: 1px solid;
  border-color: #C9C9C9;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  align-items: center;
  justify-content: center;
`;

export const IntroText = styled.div`
  font-size: 18px;
  font-weight: 500;
  white-space: nowrap;
`;

export const IntroStrongText = styled.span`
  font-size: 18px;
  font-weight: 800;
`;

export const LoginBtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  width: 540px;
`;