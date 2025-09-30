import api from './axios';

export const createPost = (data : { title : string; content : string}) =>{
    api.post('/posts', data, {withCredentials : true})
}

export const updatePost = async (id: string, data: { title: string; content: string }) => {
  const res = await api.patch(`/posts/update/${id}`, data);
  return res.data;
};

export const deletePost = async (id: string) => {
  const res = await api.delete(`/posts/delete/${id}`);
  return res.data;
};
