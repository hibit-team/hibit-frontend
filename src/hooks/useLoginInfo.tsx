import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState, profileRegisteredState, userIdxState } from '../recoil/atom/LoginInfoState';
import LoginAPI from '../api/LoginAPI';
import { axiosInstance } from '../services/HttpClient';

export interface ILoginInfo {
  userIdx: number | null,
  isProfileRegistered: boolean,
  isLoggedIn: boolean
}

const useLoginInfo = (): boolean => {

  const accessToken: string | null = localStorage.getItem("accessToken");
  let userIdx: number | null = useRecoilValue(userIdxState);
  let isProfileRegistered: boolean | null = useRecoilValue(profileRegisteredState);
  const setUserIdx = useSetRecoilState(userIdxState);
  const setIsProfileRegistered = useSetRecoilState(profileRegisteredState);

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    if (accessToken) {
      LoginAPI.getUserInfo()
        .then((res) => {
          setUserIdx(res.idx);
          setIsProfileRegistered(res.isprofile);
          setIsLoggedIn(true);
        })
        .catch((e) => {
          console.error({e});
        });

    }
    else {
      setIsLoggedIn(false);
    };
  }, [accessToken, userIdx, isProfileRegistered]);

  return isLoggedIn;
};

export default useLoginInfo;
