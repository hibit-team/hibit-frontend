import HttpClient from "../services/HttpClient";

const PostingAPI = {
  getPostings: async (post_id: number) => {
    try {
      const path = `/post/${post_id}`;
      const response = await HttpClient.get(path);

      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        console.error('Failed to fetch data: ', response.status);
      }
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  putPosting: async (post_id: number, body: any) => {
    try {
      const path = `/post/${post_id}`;
      const response = await HttpClient.put(path, body);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        console.error('Failed to fetch data: ', response.status);
      }
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  deletePosting: async (post_id: number) => {
    try {
      const path = `/post/${post_id}`;
      const response = await HttpClient.delete(path);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        console.error('Failed to fetch data: ', response.status);
      }
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  postPosting: async (member_idx: number ,body: any) => {
    try {
      const path = `/post/write/${member_idx}`;
      const response = await HttpClient.post(path, body);
      if (response.status === 200) {
        const data = response.data;
        return data;
      } else {
        console.error('Failed to fetch data: ', response.status);
      }
    } catch (e) {
      console.error({e});
      return null;
    }
  },
};

export default PostingAPI;