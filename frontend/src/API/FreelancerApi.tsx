import axios from 'axios';
import { BASE_API_URL } from '../config/constants';
import { profileCompletionForm } from '../components/ProfileCompletionParts/CompletionForm';

const freelancersAPI = axios.create({
    baseURL: `${BASE_API_URL}/freelancers`
});

freelancersAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error during API request:', error);
        return Promise.reject(error);
    }
);

interface SignupData {
    username: string;
    email: string;
    password: string;
}

interface VerificationData {
    email: string;
    code: number;
}

export const SignupApi = async (signupData: SignupData) => {
    try {
        const response = await freelancersAPI.post('/signup', signupData);
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error during signup:', error);
        // throw new Error('Signup failed. Please try again.'); // Handle error more gracefully
    }
};

export const OTPApi = async (verificationData: VerificationData) => {
    try {
        const response = await freelancersAPI.post('/verification', verificationData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error during OTP verification:', error);
        throw new Error('OTP verification failed. Please try again.'); // Handle error more gracefully
    }
};


export const profileCompletion = async (formData:profileCompletionForm)=>{
    try {
        const response = await freelancersAPI.post('/profileCompletion',formData)
        console.log(response);
        return response.data
        
    } catch (error) {
        
    }
}