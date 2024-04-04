import { promises } from "dns";
import { Freelancer } from "../models/Freelancer";
import { ICategory } from "../interfaces/adminInterface";
// import { AdminInter } from "../interfaces/adminInterface";

export interface AdminRepository {
    getAllUsersData():void
    findById(id: string): Promise<Freelancer | null>
    blockUser(id:string,action:any):Promise<any>
    findAdminByName(adminId:string):Promise<any | undefined>
    findCategoryByName(name:string):Promise<any | undefined>
    addNewCategory(title:string,description:string):Promise<any>
    getAllCategories():Promise<ICategory[] | undefined>
    getOneCategorie(id:string):Promise<ICategory | undefined | null> 
    deleteCategory(id:string):Promise<any>
}

