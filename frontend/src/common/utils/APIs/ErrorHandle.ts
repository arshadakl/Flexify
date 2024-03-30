// import { useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
// import { useLogout } from '../logoutUtils';
import store, { persistor } from "../../../Redux/store";
import { logout } from "../../../Redux/Slices/freelancerSlice";
// import { useNavigation } from '../config/NavigationContext';



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
                // Check if the user is blocked by the admin
                if (axiosError.response.data.message === 'your account is blocked') {
                    // Call the logout function
                    //   useLogout(persistor);
                    store.dispatch(logout());

                    // Purge the persistor
                    persistor.purge();
                    window.location.href="/login"
                    console.log("logged out called");


                    return new Error('You are blocked by the admin.');
                } else {
                    // Handle other unauthorized errors
                    return new Error('You are not authorized to access this resource.');
                }
            case 403:
                // Handle forbidden (403) error
                return new Error('You do not have permission to access this resource.');
            case 404:
                // Handle not found (404) error
                return new Error('The requested resource was not found.');
            case 500:
                // Handle server error (500)
                return new Error('An error occurred on the server.');
            default:
                // Handle other errors
                return new Error(`An error occurred: ${axiosError.message}`);
        }
    } else {
        // Handle unexpected errors
        return new Error('An unexpected error occurred.');
    }
};

