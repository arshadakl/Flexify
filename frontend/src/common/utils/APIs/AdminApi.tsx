import axios from 'axios';
import { BASE_API_URL } from '../config/constants';
import { Admin, CategoryInter } from '../../../interfaces/Admin';

const adminAPI = axios.create({
    baseURL: `${BASE_API_URL}/admin`
});

export const doLogin =async (FormData:Admin)=>{
    try {
        const response = await adminAPI.post('/login',FormData)
        // console.log(response);
        return response.data       
    } catch (error) {
        
    }
}

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

export const AddCategoryAPI = async(data:CategoryInter)=>{
    try {
        const response = await adminAPI.post('/addcategory',data)
        // console.log(response);
        return response.data
        
    } catch (error) {
        console.log(error);
        
    }
}


export const getAllCategories = async ()=>{
    try {
        const response = await adminAPI.get('/allcategories');
        console.log(response);
        return response.data
    } catch (error) {
        
    }
}

export const deleteCategoryAPI = async (id:string)=>{
    try {
        const response = await adminAPI.delete(`/deleteCategory?id=${id}`);
        console.log(response);
        return response.data
    } catch (error) {
        
    }
}
