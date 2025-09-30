import api from "./axios";

export const fetchComments = (postId: string) =>
  api.get(`/posts/${postId}/comments`).then(res => res.data);

export const createComment = (postId: string, content: string) =>
  api.post(`/posts/${postId}/comments`, { content });