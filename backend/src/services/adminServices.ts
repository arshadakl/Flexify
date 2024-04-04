
import { Admin } from "../models/Admin";
import { AdminRepository } from "../repositories/adminRepository";
import { AdminRepositoryImpl } from "../repositories/adminRepositoryImpl";
import bcrypt from "bcrypt"
import { AdminJwtCreation } from "../utils/jwtCreation";
import { ICategory } from "../interfaces/adminInterface";



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
            return await this.adminRepository.getAllCategories()
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
}