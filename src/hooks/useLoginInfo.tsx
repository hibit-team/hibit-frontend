import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState, profileRegisteredState, userIdxState } from '../recoil/atom/LoginInfoState';

export interface ILoginInfo {
  userIdx: number | null,
  isProfileRegistered: number | null,
  isLoggedIn: boolean
}

const useLoginInfo = (): ILoginInfo | undefined => {
  const [loginInfo, setLoginInfo] = useState<ILoginInfo | undefined>();

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
      console.log({loginInfo});
      setLoginInfo(loginInfo);
    }
    else {
      const loginInfo = {
        userIdx: null,
        isProfileRegistered: null,
        isLoggedIn: false
      };
      console.log({loginInfo});
      setLoginInfo(loginInfo);
    };
  }, [accessToken, userIdx]);

  return loginInfo;
};

export default useLoginInfo;
