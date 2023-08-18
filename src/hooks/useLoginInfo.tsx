import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState, profileRegisteredState, userIdxState } from '../recoil/atom/LoginInfoState';

export interface ILoginInfo {
  userIdx: number | null,
  isProfileRegistered: boolean | null,
  isLoggedIn: boolean
}

const useLoginInfo = () => {
  const [loginInfo, setLoginInfo] = useState<ILoginInfo>();

  const userIdx = useRecoilValue(userIdxState);
  const accessToken = useRecoilValue(accessTokenState);
  const isProfileRegistered = useRecoilValue(profileRegisteredState);

  useEffect(() => {
    if (userIdx && accessToken && isProfileRegistered) {
      const loginInfo = {
        userIdx: userIdx,
        isProfileRegistered: isProfileRegistered,
        isLoggedIn: true
      }
      setLoginInfo(loginInfo);
    }
    else {
      const loginInfo = {
        userIdx: null,
        isProfileRegistered: null,
        isLoggedIn: false
      };
      setLoginInfo(loginInfo);
    };
  }, [accessToken, userIdx]);

  return loginInfo;
};

export default useLoginInfo;
