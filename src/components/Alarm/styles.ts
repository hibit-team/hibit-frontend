import styled from '@emotion/styled';

export const MobileModalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 10,
  },
  content: {
    display: 'flex',
    width: '420px',
    height: '400px',
    justifyContent: 'center',
    top: '122px',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    borderRadius: '1rem',
    padding: '0',
    margin: '0 auto',
    maxWidth: '100vw',
    overflow: 'hidden',
  }
};

export const WebModalStyle: ReactModal.Styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    zIndex: 10,
  },
  content: {
    display: 'flex',
    width: '330px',
    height: '460px',
    justifyContent: 'center',
    top: '78px',
    left: 570,
    right: 0,
    bottom: 0,
    zIndex: 10,
    borderRadius: '1rem',
    padding: '0',
    margin: '0 auto',
    maxWidth: '100vw',
    overflow: 'hidden',
  }
};

export const AlarmModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AlarmTopBar = styled.div`
  display: flex;
  justify-content: space-between;
  height: 60px;
  background: #804DD3;
  font-size: 18px;
  font-weight: 600;
  color: white;
;`

export const AlarmTopBarText = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
`;

export const AlarmCloseIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-right: 20px;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

export const AlarmCloseBtn = styled.img`
  display: flex;
`;

export const AlarmBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 330px;
`;

export const TabContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 406px;
`;

export const TabContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 406px;
`;

export const Tabs = styled.div`
  display: flex;
  flex-direction: row;
  width: 290px;
  height: 30px;
  margin-top: 19px;
`;

export const Left1 = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  font-size: 18px;
  font-weight: 800;
  color: #5e1ec7;
  border-bottom: 2px solid #5E1EC7;
  cursor: pointer;
`;

export const Right1 = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid #C9C9C9;
  cursor: pointer;
`;

export const Left2 = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  font-size: 18px;
  font-weight: 500;
  border-bottom: 1px solid #c9c9c9;
  cursor: pointer;
`;

export const Right2 = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  font-size: 18px;
  font-weight: 800;
  color: #5e1ec7;
  border-bottom: 2px solid #5E1EC7;
  cursor: pointer;
`;

export const AlarmList = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 338px;
`;
