import HttpClient from "../services/HttpClient";

const LoginAPI = {
  getUserInfo: async () => {
    try {
      // const path = "/login/status-management";
      const path = "/api/profiles/me";
      const response = HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  }
}

export default LoginAPI;