import axios from 'axios';
import { BASE_API_URL } from '../config/constants';
import { Admin, CategoryInter, SubategoryInter } from '../../../interfaces/Admin';

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

export const EditCategoryAPI = async(data:CategoryInter)=>{
    try {
        const response = await adminAPI.post('/editcategory',data)
        // console.log(response);
        return response.data
        
    } catch (error) {
        console.log(error);
        
    }
}

//subcategory
export const AddSubcategoryAPI = async(data:SubategoryInter)=>{
    try {
        console.log(data, "inspection");
        
        const response = await adminAPI.post('/addsubcategory',data)
        // console.log(response);
        return response.data
        
    } catch (error) {
        console.log(error);
        
    }
}


export const getAllSubCategories = async ()=>{
    try {
        const response = await adminAPI.get('/allsubcategories');
        console.log(response);
        return response.data
    } catch (error) {
        
    }
}

export const deleteSubCategoryAPI = async (id:string)=>{
    try {
        const response = await adminAPI.delete(`/deletesubCategory?id=${id}`);
        console.log(response);
        return response.data
    } catch (error) {
        
    }
}

export const EditSubcategoryAPI = async(data:SubategoryInter)=>{
    try {
        console.log(data, "inspection");
        
        const response = await adminAPI.post('/editsubcategory',data)
        // console.log(response);
        return response.data
        
    } catch (error) {
        console.log(error);
        
    }
}