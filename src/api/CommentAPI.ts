import HttpClient from "../services/HttpClient";

const CommentAPI = {
  getCommentList: async (post_id: number) => {
    try {
      const path = `comment/list/${post_id}`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  getCommentLike: async (comment_id: number) => {
    try {
      const path = `comment/like/${comment_id}`;
      const response = await HttpClient.get(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  postComment: async (post_id: number, user_id: number, body: any) => {
    try {
      const path = `comment/${post_id}/${user_id}`;
      const response = await HttpClient.post(path, body);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  postReplies: async (comment_id: number, user_id: number, body: any) => {
    try {
      const path = `comment/${comment_id}/${user_id}`;
      const response = await HttpClient.post(path, body);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  putComment: async (commnet_id: number, body: any) => {
    try {
      const path = `comment/update/${commnet_id}`;
      const response = HttpClient.put(path, body);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

  deleteComment: async (comment_id: number) => {
    try {
      const path = `comment/delete/${comment_id}`;
      const response = HttpClient.delete(path);
      return response;
    } catch (e) {
      console.error({e});
      return null;
    }
  },

};

export default CommentAPI;