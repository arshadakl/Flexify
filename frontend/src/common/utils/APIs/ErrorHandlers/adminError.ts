import axios, { AxiosError } from 'axios';
import store, { persistor } from "../../../../Redux/store";
import { logout } from "../../../../Redux/Slices/adminSlice";
import { toast } from 'sonner';

interface ResponseData {
    message: string;
}

export const handleError = (
    err: unknown
) => {
    if (axios.isAxiosError<ResponseData>(err)) {
        const axiosError = err as AxiosError<ResponseData>;
        // Handle specific error codes
        switch (axiosError.response?.status) {
            case 401:
              
                if (axiosError.response.data.message === 'session expired please login again' || axiosError.response.data.message === 'Unauthorized') {
                 
                    store.dispatch(logout());
                    toast.warning("session expired please login again")
                    persistor.purge();
                    window.location.href="/admin/login"
                    console.log("logged out called");


                    return new Error('session expired please login again');
                } else {
                    return new Error('You are not authorized to access this resource.');
                }
            case 403:
                return new Error('You do not have permission to access this resource.');
            case 404:
                return new Error('The requested resource was not found.');
            case 500:
                return new Error('An error occurred on the server.');
            default:
                return new Error(`An error occurred: ${axiosError.message}`);
        }
    } else {
        // Handle unexpected errors
        return new Error('An unexpected error occurred.');
    }
};

