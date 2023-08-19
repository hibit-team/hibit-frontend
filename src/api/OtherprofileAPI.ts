import HttpClient from "../services/HttpClient";

const OtherprofileAPI = {
  getOtherProfile: async (profileId: number) => {
    try {
      const path = `/api/profiles/other/${profileId}`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  }
};

export default OtherprofileAPI;