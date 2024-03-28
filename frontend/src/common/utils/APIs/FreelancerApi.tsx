import axios from 'axios';
import { BASE_API_URL } from '../config/constants';
import { profileCompletionForm } from '../../components/ProfileCompletionParts/CompletionForm';

const freelancersAPI = axios.create({
  baseURL: `${BASE_API_URL}/freelancers`,
});

// request interceptor
freelancersAPI.interceptors.request.use(
  (config) => {
    const storedDataString = localStorage.getItem('user_data');
    const user = storedDataString ? JSON.parse(storedDataString) : null;

    if (user) {
      config.headers['Authorization'] = user.token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

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

interface VerificationData {
  email: string;
  code: number;
}

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

export const profileCompletion = async (formData: profileCompletionForm) => {
  try {
    const response = await freelancersAPI.post('/profileCompletion', formData);
    console.log(response);
    
    return response.data;
  } catch (error: unknown) {
    // if (axios.isAxiosError(error)) {
    //   throw new Error(`Profile completion failed: ${error.message}`);
    // } else {
    //   throw new Error('An unexpected error occurred during profile completion.');
    // }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Google authentication login failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred during Google authentication login.');
    }
  }
};

export const fetchProfileData = async () => {
  try {
    const response = await freelancersAPI.get('/profileData');
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Fetching profile data failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred while fetching profile data.');
    }
  }
};

export const uploadProfileImage = async (formData: FormData) => {
  try {
    const response = await freelancersAPI.post('/uploadProfileImage', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response,"api res");
    
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Uploading profile image failed: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred while uploading profile image.');
    }
  }
};