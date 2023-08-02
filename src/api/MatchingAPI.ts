import HttpClient from "../services/HttpClient";

const MatchingAPI = {
  getMatchingList: async (post_id: number) => {
    try {
      const path = `/matching/${post_id}/list`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  getMatchingOKList: async (post_id: number) => {
    try {
      const path = `/matching/${post_id}/oklist`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  putMatchingSend: async (post_id: number, body: any) => {
    try {
      const path = `/matching/${post_id}/send`;
      const response = await HttpClient.put(path, body);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  putMatchingOK: async (post_id: number, body: any) => {
    try {
      const path = `/matching/${post_id}/ok`;
      const response = await HttpClient.put(path, body);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  putMatchingNO: async (post_id:number, body: any) => {
    try {
      const path = `/matching/${post_id}/no`;
      const response = await HttpClient.put(path, body);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

};

export default MatchingAPI;