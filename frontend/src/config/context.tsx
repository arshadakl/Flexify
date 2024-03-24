


import React, { createContext, useState } from "react";

interface AuthContextValue {
    userId?: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
    freelancerDetails?: Freelancer | null; // Assuming FreelancerDetails interface is defined
    setFreelancerDetails: React.Dispatch<React.SetStateAction<Freelancer | null>>;
}

const initialContextValue: AuthContextValue = {
    userId: null,
    setUserId: () => {},
    freelancerDetails: null,
    setFreelancerDetails: () => {},
};
export interface Freelancer {
    id?: string;
    username: string;
    email: string;
    password: string ;
    OTP?:Number,
    token?:string,
    _id?: string
}

export const AuthContext = createContext<AuthContextValue>(initialContextValue);

const Context = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [freelancerDetails, setFreelancerDetails] = useState<Freelancer | null>(null);

    const contextValue: AuthContextValue = {
        userId,
        setUserId,
        freelancerDetails,
        setFreelancerDetails,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default Context;
