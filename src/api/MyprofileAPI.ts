import HttpClient from "../services/HttpClient";

const MyprofileAPI = {
  getMyProfile: async (profileId: number, loginMember: number) => {
    try {
      const path = `/api/profiles/me/${profileId}?id=${loginMember}`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  putMyProfile: async (profileId: number, body: unknown) => {
    try {
      const path = `/api/profiles/me/${profileId}`;
      const response = await HttpClient.put(path, body);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  }
};

export default MyprofileAPI;