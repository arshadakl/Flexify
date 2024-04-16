import { ICategory, ISubcategory } from "../interfaces/adminInterface"
import { IOrder } from "../interfaces/clientInterface"
import { IWork } from "../interfaces/freelancerInterface"

export interface AdminServices{
    Login({adminId,password}:{adminId:string,password:string}):Promise<void>
    getAllusers(): Promise<any>
    doBlockUser(id: string): Promise<any>
    addCategoryServ(title:string,description:string):Promise<Boolean | undefined>
    editCategoryServ(title:string,description:string,_id:string):Promise<Boolean | undefined>
    getAllCategories():Promise<ICategory[] | undefined>
    deleteCategoryServ(id:string):Promise<ICategory[] | undefined>
    addSubCategoryServ(title:string,description:string,category:string):Promise<Boolean | undefined>
    getAllSubCategories():Promise<ISubcategory[] | undefined>
    deleteSubCategoryServ(id:string):Promise<ISubcategory[] | undefined>
    editSubCategoryServ(name:string,description:string,_id:string,category:string):Promise<Boolean | undefined>
    getAllWorkService():Promise<IWork[] | undefined>
    findWorkById(id:string):Promise<IWork | undefined>
    suspendWork(work:IWork):Promise<Boolean | undefined>
    getAllOrders():Promise<IOrder[] | null>

}