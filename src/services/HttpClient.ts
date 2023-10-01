import axios, { AxiosError } from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { accessTokenState, profileRegisteredState, userIdxState } from "../recoil/atom/LoginInfoState";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_BASE_HTTPS_URL,
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   /* 올바른 response callback*/
//   (response) => {
//     console.log("response in Interceptor", {response});
//     return response;
//   }, 

//   /* 에러 발생 response callback */
//   async (error: AxiosError) => {
//     if (error.response) {
//       // if (error.response.status === 401) { 
//         await axios.post(`${process.env.REACT_APP_SERVER_BASE_HTTPS_URL}/api/auth/token/access`)
//           .then((response) => {
//             const accessToken = response.data.acceesToken;
//             const isProfileRegistered = response.data.isProfileRegistered;
//             const userIdx = response.data.id;

//             const setIsProfileRegistered = useSetRecoilState(profileRegisteredState);
//             const setUserIdx = useSetRecoilState(userIdxState);
//             const setAccessToken = useSetRecoilState(accessTokenState);

//             axiosInstance.defaults.headers.common['Authorization'] = `${accessToken}`;
//             setIsProfileRegistered(isProfileRegistered);
//             setUserIdx(userIdx);
//             setAccessToken(accessToken);

            
//             localStorage.setItem('accessToken', accessToken);
//             localStorage.setItem('userIdx', userIdx);
//             localStorage.setItem('isProfileRegistered', isProfileRegistered);
//           })
//           .catch((e) => {
//             console.error({e});
//             return;
//           });
//       // }
//     }
//     return Promise.reject(error);
//   }
// );

const HttpClient = {
  get: async (path: string, params = {}, headers = {}) => {
    const response = await axiosInstance.get(path, { params, headers });
    return response.data;
  },

  post: async (path: string, body?: unknown, headers = {
    "Content-Type": "application/json"
  }) => {
    const response = await axiosInstance.post(path, JSON.stringify(body), { headers });
    return response.data;
  },

  put: async (path: string, body?: unknown, headers = {
    "Content-Type": "application/json"
  }) => {
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