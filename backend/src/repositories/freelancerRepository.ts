// freelancerRepository.ts

import { promises } from "dns";
import { DeleteResult, ICategory, ISubcategory } from "../interfaces/adminInterface";
import { INotification, IWork } from "../interfaces/freelancerInterface";
import { Freelancer, FreelancerDetails } from "../models/Freelancer";
import { UpdateWriteOpResult } from "mongoose";
import { IOrder, ISubmissions, ITransaction } from "../interfaces/clientInterface";
import { IFreelancerActivity } from "../models/Activity";

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
    doRolespecify(id:String, role:string):Promise<UpdateWriteOpResult>
    setNewOTP(email:string,otp:number):Promise<any>
    findDetailsById(id:string):Promise<FreelancerDetails | null>
    updateProfileImage(id:string,filepaht:string):Promise<Freelancer | null>
    updatePassword(id:string,password:string):Promise<any>
    getAllCategories():Promise<ICategory[] | undefined>
    getAllSubCategories():Promise<ISubcategory[] | undefined>
    findSubCategoriesById(id:string):Promise<ISubcategory | null>
    findCategoriesById(id:string):Promise<ICategory | null>
    createWorkPost(workData:IWork):Promise<IWork>

    getAllWorkOfUser(id: string): Promise<IWork[] | null>

    getAllActiveWorksToDiscover(searchKey:string,categoryName:string,page:number):Promise<any>
    getAllActiveWorksToDiscoverSearch(searchTerm: string): Promise<any>

    deleteWork(id:string):Promise<DeleteResult>

    // singlePostDetails(id:string):Promise<any>
    getWorkDetails(id:string):Promise<any>
    getRecivedWork(id:string):Promise<IOrder[] | null>

    getAllActivepost(freelancerId:string,page:number):Promise<any | null>
    getAllSuspendedpost(freelancerId:string):Promise<IWork[] | null>

    getSingleWork(workId:string):Promise<IWork | null>
    updateWork(data:any,workId:string):Promise<UpdateWriteOpResult>

    // getOrderDetails(id:string):Promise<any>
    getOrderDetails(id: string):Promise<any>
    createSubmission(data:any): Promise<ISubmissions | null>

    changeWorkStatus(orderId:string,status:string):Promise<UpdateWriteOpResult>
    getRequirements(id: string):Promise<any>

    getUserAllTransaction(userId:string): Promise<ITransaction[] | null>
    
    getChartData(freelancerId:string):Promise<any>
    getStaticsData(freelancerId:string):Promise<any>

    getNotification(userId:string): Promise<INotification[] | null>

    addOrUpdateActivity(freelancerId: string): Promise<void>

    getActivity(freelancerId: string): Promise<IFreelancerActivity | undefined>
}