import api from "./axios"


export const validateToken = async (token : string) => {

    const { data } = await api.post('/auth/validate-token', {token});
    return data;
}

export const setPassword = async (token : string, password : string) =>{
    
    const { data } = await api.post('/auth/set-password', {token, password});
    return data;
}