import HttpClient from "../services/HttpClient";

const PostingAPI = {
  getPostings: async (post_id: number) => {
    try {
      const path = `post/${post_id}`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  putPosting: async (post_id: number, body: any) => {
    try {
      const path = `post/${post_id}`;
      const response = await HttpClient.put(path, body);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  deletePosting: async (post_id: number) => {
    try {
      const path = `post/${post_id}`;
      const response = await HttpClient.delete(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  postPosting: async (body: any) => {
    try {
      const path = `post/write`;
      const response = await HttpClient.post(path, body);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },
};

export default PostingAPI;