export interface FreelancerInterface {
    id?: string;
    username: string;
    email: string;
    password: string ;
    OTP?:Number,
    token?:string,
    isVerified?:Number
    profile?:string,
    isBlocked?:string
}
