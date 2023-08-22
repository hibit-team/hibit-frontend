import HttpClient from "../services/HttpClient";

const MyprofileAPI = {
  getAllPersonalities: async () => {
    try {
      const path =`/api/profiles/personalities`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  getMyProfile: async (loginMember: number) => {
    try {
      const path = `/api/profiles/me?id=${loginMember}`;
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
  },

  postMyProfile: async (body: unknown) => {
    try {
      const path = `/api/profiles`;
      const response = await HttpClient.post(path, body);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  }
};

export default MyprofileAPI;