import { Freelancer } from "../models/Freelancer";
import { AdminInter, DeleteResult, ICategory, ISubcategory } from "../interfaces/adminInterface";
import { IWork } from "../interfaces/freelancerInterface";
import { UpdateWriteOpResult } from "mongoose";
import { IOrder, ITransaction } from "../interfaces/clientInterface";
// import { AdminInter } from "../interfaces/adminInterface";

export interface AdminRepository {
    getAllUsersData(): Promise<Freelancer[] | null>
    findById(id: string): Promise<Freelancer | null>
    blockUser(id:string,action:any):Promise<UpdateWriteOpResult>
    findAdminByName(adminId:string):Promise<AdminInter | undefined>
    findAdminById(id: string): Promise<AdminInter | null>
    //category
    findCategoryByName(name:string):Promise<ICategory | null>
    findCategoryById(id:string):Promise<ICategory | null>
    addNewCategory(title:string,description:string):Promise<ICategory | undefined>
    getAllCategories(page:number):Promise<any>
    getOneCategorie(id:string):Promise<ICategory | undefined | null> 
    deleteCategory(id:string):Promise<any>
    editCategory(title:string,description:string,_id:string):Promise<UpdateWriteOpResult >

    //subcategories
    findSubCategoryByName(name:string):Promise<ISubcategory | null>
    findSubCategoryById(id:string):Promise<ISubcategory | null>
    addNewSubCategory(title:string,description:string,category:string):Promise<any>
    getAllSubCategories():Promise<ISubcategory[] | undefined>
    getOneSubCategorie(id:string):Promise<ISubcategory | undefined | null> 
    deleteSubCategory(id:string):Promise<any>
    deleteSubCategoryByMain(category:string):Promise<DeleteResult>
    editSubCategory(name:string,description:string,_id:string):Promise<UpdateWriteOpResult | undefined>
    getAllWorks():Promise<IWork[] | null>
    findWorkById(id: string): Promise<IWork | null>
    suspendWork(id: string, action:any): Promise<UpdateWriteOpResult>
    getAllOrders(): Promise<IOrder[] | null>
    getAllTransaction(): Promise<ITransaction[] | null>
}

