// freelancerRepository.ts

import { promises } from "dns";
import { ICategory, ISubcategory } from "../interfaces/adminInterface";
import { IWork } from "../interfaces/freelancerInterface";
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
    updatePassword(id:string,password:string):Promise<any>
    getAllCategories():Promise<ICategory[] | undefined>
    getAllSubCategories():Promise<ISubcategory[] | undefined>
    findSubCategoriesById(id:string):Promise<ISubcategory | null>
    findCategoriesById(id:string):Promise<ICategory | null>
    createWorkPost(workData:IWork):Promise<any>

    getAllWorkOfUser(id:string):Promise<any>

}