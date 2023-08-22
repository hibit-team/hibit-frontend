import axios, { AxiosError } from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenState, profileRegisteredState, userIdxState } from "../recoil/atom/LoginInfoState";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_HTTPS_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  /* 올바른 response callback*/
  (response) => {
    console.log("response in Interceptor", {response});
    return response;
  }, 

  /* 에러 발생 response callback */
  async (error: AxiosError) => {
    if (error.response) {
      if (error.response.status === 401) { 
        // 만료된 accessToken으로 요청한 경우
        const atk = useRecoilValue(accessTokenState);
        console.error({atk});
        console.error("401 error. Accesstoken is not valid.");

        try {
          const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_HTTPS_URL}/api/auth/token/access`);  
            // refreshToken으로 ack 재발급 요청
          if (200 <= response.status && response.status < 300) {
            // 응답코드 2xx: accessToken 재발급 성공
            const acceesToken = response.data.acceesToken;
            const isProfileRegistered = response.data.isProfileRegistered;
            const userIdx = response.data.id;
            console.log("accessToken 재발급: ", {acceesToken, isProfileRegistered, userIdx});

            const setIsProfileRegistered = useSetRecoilState(profileRegisteredState);
            const setUserIdx = useSetRecoilState(userIdxState);
            const setAccessToken = useSetRecoilState(accessTokenState);

            axiosInstance.defaults.headers.common['Authorization'] = `${acceesToken}`;
            setIsProfileRegistered(isProfileRegistered);
            setUserIdx(userIdx);
            setAccessToken(acceesToken);
            
            return;
          } else {
            // 재발급 실패
            console.log("재발급 실패")

            console.error({response});
            alert("accessToken 재발급 실패. 재로그인 필요.");
            window.location.href = "/";
            return;
          }
        } catch (e) {
          // 재발급 실패
          console.log("재발급 실패")
          console.error({e});
          alert("accessToken 재발급 실패. 재로그인 필요.");
          window.location.href = "/";
          return;
        }
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

  post: async (path: string, body?: unknown, headers = {}) => {
    const response = await axiosInstance.post(path, JSON.stringify(body), { headers });
    return response.data;
  },

  put: async (path: string, body?: unknown, headers = {}) => {
    const response = await axiosInstance.put(path, body, { headers });
    return response.data;
  },

  patch: async (path: string, body?: unknown, headers = {}) => {
    const response = await axiosInstance.patch(path, body, { headers });
    return response.data;
  },

  delete: async (path: string, headers = {}) => {
    const response = await axiosInstance.delete(path, { headers });
    return response.data;
  },
};

export default HttpClient;