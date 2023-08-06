import axios, { AxiosError } from "axios";
import { useCookies } from "react-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      const [cookies] = useCookies(['refreshToken']);

      if (!cookies.refreshToken) {
        console.error('No refreshToken. Please login again.');
        return Promise.reject(error);
      }

      const body = {
        refreshToken: cookies.refreshToken
      };

      try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/api/auth/token/access`, body);
        if (response.status === 200) {
          const { acceesToken } = response.data;
          console.log({acceesToken});
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${acceesToken}`; 
          error.config!.headers['Authorization'] = `Bearer ${acceesToken}`;
          return axiosInstance(error.config!);
        } else {
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