
import { Admin } from "../models/Admin";
import { AdminRepository } from "../repositories/adminRepository";
import { AdminRepositoryImpl } from "../repositories/adminRepositoryImpl";
import bcrypt from "bcrypt"
import { AdminJwtCreation } from "../utils/jwtCreation";
import { ICategory, ISubcategory } from "../interfaces/adminInterface";
import { IWork } from "../interfaces/freelancerInterface";
import { IOrder } from "../interfaces/clientInterface";



export class AdminServices {
    constructor(private readonly adminRepository: AdminRepositoryImpl) {}


    //admin Login 
    async Login({adminId,password}:{adminId:string,password:string}):Promise<void>{
        try {
            console.log(adminId,password);
            const admin = await this.adminRepository.findAdminByName(adminId)
            console.log(admin);
            if(!admin){
                throw new Error("incorrect admin ID");
            }
            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if(!isPasswordValid){
                throw new Error("incorrect password")
            }
            const credentials = await AdminJwtCreation(admin) 
            return credentials
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    //using for getting all users
    async getAllusers(): Promise<any> {
        try {
            const users = await this.adminRepository.getAllUsersData()
            if (users) {
                return users
            } else {
                throw new Error("No users found")
            }
        } catch (error) {

        }
    }

    //admin user blocking actions
    async doBlockUser(id: string): Promise<any> {
        try {
            const userData = await this.adminRepository.findById(id)
            console.log(userData);

            if (userData) {
                const action = userData.isBlocked=="Block" ? "unBlock" : "Block"
                const response = await this.adminRepository.blockUser(id, action)
                console.log(response);
                
                if (response) {
                    const users = await this.adminRepository.getAllUsersData()
                    return users
                }
            }
        } catch (error) {
            throw new Error("error")
        }
    }

    // categies
    async addCategoryServ(title:string,description:string):Promise<Boolean | undefined>{
        try {
            const isCategory = await this.adminRepository.findCategoryByName(title)
            if(isCategory){
                throw new Error("Category already exists")
            }
            const category = await this.adminRepository.addNewCategory(title, description)
            console.log(category);
            if(category){
                return true
            }
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    //edit category
    async editCategoryServ(title:string,description:string,_id:string):Promise<Boolean | undefined>{
        try {
            const isCategory = await this.adminRepository.findCategoryById(_id)
            if(!isCategory){
                throw new Error("Category not exists")
            }
            const category = await this.adminRepository.editCategory(title, description,_id)
            console.log(category);
            if(category){
                return true
            }
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }


    async getAllCategories():Promise<ICategory[] | undefined> {
        try {
            const allCategories = await this.adminRepository.getAllCategories()
            if(allCategories){
                return allCategories
            }
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    async deleteCategoryServ(id:string):Promise<ICategory[] | undefined> {
        try {
            const categories = await this.adminRepository.getOneCategorie(id)
            if(!categories){
                throw new Error("id not found")
            }
            const deleteResponse = await this.adminRepository.deleteCategory(id)
            const deleteSubCategory = await this.adminRepository.deleteSubCategoryByMain(id)
            return await this.adminRepository.getAllCategories()
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }


    //subcategory
    async addSubCategoryServ(title:string,description:string,category:string):Promise<Boolean | undefined>{
        try {
            const isCategory = await this.adminRepository.findCategoryById(category)
            if(!isCategory){
                throw new Error("Main Category is not exists")
            }
            const isSubCategory = await this.adminRepository.findSubCategoryByName(title)
            if(isSubCategory){
                throw new Error("This Subcategory already exists")
            }
            const Subcategory = await this.adminRepository.addNewSubCategory(title, description,category)
            console.log(Subcategory);
            if(Subcategory){
                return true
            }
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    async getAllSubCategories():Promise<ISubcategory[] | undefined> {
        try {
            const allCategories = await this.adminRepository.getAllSubCategories()
           
            if(allCategories){
                return allCategories
            }
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    async deleteSubCategoryServ(id:string):Promise<ISubcategory[] | undefined> {
        try {
            const categories = await this.adminRepository.getOneSubCategorie(id)
            if(!categories){
                throw new Error("id not found")
            }
            const deleteResponse = await this.adminRepository.deleteSubCategory(id)
            return await this.adminRepository.getAllSubCategories()
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    async editSubCategoryServ(name:string,description:string,_id:string,category:string):Promise<Boolean | undefined>{
        try {
            const isCategory = await this.adminRepository.findCategoryById(category)
            if(!isCategory){
                throw new Error("Category not exists")
            }
            const isSubCategory = await this.adminRepository.findSubCategoryById(_id)
            if(!isSubCategory){
                throw new Error("sub Category not exists")
            }
            const subcategory = await this.adminRepository.editSubCategory(name, description,_id)
            console.log(subcategory);
            if(subcategory){
                return true
            }
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }



    async getAllWorkService():Promise<IWork[] | undefined> {
        try {
            const worksData = await this.adminRepository.getAllWorks()
           
            if(worksData){
                return worksData
            }
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    async findWorkById(id:string):Promise<IWork | undefined> {
        try {
            const worksData = await this.adminRepository.findWorkById(id)
           
            if(worksData){
                return worksData
            }
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    async suspendWork(work:IWork):Promise<Boolean | undefined> {
        try {
            const action = work.isActive ? false : true
            const worksData = await this.adminRepository.suspendWork(work._id,action)
            console.log(worksData,"test data");
            
            if(worksData){
                return true
            }
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
    //get all orders
    // ---------------
    async getAllOrders():Promise<IOrder[] | null> {
        try {
            const orderData = await this.adminRepository.getAllOrders()
            if(!orderData) throw new Error("No order found")
            return orderData    
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

}