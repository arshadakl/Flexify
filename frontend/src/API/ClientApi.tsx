import axios from 'axios';
import { BASE_API_URL } from '../config/constants';
import { profileCompletionFormClient } from '../components/ProfileCompletionParts/CompletionForm';


const clientAPI = axios.create({
    baseURL: `${BASE_API_URL}/client`
});


export const profileCompletionClient = async (formData:profileCompletionFormClient)=>{
    try {
        console.log(formData);
        
        const response = await clientAPI.post('/profileCompletion',formData)
        // console.log(response);
        return response.data
        
    } catch (error) {
        
    }
}
