


// import React, { createContext, useState } from "react";

// interface AuthContextValue {
//     userId?: string | null;
//     setUserId: React.Dispatch<React.SetStateAction<string | null>>;
//     freelancerDetails?: Freelancer | null; // Assuming FreelancerDetails interface is defined
//     setFreelancerDetails: React.Dispatch<React.SetStateAction<Freelancer | null>>;
// }

// const initialContextValue: AuthContextValue = {
//     userId: null,
//     setUserId: () => {},
//     freelancerDetails: null,
//     setFreelancerDetails: () => {},
// };
// export interface Freelancer {
//     id?: string;
//     username: string;
//     email: string;
//     password: string ;
//     OTP?:Number,
//     token?:string,
//     _id?: string,
//     profile:string
// }

// export const AuthContext = createContext<AuthContextValue>(initialContextValue);

// const Context = ({ children }: { children: React.ReactNode }) => {
//     const [userId, setUserId] = useState<string | null>(null);
//     const [freelancerDetails, setFreelancerDetails] = useState<Freelancer | null>(null);

//     const contextValue: AuthContextValue = {
//         userId,
//         setUserId,
//         freelancerDetails,
//         setFreelancerDetails,
//     };

//     return (
//         <AuthContext.Provider value={contextValue}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default Context;

import React, { createContext, useState } from "react";

interface AuthContextValue {
    userId?: string | null;
    setUserId: React.Dispatch<React.SetStateAction<string | null>>;
    freelancerDetails?: Freelancer | null;
    setFreelancerDetails: React.Dispatch<React.SetStateAction<Freelancer | null>>;
    isEdit: boolean;
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
    imageSrc: string; // New state
    setImageSrc: React.Dispatch<React.SetStateAction<string>>; // Setter for imageSrc state
}

const initialContextValue: AuthContextValue = {
    userId: null,
    setUserId: () => {},
    freelancerDetails: null,
    setFreelancerDetails: () => {},
    isEdit: false,
    setIsEdit: () => {},
    imageSrc: "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg", // Initial value for imageSrc state
    setImageSrc: () => {}, // Initial setter for imageSrc state
};

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

export const AuthContext = createContext<AuthContextValue>(initialContextValue);

const Context = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [freelancerDetails, setFreelancerDetails] = useState<Freelancer | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>(
        "https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
    );

    const contextValue: AuthContextValue = {
        userId,
        setUserId,
        freelancerDetails,
        setFreelancerDetails,
        isEdit,
        setIsEdit,
        imageSrc, // Include imageSrc state in the context value
        setImageSrc, // Include setImageSrc setter in the context value
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default Context;

