import { useEffect, useState } from 'react';
import ValidTokenAPI from '../api/ValidTokenAPI';
import { useRecoilValue } from 'recoil';
import { userIdxState } from '../recoil/atom/UserIdx';
import { accessTokenState } from '../recoil/atom/AccessToken';
import axios from 'axios';

const useIsLogin = () => {
  const userIdx = useRecoilValue(userIdxState);
  const [isLogin, setIsLogin] = useState(false);
  const ack = useRecoilValue(accessTokenState);

  useEffect(() => { // 결국 문제 여기서 발생함
    // validtokenAPI 사용 시, accessToken값이 없음에도 then 내부로 진입하는 문제
    // 즉 유효하지 않은 accessToken값인데 로그인 처리가 됨.
    // 이는 로그아웃 시 accessToken값을 관리했음에도 UI 상 로그인 처리되는 이슈로 연결됨
    console.log(1);
    if (userIdx) {
      ValidTokenAPI.getIsValidToken(userIdx)
        .then((res) => {
          console.log("로그인 훅에서의 응답", {res});
          console.log("유효한 토큰임!")
          // setIsLogin(true);
        })
        .catch((e) => {
          console.log("유효하지 않은 토큰임!")
          // setIsLogin(false);
        });
    } else {
      console.log("userIdx가 없습니다.");
    }
  }, [ack, userIdx]);

  return isLogin;
};

export default useIsLogin;
