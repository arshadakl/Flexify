import { promises } from "dns";
import { Freelancer } from "../models/Freelancer";
import { AdminInter, ICategory, ISubcategory } from "../interfaces/adminInterface";
// import { AdminInter } from "../interfaces/adminInterface";

export interface AdminRepository {
    getAllUsersData():void
    findById(id: string): Promise<Freelancer | null>
    blockUser(id:string,action:any):Promise<any>
    findAdminByName(adminId:string):Promise<any | undefined>
    findAdminById(id: string): Promise<AdminInter | null>
    //category
    findCategoryByName(name:string):Promise<any | undefined>
    findCategoryById(id:string):Promise<any | undefined>
    addNewCategory(title:string,description:string):Promise<any>
    getAllCategories():Promise<ICategory[] | undefined>
    getOneCategorie(id:string):Promise<ICategory | undefined | null> 
    deleteCategory(id:string):Promise<any>
    editCategory(title:string,description:string,_id:string):Promise<any>

    //subcategories
    findSubCategoryByName(name:string):Promise<any | undefined>
    findSubCategoryById(id:string):Promise<any | undefined>
    addNewSubCategory(title:string,description:string,category:string):Promise<any>
    getAllSubCategories():Promise<ISubcategory[] | undefined>
    getOneSubCategorie(id:string):Promise<ISubcategory | undefined | null> 
    deleteSubCategory(id:string):Promise<any>
    deleteSubCategoryByMain(category:string):Promise<any>
    editSubCategory(name:string,description:string,_id:string):Promise<any>


}

