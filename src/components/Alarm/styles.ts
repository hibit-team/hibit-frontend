import styled from '@emotion/styled';
import COLORS from '../../assets/color';

export const AlarmModalWrapper = styled.div`
display:flex;
flex-direction:column;
width:100%;
`
export const AlarmTopBar =styled.div`
display:flex;
justify-content:space-between;
height:60px;
background: ${COLORS.main79};
padding: 20px 20px 20px 20px;
font-size: 22px;
font-weight: 900;
line-height:100%;
color:white;
box-sizing: border-box;
;`

//알람 탭을 포함하는 wrapper 
export const AlarmContentsWrapper = styled.div`
box-sizing:border-box;
width:100%;
padding:20px;
`;
export const AlarmTab = styled.div`
display:flex;
justify-content:space-between;
`;

//알람 컨텐츠 

export const AlarmContentBox =styled.div`
width:100%;
max-height: 320px;
overflow-y:scroll;
`
// 1. read or not 폰트 컬러 상태관리
// 2. 프로필 + 이모지:알람타입에따른 (압축)
// 3. Username 및 주요키워드 굵기 변경 렌더링
// 4. 수락 거절 상태관리

// export const AlarmContent =styled.div`
// color: ${AlarmState? main100: black}
// `