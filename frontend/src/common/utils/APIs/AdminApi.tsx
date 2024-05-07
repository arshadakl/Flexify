import axios from 'axios';
import { BASE_API_URL } from '../config/constants';
import { Admin, CategoryInter, SubategoryInter } from '../../../interfaces/Admin';
import store from '../../../Redux/store';
import { handleError } from './ErrorHandlers/adminError';

const adminAPI = axios.create({
    baseURL: `${BASE_API_URL}/admin`
});



adminAPI.interceptors.request.use(
  (config) => {
    // Get the token from your Redux store
    const state = store.getState();
    const admin = state.admin;
    const token = admin?.admin;

    if (token) {
      config.headers['Authorization'] = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const doLogin =async (FormData:Admin)=>{
    try {
        const response = await adminAPI.post('/login',FormData)
        // console.log(response);
        return response.data       
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const getAllusers = async()=>{
    try {
        console.log("called");
        
        const response = await adminAPI.get('/getallusers')
        return response.data
        
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const blockUser = async (id:string)=>{
    try {
        const response = await adminAPI.patch('/blockuser',{id});
        return response.data
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const AddCategoryAPI = async(data:CategoryInter)=>{
    try {
        const response = await adminAPI.post('/addcategory',data)
        // console.log(response);
        return response.data
        
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}




export const getAllCategories = async ()=>{
    try {
        const response = await adminAPI.get("/allcategories");
        return response.data
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}


export const getAllCategoriesPage = async (page:number)=>{
    try {
        const response = await adminAPI.get(`/allcategoriespagenation?page=${page}`);
        return response.data
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const deleteCategoryAPI = async (id:string)=>{
    try {
        const response = await adminAPI.delete(`/deleteCategory?id=${id}`);
        console.log(response);
        return response.data
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
        
    }
}

export const EditCategoryAPI = async(data:CategoryInter)=>{
    try {
        const response = await adminAPI.post('/editcategory',data)
        // console.log(response);
        return response.data
        
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
        
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
        const errorMessage = handleError(error);
        throw errorMessage;
        
    }
}


export const getAllSubCategories = async ()=>{
    try {
        const response = await adminAPI.get('/allsubcategories');
        console.log(response);
        return response.data
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const deleteSubCategoryAPI = async (id:string)=>{
    try {
        const response = await adminAPI.delete(`/deletesubCategory?id=${id}`);
        console.log(response);
        return response.data
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const EditSubcategoryAPI = async(data:SubategoryInter)=>{
    try {
        const response = await adminAPI.post('/editsubcategory',data)
        return response.data
        
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const getAllWorkAPI = async()=>{
    try {
        const response = await adminAPI.get('/allworks')
        return response.data        
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const suspendWorkAPI = async(id:string)=>{
    try {
        const response = await adminAPI.patch('/suspendworks',{id})
        return response.data        
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const getAllOrdersAPI = async()=>{
    try {
        const response = await adminAPI.get('/getallorders')
        return response.data        
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const getalltransactionAPI = async()=>{
    try {
        const response = await adminAPI.get('/getalltransaction')
        return response.data        
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const getallSubmissionsAPI = async()=>{
    try {
        const response = await adminAPI.get('/getallSubmissions')
        return response.data        
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const GetRepotedPostAPi = async()=>{
    try {
        const response = await adminAPI.get('/repotedpost')
        return response.data        
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}

export const getDashChart = async()=>{
    try {
        const response = await adminAPI.get('/dashboardchartdata')
        return response.data        
    } catch (error) {
        const errorMessage = handleError(error);
        throw errorMessage;
    }
}