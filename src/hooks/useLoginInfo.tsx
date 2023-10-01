import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState, profileRegisteredState, userIdxState } from '../recoil/atom/LoginInfoState';
import LoginAPI from '../api/LoginAPI';
import { axiosInstance } from '../services/HttpClient';

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

  const accessToken: string | null = localStorage.getItem('accessToken');

  let userIdx: number | null = useRecoilValue(userIdxState);
  let isProfileRegistered: number | null = useRecoilValue(profileRegisteredState);
  
  // if (localStorage.getItem('userIdx') === null) {
  //   userIdx = null;
  // } else {
  //   userIdx = +localStorage.getItem('userIdx')!;
  // }

  // if (accessToken && userIdx) {
  //   if (localStorage.getItem('isProfileRegistered') === null) {
  //     isProfileRegistered = 0;
  //   } else {
  //     isProfileRegistered = 1;
  //   }
  // }

  useEffect(() => {
    
    if (accessToken !== null) {
      // 요청 보냄.
      console.log(axiosInstance.defaults.headers.common['Authorization']);
      LoginAPI.getUserInfo()
        .then((res) => {
          console.log({res});
          const loginInfoRet: ILoginInfo = {
            userIdx: res.userIdx,
            isProfileRegistered: res.isProfileRegistered,
            isLoggedIn: true
          }
          // console.log({loginInfoRet});
          setLoginInfo(loginInfoRet);
          return;
        })
        .catch((e) => {
          const loginInfoRet: ILoginInfo = {
            userIdx: null,
            isProfileRegistered: null,
            isLoggedIn: true
          }
          setLoginInfo(loginInfoRet);
          console.error({e});
        });

    }
    else {
      const loginInfoRet: ILoginInfo = {
        userIdx: null,
        isProfileRegistered: null,
        isLoggedIn: false
      };
      // console.log({loginInfoRet});
      setLoginInfo(loginInfoRet);
    };
  }, [accessToken]);

  return loginInfo;
};

export default useLoginInfo;
