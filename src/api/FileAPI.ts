import HttpClient from "../services/HttpClient";

const FileAPI = {
  postFiles: async (mainimgIdx: number, formData: FormData) => {
    try {
      const path = `/upload?mainimgIdx=${mainimgIdx}`;
      const response = HttpClient.post(path, formData);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  }
};

export default FileAPI;