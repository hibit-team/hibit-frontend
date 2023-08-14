import { useEffect, useState } from 'react';
import ValidTokenAPI from '../api/ValidTokenAPI';
import { useRecoilValue } from 'recoil';
import { userIdxState } from '../recoil/atom/UserIdx';

const useIsLogin = () => {
  const userIdx = useRecoilValue(userIdxState);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    ValidTokenAPI.getIsValidToken(userIdx)
      .then((res) => {
        console.log("유효한 토큰임!")
        setIsLogin(true);
      })
      .catch((e) => {
        console.log("유효하지 않은 토큰임!")
        setIsLogin(false);
      });
  }, [userIdx]);

  return isLogin;
};

export default useIsLogin;
