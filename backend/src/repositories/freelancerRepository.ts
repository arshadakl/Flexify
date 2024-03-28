// freelancerRepository.ts

import { Freelancer, FreelancerDetails } from "../models/Freelancer";

export interface FreelancerRepository {
    findByUsername(username: string): Promise<Freelancer | null>;
    findByEmail(email: string): Promise<Freelancer | null>;
    find_ById(id:string): Promise<Freelancer | undefined>;
    create(freelancer: Freelancer): Promise<void>;
    checkPassword(username:string , password:string): Promise<boolean>
    clearOTP(email:string):void
    FreelancerDetailsAdd(formData:any):void
    FreelancerDetailsupdate(formData:any):void
    doVerification(id:string):Promise<Freelancer>
    setNewOTP(email:string,otp:number):Promise<any>
    findDetailsById(id:string):Promise<FreelancerDetails | null>
    updateProfileImage(id:string,filepaht:string):Promise<Freelancer | null>
}