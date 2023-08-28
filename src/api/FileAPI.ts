import axios, { AxiosError } from "axios";

const FileAPI = {
  postFiles: async (mainimgIdx: number, formData: FormData) => {
    try {
      const path = `/upload/${mainimgIdx}`;
      const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_BASE_URL,
        withCredentials: true,
      });
      const response = await axiosInstance.post(path, formData, {
        headers: {
          "Accept": "application/json",
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    } catch (e) {
      console.error((e as AxiosError));
      console.error({e});
      return null;
    }
  }
};

export default FileAPI;