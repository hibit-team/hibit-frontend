import HttpClient from "../services/HttpClient";

const FileAPI = {
  postPostingFiles: async (post_id: number, data: FormData) => {
    try {
      const path = `/${post_id}/upload`;
      const response = HttpClient.post(path, data);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  }
};

export default FileAPI;