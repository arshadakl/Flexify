
import { AdminRepository } from "./adminRepository";
const AdminModel = require('../models/Admin').Admin
const FreelancerModel = require('../models/Freelancer').Freelancer

import { Freelancer, FreelancerDetails } from "../models/Freelancer";
import { Category, Subcategory } from "../models/Category";
import { promises } from "dns";
import {  AdminInter, ICategory, ISubcategory } from "../interfaces/adminInterface";
// import { AdminInter } from "../interfaces/adminInterface";



export class AdminRepositoryImpl implements AdminRepository{
    async getAllUsersData(){
        return await Freelancer.find()
    }

    async findById(id: string): Promise<Freelancer | null> {
        return await FreelancerModel.findById(id);
    }

    async findAdminById(id: string): Promise<AdminInter | null> {
        return await AdminModel.findById(id);
    }

    async blockUser(id: string, action:any): Promise<any> {
        return await FreelancerModel.updateOne({ _id: id }, { isBlocked: action });
    }

    async findAdminByName(adminId: string): Promise<any | undefined>{
       return await AdminModel.findOne({adminId: adminId})
    }
    //main category
    async findCategoryByName(name: string): Promise<any | undefined>{
        return await Category.findOne({title: name})
    }

    async findCategoryById(id: string): Promise<any | undefined>{
        return await Category.findOne({_id: id})
    }

    
    //category
    async addNewCategory(title: string,description:string): Promise<any | undefined>{
        return await Category.create({title: title, description: description})
    }

    async editCategory(title: string,description:string,_id:string): Promise<any | undefined>{
        return await Category.updateOne(
            {_id:_id},
            {
                $set:{title: title, description: description},
                $currentDate: { updatedAt: true },
            }
            )
    }

    async getAllCategories():Promise<ICategory[] | undefined>{
        return await Category.find({})
    }

    async getOneCategorie(id:string):Promise<ICategory | undefined | null> {
        return await Category.findOne({_id:id})
    }

    async deleteCategory(id:string):Promise<any> {
        return await Category.deleteOne({_id:id})
    }

    //sucatecory 
    async findSubCategoryByName(name: string): Promise<any | undefined>{
        return await Subcategory.findOne({name: name})
    }

  
    async findSubCategoryById(id: string): Promise<any | undefined>{
        return await Subcategory.findOne({_id: id})
    }

    async addNewSubCategory(name: string,description:string,category:string): Promise<any | undefined>{
        return await Subcategory.create({name: name, description: description,category: category})
    }

    async getAllSubCategories():Promise<ISubcategory[] | undefined>{
        return await Subcategory.find({})
    }

    async getOneSubCategorie(id:string):Promise<ISubcategory | undefined | null> {
        return await Subcategory.findOne({_id:id})
    }

    async deleteSubCategory(id:string):Promise<any> {
        return await Subcategory.deleteOne({_id:id})
    }

    async deleteSubCategoryByMain(category:string):Promise<any> {
        return await Subcategory.deleteMany({category:category})
    }

    async editSubCategory(name: string,description:string,_id:string): Promise<any | undefined>{
        return await Subcategory.updateOne(
            {_id:_id},
            {
                $set:{name: name, description: description},
                $currentDate: { updatedAt: true },
            }
            )
    }
}
   