import HttpClient, { axiosInstance } from "../services/HttpClient";

const ValidTokenAPI = {
  getIsValidToken: async (userIdx: number) => {
    try {
      console.log(axiosInstance.defaults.headers.common)
      const path = `/api/auth/validate/token?id=${userIdx}`;
      const response = await HttpClient.get(path);
      console.log("valid token try문", {response})
      return response;
    } catch (e) { 
      console.log("토큰 없거나 만료됨")
      console.error({e});
      return null;
    }
  }
}

export default ValidTokenAPI;