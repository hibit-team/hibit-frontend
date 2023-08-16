import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";
import { useRecoilValue } from "recoil";
import { accessTokenState, isLoggedInState } from "../recoil/atom/AccessToken";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("정상적인 요청임");

    return Promise.resolve().then();
  }, // 요청이 제대로 전달되는 경우(2xx 상태코드) : 정상 요청

  async (error: AxiosError) => { // 요청 오류가 있는 경우 : 여러 경우에 대한 예외 처리
    if (error.response && error.response.status === 401) { // 잘못된 ack : (1)새로고침해서 ack==null 이거나, (2)ack이 만료된 경우
      console.log("코드 401임")

      const [cookies] = useCookies(['refreshToken']); // 서버에서 set-cookie 옵션 설정된 경우, 이 부분 코드 변경 가능성 있음.

      if (!cookies.refreshToken) { // refreshToken 없는 경우 -> 재로그인 해야 함
        console.error('No refreshToken. Please login again.');
        return Promise.reject(error);
      }

      const body = {
        refreshToken: cookies.refreshToken
      };

      try {

        // 로그아웃 요청 시, interceptor의 refreshToken을 이용한 accessToken값 얻는 로직 무효화
        const isLoggedInAtom = useRecoilValue(isLoggedInState);
        if (!isLoggedInAtom) { // false인 경우(로그아웃 요청한 경우) 요청 무효화
          console.log("로그아웃 요청된 상태");
          return Promise.reject(error);
        }



        const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/token/access`, body); // refreshToken으로 ack 재발급 요청
        if (response.status >= 200 || response.status < 300) { // 정상 응답 (2xx)
          const { acceesToken } = response.data;
          console.log({acceesToken});
          console.log("토큰 재요청")
          axios.defaults.headers.common['Authorization'] = `${acceesToken}`; 
          error.config!.headers['Authorization'] = `${acceesToken}`;
          return axiosInstance(error.config!);
        } else { // 비정상 응답
          console.error('Failed to refresh token: ', response.status);
          return Promise.reject(error);
        }

      } catch (error) {
        console.error('Error occured while refreshing token', error);
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

const HttpClient = {
  get: async (path: string, params = {}, headers = {}) => {
    const response = await axiosInstance.get(path, { params, headers });
    return response.data;
  },

  post: async (path: string, body: unknown, headers = {}) => {
    const response = await axiosInstance.post(path, body, { headers });
    return response.data;
  },

  put: async (path: string, body: unknown, headers = {}) => {
    const response = await axiosInstance.put(path, body, { headers });
    return response.data;
  },

  patch: async (path: string, body: unknown, headers = {}) => {
    const response = await axiosInstance.patch(path, body, { headers });
    return response.data;
  },

  delete: async (path: string, headers = {}) => {
    const response = await axiosInstance.delete(path, { headers });
    return response.data;
  },
};

export default HttpClient;