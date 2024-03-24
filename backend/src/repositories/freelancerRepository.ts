// freelancerRepository.ts

import { Freelancer, FreelancerDetails } from "../models/Freelancer";

export interface FreelancerRepository {
    findByUsername(username: string): Promise<Freelancer | null>;
    findByEmail(email: string): Promise<Freelancer | null>;
    findById(id: string): Promise<Freelancer | null>;
    create(freelancer: Freelancer): Promise<void>;
    checkPassword(username:string , password:string): Promise<boolean>
    clearOTP(email:string):void
    FreelancerDetailsAdd(formData:any):void
    doVerification(id:string):Promise<Freelancer>
    setNewOTP(email:string,otp:number):Promise<any>
    findDetailsById(id:string):Promise<FreelancerDetails | null>
}