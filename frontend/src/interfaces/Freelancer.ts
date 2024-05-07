// interfaces/Freelancer.ts

export interface Freelancer {
    OTP: number;
    email: string;
    isBlocked: string;
    isVerified: boolean;
    password: string;
    profile: string;
    token: string;
    username: string;
    _id: string;
    role: string;
  }


//   export interface Freelancer {
//     id?: string;
//     username: string;
//     email: string;
//     password: string;
//     OTP?: number;
//     token?: string;
//     isVerified?: number;
//     profile?: string;
//     isBlocked?: string;
//     role?: 'freelancer' | 'client' | 'notspecified';
// }

  export interface DetailsINter {
    images: {
      first: string;
      second: string;
      third: string;
    };
    deliveryPeriod: number;
    referenceMaterial: boolean;
    logo: boolean;
    description: string;
    questionnaire: string[]; 
    amount: number;
  }

  
  export interface IWork {
    _id?: string;
    title: string;
    category: string;
    subcategory: string;
    categoryNames:string[];
    tags: string[];
    image1: string;
    image2?: string;
    deliveryPeriod: number;
    image3?: string;
    referenceMaterial: boolean;
    logo: boolean;
    description?: string;
    questionnaire: string[];
    amount: number;
    isActive:boolean;
    date?:number;
  }