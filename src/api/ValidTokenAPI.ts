import HttpClient from "../services/HttpClient";

const ValidTokenAPI = {
  getIsValidToken: async (userIdx: number) => {
    try {
      const path = `/api/auth/validate/token?id=${userIdx}`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) { 
      console.log("토큰 없거나 만료됨")
      console.error({e});
      return null;
    }
  }
}

export default ValidTokenAPI;