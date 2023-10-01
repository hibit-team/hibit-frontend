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

  const accessToken: string | null = localStorage.getItem('accessToken');

  let userIdx: number | null = useRecoilValue(userIdxState);

  let isProfileRegistered: boolean | null = useRecoilValue(profileRegisteredState);

  const setUserIdx = useSetRecoilState(userIdxState);
  const setIsProfileRegistered = useSetRecoilState(profileRegisteredState);


  useEffect(() => {
    
    if (accessToken !== null) {
      // 요청 보냄.
      console.log(axiosInstance.defaults.headers.common['Authorization']);
      LoginAPI.getUserInfo()
        .then((res) => {
          console.log({res});
          let isProf: boolean = false;
          if(res.isprofile) {
            isProf = res.isprofile;
          }
          const loginInfoRet: ILoginInfo = {
            userIdx: res.idx,
            isProfileRegistered: isProf,
            isLoggedIn: true
          }
          setUserIdx(res.idx);
          setIsProfileRegistered(isProf);
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
      // console.log({loginInfoRet});
      setLoginInfo(loginInfoRet);
    };
  }, [accessToken]);

  return loginInfo;
};

export default useLoginInfo;
