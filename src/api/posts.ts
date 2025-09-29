import api from './axios';

export const createPost = (data : { title : string; content : string}) =>{
    api.post('/posts', data, {withCredentials : true})
}
