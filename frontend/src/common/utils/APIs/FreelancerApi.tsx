// AxiosInterceptor.tsx
import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_API_URL } from '../config/constants';
import {  useSelector } from 'react-redux';
import { profileCompletionForm } from '../../components/ProfileCompletionParts/CompletionForm';

import { handleError } from './ErrorHandlers/ErrorHandle';

export const freelancersAPI = axios.create({
  baseURL: `${BASE_API_URL}/freelancers`,
});

// const dispatch = useDispatch();
// const navigate = useNavigate();

// response interceptor
freelancersAPI.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

interface LoginData {
  username: string;
  password: string;
}

interface SignupData {
  username: string;
  email?: string;
  password: string;
}

export interface VerificationData {
  email: string;
  code: number;
}

interface resetPasswordData{
  password: string;
  token: string;
}

const AxiosInterceptor: React.FC = () => {
  const user = useSelector((state: any) => state.freelancer);
  console.log(user.freelancer,"interapsent");
  
  useEffect(() => {
    const requestInterceptor = freelancersAPI.interceptors.request.use(
      (config) => {
        if (user) {
          config.headers['Authorization'] = user.freelancer.token ;
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
    // console.log("called intresepter");
    

    // Clean up the request interceptor when the component unmounts
    return () => {
      freelancersAPI.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return null; 
};


export const LoginApi = async ({ username, password }: LoginData) => {
  try {
    const response = await freelancersAPI.post('/login', { username, password });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Login failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred during login.');
    }
  }
};

export const signupApi = async (signupData: SignupData) => {
  try {
    const response = await freelancersAPI.post('/signup', signupData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Signup failed: ${error.message}`);
    }
  }
};

export const otpApi = async (verificationData: VerificationData) => {
  try {
    const response = await freelancersAPI.post('/verification', verificationData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`OTP verification failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred during OTP verification.');
    }
  }
};

export const otpApiForgotpassword = async (verificationData: VerificationData) => {
  try {
    const response = await freelancersAPI.post('/forgotpasswordotp', verificationData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`OTP verification failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred during OTP verification.');
    }
  }
};

export const passwordReset = async (data:resetPasswordData) => {
  try {
    const response = await freelancersAPI.post('/passwordreset', data);
    return response.data;
  } catch (error: unknown) {
    // if (axios.isAxiosError(error)) {
    //   throw new Error(`OTP verification failed: ${error.message}`);
    // } else {
    //   throw new Error('An unexpected error occurred during OTP verification.');
    // }
  }
};

export const profileCompletion = async (formData: profileCompletionForm) => {
  try {
    const response = await freelancersAPI.post('/profileCompletion', formData);
    console.log(response);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Profile completion failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred during profile completion.');
    }
  }
};
export const roleSpecify = async (id:string,role:string) => {
  try {
    const response = await freelancersAPI.post('/rolespecify', {id:id,role:role});
    console.log(response);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Profile completion failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred during profile completion.');
    }
  }
};
export const switchRoleAPI = async (role:string) => {
  try {
    const response = await freelancersAPI.post('/changerole', {role:role});
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Profile completion failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred during profile completion.');
    }
  }
};

export const profileUpdate = async (formData: profileCompletionForm) => {
  try {
    const response = await freelancersAPI.post('/profileUpdate', formData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Profile update failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred during profile update.');
    }
  }
};

export const reSendOTP = async (email: string) => {
  try {
    const response = await freelancersAPI.post('/resendOtp', { email });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Resending OTP failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred while resending OTP.');
    }
  }
};

export const googleAuth = async (key: string) => {
  try {
    const response = await freelancersAPI.post('/googleAuth', { key });
    console.log(response);

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Google authentication failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred during Google authentication.');
    }
  }
};

export const googleAuthLogin = async (key: string) => {
  try {
    const response = await freelancersAPI.post('/googleAuthLogin', { key });
    return response.data;
  } catch (error: any) {
    // if (axios.isAxiosError(error)) {
    //   throw new Error(`Google authentication login failed: ${error.message}`);
    // } else {
    //   throw new Error('An unexpected error occurred during Google authentication login.');
    // }
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const fetchProfileData = async () => {
  try {
    console.log("called api");

    const response = await freelancersAPI.get('/profileData');
    console.log(response,"user PRofie data");
    
    return response.data;
  } catch (error: unknown) {
    // if (axios.isAxiosError(error)) {
    //   throw new Error(`Fetching profile data failed: ${error.message}`);
    // } else {
    //   throw new Error('An unexpected error occurred while fetching profile data.');
    // }
    const errorMessage = handleError(error);
    throw errorMessage;

  }
};



export const uploadProfileImage = async (formData: FormData) => {
  try {
    const response = await freelancersAPI.post('/uploadProfileImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response, "api res");

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Uploading profile image failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred while uploading profile image.');
    }
  }
};


export const forgotPassword = async (email: string) => {
  try {
    const response = await freelancersAPI.post('/forgotpassword', { email });
    console.log(response);

    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};


export const getAllCategories = async ()=>{
  try {
      const response = await freelancersAPI.get('/allcategories');
      return response.data
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
}

export const getAllSubCategories = async ()=>{
  try {
      const response = await freelancersAPI.get('/allsubcategories');
      return response.data
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
}



export const workPostAPI = async (formData:any)=>{
  try {
      const response = await freelancersAPI.post('/worksubmit',formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response);
      
      return response.data
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
}

export const getUsrAllWork = async ()=>{
  try {
      const response = await freelancersAPI.get('/getuserwork');
      return response.data
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
}

export const getAllWorks = async ()=>{
  try {
      const response = await freelancersAPI.get('/getAllWorks');
      return response.data
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
}

export const getSingleWorkAPI = async (id:string)=>{
  try {
    console.log(id);
    
      const response = await freelancersAPI.get( `/singlework/${id}`);
      return response.data
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
}

export const deleteWork = async (id:any)=>{
  try {
      const response = await freelancersAPI.delete(`/deletework?id=${id}`);
      return response.data
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
}

export const getRecivedOrdersAPI = async ()=>{
  try {
      const response = await freelancersAPI.get('/recivedorders');
      console.log(response.data);
      
      return response.data
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
}

export default AxiosInterceptor;