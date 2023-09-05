import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState, profileRegisteredState, userIdxState } from '../recoil/atom/LoginInfoState';

export interface ILoginInfo {
  userIdx: number | null,
  isProfileRegistered: number | null,
  isLoggedIn: boolean
}

const useLoginInfo = (): ILoginInfo => {
  const [loginInfo, setLoginInfo] = useState<ILoginInfo>({
    userIdx: null,
    isProfileRegistered: null,
    isLoggedIn: false
  });

  const accessToken = localStorage.getItem('accessToken');

  let userIdx: number | null = useRecoilValue(userIdxState);
  if (localStorage.getItem('userIdx') === null) {
    userIdx = null;
  } else {
    userIdx = +localStorage.getItem('userIdx')!;
  }

  let isProfileRegistered: number | null = useRecoilValue(profileRegisteredState);
  if (accessToken && userIdx) {
    if (localStorage.getItem('isProfileRegistered') === null) {
      isProfileRegistered = 0;
    } else {
      isProfileRegistered = 1;
    }
  }

  useEffect(() => {
    
    if (userIdx !== null && accessToken !== null && isProfileRegistered !== null) {
      const loginInfoRet: ILoginInfo = {
        userIdx: userIdx,
        isProfileRegistered: isProfileRegistered,
        isLoggedIn: true
      }
      console.log({loginInfoRet});
      setLoginInfo(loginInfoRet);
    }
    else {
      const loginInfoRet: ILoginInfo = {
        userIdx: null,
        isProfileRegistered: null,
        isLoggedIn: false
      };
      console.log({loginInfoRet});
      setLoginInfo(loginInfoRet);
    };
  }, [accessToken, userIdx, isProfileRegistered]);

  return loginInfo;
};

export default useLoginInfo;
