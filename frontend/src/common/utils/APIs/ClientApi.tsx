import axios from "axios";
import { BASE_API_URL } from "../config/constants";
import { profileCompletionFormClient } from "../../components/ProfileCompletionParts/CompletionForm";
import store from "../../../Redux/store";
import { handleError } from "./ErrorHandlers/ErrorHandle";

const clientAPI = axios.create({
  baseURL: `${BASE_API_URL}/client`,
});

clientAPI.interceptors.request.use(
  (config) => {
    // Get the token from your Redux store
    const state = store.getState();
    const freelancer = state.freelancer.freelancer;
    const token = freelancer?.token;

    if (token) {
      config.headers["Authorization"] = `${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const profileCompletionClient = async (
  formData: profileCompletionFormClient
) => {
  try {
    console.log(formData);

    const response = await clientAPI.post("/profileCompletion", formData);
    // console.log(response);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const checkoutAPI = async (id: string) => {
  try {
    console.log("api called");

    const response = await clientAPI.post("/create-checkout-sessions", {
      id: id,
    });
    // console.log(response);

    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getAllOrdersAPI = async () => {
  try {
    const response = await clientAPI.get("/clientorders");
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const getLastOrderIdAPI = async () => {
  try {
    const response = await clientAPI.get("/latestorderid");
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const singleorderDetailsAPI = async (id: string) => {
  try {
    const response = await clientAPI.get(`/singleorder?orderId=${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};

export const deliverdworkAPI = async (id: string) => {
  try {
    const response = await clientAPI.get(`/deliverdwork?id=${id}`);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};


export const requirementsSubmitAPI = async (formData: any) => {
  try {
    const response = await clientAPI.post("/requirementsubmit", formData, {
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

export const downloadsubmissionFileAPI = async (id: string) => {
  try {
    const response: any = await clientAPI.get(`/downloadsubmission?id=${id}`, {
      responseType: "blob",
    });
    const contentDispositionHeader = response.headers.get(
      "Content-Disposition"
    );
    console.log("Content-Disposition:", contentDispositionHeader);
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



export const manageApprovalAPI = async (id: string,status:string,orderId:string) => {
  try {
    const formData = {
      submitId:id,
      status:status,
      orderId:orderId
    }
    const response = await clientAPI.patch(`/manageapproval`,formData);
    return response.data;
  } catch (error) {
    const errorMessage = handleError(error);
    throw errorMessage;
  }
};