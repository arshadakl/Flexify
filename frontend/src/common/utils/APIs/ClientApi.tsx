import axios from 'axios';
import { BASE_API_URL } from '../config/constants';
import { profileCompletionFormClient } from '../../components/ProfileCompletionParts/CompletionForm';
import store from '../../../Redux/store';

const clientAPI = axios.create({
    baseURL: `${BASE_API_URL}/client`
});


clientAPI.interceptors.request.use(
    (config) => {
      // Get the token from your Redux store
      const state = store.getState();
      const freelancer = state.freelancer.freelancer;
      const token = freelancer?.token;
  
      if (token) {
        config.headers['Authorization'] = `${token}`;
      }
  
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export const profileCompletionClient = async (formData:profileCompletionFormClient)=>{
    try {
        console.log(formData);
        
        const response = await clientAPI.post('/profileCompletion',formData)
        // console.log(response);
        return response.data
        
    } catch (error) {
        
    }
}


export const checkoutAPI = async (id:string)=>{
    try {
        console.log("api called");
        
        const response = await clientAPI.post('/create-checkout-sessions',{id:id});
        // console.log(response);
        
        return response.data
        
    } catch (error) {
        
    }
}

export const getAllOrdersAPI = async ()=>{
    try {
        const response = await clientAPI.get('/clientorders');
        return response.data
    } catch (error) {
        
    }
}


