import React, { createContext, useState } from "react";

// Define the Freelancer interface
export interface Freelancer {
    id?: string;
    username: string;
    email: string;
    password: string;
    OTP?: number;
    token?: string;
    _id?: string;
    profile: string;
}

// Define the AuthContextValue interface with proper types for setters
interface AuthContextValue {
    userId?: string | null;
    setUserId: (value: string | null) => void;
    freelancerDetails?: Freelancer | null;
    setFreelancerDetails: (value: Freelancer | null) => void;
    isEdit: boolean;
    setIsEdit: (value: boolean) => void;
    imageSrc: string;
    setImageSrc: (value: string) => void;
}

// Initial context value with default functions
const initialContextValue: AuthContextValue = {
    userId: null,
    setUserId: () => {},
    freelancerDetails: null,
    setFreelancerDetails: () => {},
    isEdit: false,
    setIsEdit: () => {},
    imageSrc: "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg",
    setImageSrc: () => {},
};

// Create the context with the initial value
export const AuthContext = createContext<AuthContextValue>(initialContextValue);

// Create the provider component
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    // State hooks with initial values
    const [userId, setUserId] = useState<string | null>(null);
    const [freelancerDetails, setFreelancerDetails] = useState<Freelancer | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>("https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg");

    // Context value with updated types for setters
    const contextValue: AuthContextValue = {
        userId,
        setUserId,
        freelancerDetails,
        setFreelancerDetails,
        isEdit,
        setIsEdit,
        imageSrc,
        setImageSrc,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default ContextProvider;
