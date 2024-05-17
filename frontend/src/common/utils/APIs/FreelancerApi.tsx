// AxiosInterceptor.tsx
import React, { useEffect } from "react";
import axios from "axios";
import { BASE_API_URL } from "../config/constants";
import { useSelector } from "react-redux";
import { profileCompletionForm } from "../../components/ProfileCompletionParts/CompletionForm";

import { handleError } from "./ErrorHandlers/ErrorHandle";

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

interface resetPasswordData {
  password: string;
  token: string;
}

const AxiosInterceptor: React.FC = () => {
  const user = useSelector((state: any) => state.freelancer);

  useEffect(() => {
    const requestInterceptor = freelancersAPI.interceptors.request.use(
      (config) => {
        if (user.freelancer) {
          config.headers["Authorization"] = user.freelancer.token;
        } else {
          config.headers["Authorization"] = "noToken";
        }

        return config;
      },
      (error) => Promise.reject(error)
    );
    //

    // Clean up the request interceptor when the component unmounts
    return () => {
      freelancersAPI.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);

  return null;
};

export const LoginApi = async ({ username, password }: LoginData) => {
  try {
    const response = await freelancersAPI.post("/login", {
      username,
      password,
    });

    return response.data;
  } catch (error: any) {
    const errorMessage = handleError(error);

    throw errorMessage;
  }
};

export const signupApi = async (signupData: SignupData) => {
  try {
    const response = await freelancersAPI.post("/signup", signupData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Signup failed: ${error.message}`);
    }
  }
};

export const otpApi = async (verificationData: VerificationData) => {
  try {
    const response = await freelancersAPI.post(
      "/verification",
      verificationData
    );
    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const otpApiForgotpassword = async (
  verificationData: VerificationData
) => {
  try {
    const response = await freelancersAPI.post(
      "/forgotpasswordotp",
      verificationData
    );
    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const passwordReset = async (data: resetPasswordData) => {
  try {
    const response = await freelancersAPI.post("/passwordreset", data);
    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const profileCompletion = async (formData: profileCompletionForm) => {
  try {
    const response = await freelancersAPI.post("/profileCompletion", formData);

    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};
export const roleSpecify = async (id: string, role: string) => {
  try {
    const response = await freelancersAPI.post("/rolespecify", {
      id: id,
      role: role,
    });

    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};
export const switchRoleAPI = async (role: string) => {
  try {
    const response = await freelancersAPI.post("/changerole", { role: role });
    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const profileUpdate = async (formData: profileCompletionForm) => {
  try {
    const response = await freelancersAPI.post("/profileUpdate", formData);
    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const reSendOTP = async (email: string) => {
  try {
    const response = await freelancersAPI.post("/resendOtp", { email });
    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const googleAuth = async (key: string) => {
  try {
    const response = await freelancersAPI.post("/googleAuth", { key });

    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const googleAuthLogin = async (key: string) => {
  try {
    const response = await freelancersAPI.post("/googleAuthLogin", { key });
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
    const response = await freelancersAPI.get("/profileData");

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
    const response = await freelancersAPI.post(
      "/uploadProfileImage",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: unknown) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await freelancersAPI.post("/forgotpassword", { email });
    return response.data;
  } catch (error: any) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getAllCategories = async () => {
  try {
    const response = await freelancersAPI.get("/allcategories");
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getAllSubCategories = async () => {
  try {
    const response = await freelancersAPI.get("/allsubcategories");
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const workPostAPI = async (formData: any) => {
  try {
    const response = await freelancersAPI.post("/worksubmit", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getUsrAllWork = async () => {
  try {
    const response = await freelancersAPI.get("/getuserwork");
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getAllWorks = async (skey: string, fkey: string, page: number) => {
  try {
    const response = await freelancersAPI.get(
      `/getAllWorks?skey=${skey}&fkey=${fkey}&page=${page}`
    );
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getSingleWorkAPI = async (id: string) => {
  try {
    const response = await freelancersAPI.get(`/singlework/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const singleOrderDetails = async (id: string) => {
  try {
    const response = await freelancersAPI.get(`/singleorder/${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const deleteWork = async (id: any) => {
  try {
    const response = await freelancersAPI.delete(`/deletework?id=${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getRecivedOrdersAPI = async () => {
  try {
    const response = await freelancersAPI.get("/recivedorders");

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getAllPost = async (page: number) => {
  try {
    const response = await freelancersAPI.get(`/allpost?page=${page}`);

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getTransactionsAPI = async () => {
  try {
    const response = await freelancersAPI.get("/alltransactions");

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getSingleWork = async (id: string) => {
  try {
    const response = await freelancersAPI.get(`/getSingleWork?id=${id}`);

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const updateWorkAPI = async (form: any, id: string) => {
  try {
    const data = { id: id, data: form };
    const response = await freelancersAPI.patch(`/updatework`, data);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const submitOrderWork = async (form: any) => {
  try {
    const response = await freelancersAPI.post("/submitorderwork", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getrequirementsAPI = async (id: string) => {
  try {
    const response = await freelancersAPI.get(`/getrequirements?id=${id}`);

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const downloadFileAPI = async (pathurl: string) => {
  try {
    const response: any = await freelancersAPI.get(
      `/downloadFile?url=${pathurl}`,
      {
        responseType: "blob",
      }
    );
    const contentDispositionHeader = response.headers.get(
      "Content-Disposition"
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", contentDispositionHeader);

    document.body.appendChild(link);
    link.click();

    // Clean up
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);
    return "downloaded";
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const videocallAuthAPI = async (id: any) => {
  try {
    const response = await freelancersAPI.get(`/videocall-auth?id=${id}`);

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getchartdataAPI = async () => {
  try {
    const response = await freelancersAPI.get(`/getchartdata`);

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getNotificationsAPI = async () => {
  try {
    const response = await freelancersAPI.get(`/getnotification`);

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getActivity = async (id:string) => {
  try {
    const response = await freelancersAPI.get(`/getactivity?id=${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export default AxiosInterceptor;
