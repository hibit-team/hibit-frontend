import HttpClient from "../services/HttpClient";

const ExhibitionAPI = {
  getExhibitions: async () => {
    try {
      const path = `exhibition/list`;
      const response = HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  } ,
};

export default ExhibitionAPI;