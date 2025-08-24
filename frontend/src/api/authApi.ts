import api from "./axiosConfig";

async function createUser(userData: { username:string, email:string, password:string }) {
    const res = await api.post('/users/register', userData);
    return res.data;
}

export { createUser }