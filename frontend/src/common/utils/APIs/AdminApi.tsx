import axios from 'axios';
import { BASE_API_URL } from '../config/constants';

const adminAPI = axios.create({
    baseURL: `${BASE_API_URL}/admin`
});

export const doLogin = (FormData)

export const getAllusers = async()=>{
    try {
        console.log("called");
        
        const response = await adminAPI.get('/getallusers')
        return response.data
        
    } catch (error) {
        return error
    }
}

export const blockUser = async (id:string)=>{
    try {
        const response = await adminAPI.patch('/blockuser',{id});
        return response.data
    } catch (error) {
        console.log(error);
        
    }
}

