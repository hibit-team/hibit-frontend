import HttpClient from "../services/HttpClient";

const OtherprofileAPI = {
  getOtherProfile: async (otherMemberId: number) => {
    try {
      const path = `/api/profiles/other/${otherMemberId}`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  }
};

export default OtherprofileAPI;