import axios from "axios";
import { BASE_API_URL } from "../config/constants";
import { profileCompletionForm } from "../components/ProfileCompletionParts/CompletionForm";

const freelancersAPI = axios.create({
  baseURL: `${BASE_API_URL}/freelancers`,
});


// request interceptor
freelancersAPI.interceptors.request.use(
  (config) => {
    const storedDataString = localStorage.getItem("user_data");
   
      let user = storedDataString ? JSON.parse(storedDataString) : null

    if (user) {
      config.headers["Authorization"] = user.token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor
freelancersAPI.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
  });

freelancersAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Error during API request:", error);
    return Promise.reject(error);
  }
);

interface SignupData {
  username: string;
  email?: string;
  password: string;
}

interface VerificationData {
  email: string;
  code: number;
}

export const LoginApi = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await freelancersAPI.post("/login", {
      username,
      password,
    });
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
  }
};

export const SignupApi = async (signupData: SignupData) => {
  try {
    const response = await freelancersAPI.post("/signup", signupData);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during signup:", error);
  }
};

export const OTPApi = async (verificationData: VerificationData) => {
  try {
    const response = await freelancersAPI.post(
      "/verification",
      verificationData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error during OTP verification:", error);
    throw new Error("OTP verification failed. Please try again.");  
  }
};

export const profileCompletion = async (formData: profileCompletionForm) => {
  try {
    const response = await freelancersAPI.post("/profileCompletion", formData);
    console.log(response);
    return response.data;
  } catch (error) {}
};

export const profileUpdate = async (formData: profileCompletionForm) => {
  try {
    
    const response = await freelancersAPI.post("/profileupdate", formData);
    console.log(response);
    return response.data;
  } catch (error) {}
};

export const reSendOTP = async (email: string) => {
  try {
    const response = await freelancersAPI.post("/resendotp", { email });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const googleAuth = async (key: string) => {
  try {
    console.log(key);

    const response = await freelancersAPI.post("/googleauth", { key });
    return response.data;
  } catch (error) {}
};

export const googleAuthLogin = async (key: string) => {
  try {
    console.log(key);

    const response = await freelancersAPI.post("/googleauthLogin", { key });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProfileData = async () => {
  try {
    const response = await freelancersAPI.get(`/profiledata`);
    return response.data;
  } catch (error) {}
};

export const uploadProfileImage = async (formData: FormData): Promise<any> => {
    try {
      const response = await freelancersAPI.post('/uploadProfileImage', formData);
      return response.data;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error; 
    }
  };
