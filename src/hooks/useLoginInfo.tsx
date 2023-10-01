import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState, profileRegisteredState, userIdxState } from '../recoil/atom/LoginInfoState';
import LoginAPI from '../api/LoginAPI';
import { axiosInstance } from '../services/HttpClient';

export interface ILoginInfo {
  userIdx: number | null,
  isProfileRegistered: boolean | null,
  isLoggedIn: boolean
}

const useLoginInfo = (): ILoginInfo => {
  const [loginInfo, setLoginInfo] = useState<ILoginInfo>({
    userIdx: null,
    isProfileRegistered: null,
    isLoggedIn: false
  });

  const accessToken: string | null = useRecoilValue(accessTokenState);
  let userIdx: number | null = useRecoilValue(userIdxState);
  let isProfileRegistered: boolean | null = useRecoilValue(profileRegisteredState);
  const setUserIdx = useSetRecoilState(userIdxState);
  const setIsProfileRegistered = useSetRecoilState(profileRegisteredState);


  useEffect(() => {
    if (axiosInstance.defaults.headers.common['Authorization']) {
      LoginAPI.getUserInfo()
        .then((res) => {

          const loginInfoRet: ILoginInfo = {
            userIdx: res.idx,
            isProfileRegistered: res.isprofile,
            isLoggedIn: true
          }
          setUserIdx(res.idx);
          setIsProfileRegistered(res.isprofile);
          console.log({loginInfoRet});

          setLoginInfo(loginInfoRet);
          return;
        })
        .catch((e) => {
          console.error({e});
        });

    }
    else {
      const loginInfoRet: ILoginInfo = {
        userIdx: userIdx,
        isProfileRegistered: isProfileRegistered,
        isLoggedIn: false
      };
      setLoginInfo(loginInfoRet);
    };
  }, [accessToken, userIdx, isProfileRegistered]);

  return loginInfo;
};

export default useLoginInfo;
