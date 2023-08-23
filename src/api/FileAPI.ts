import axios from "axios";

const FileAPI = {
  postFiles: async (mainimgIdx: number, formData: FormData) => {
    try {
      const path = `/upload?mainimgIdx=${mainimgIdx}`;
      const axiosInstance = axios.create({
        baseURL: process.env.REACT_APP_SERVER_BASE_HTTPS_URL,
        withCredentials: true,
      });
      const response = await axiosInstance.post(path, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  }
};

export default FileAPI;