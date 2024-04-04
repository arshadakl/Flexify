
import { AdminRepository } from "./adminRepository";
const AdminModel = require('../models/Admin').Admin
const FreelancerModel = require('../models/Freelancer').Freelancer

import { Freelancer, FreelancerDetails } from "../models/Freelancer";
import { Category, Subcategory } from "../models/Category";
import { promises } from "dns";
import {  ICategory, ISubcategory } from "../interfaces/adminInterface";
// import { AdminInter } from "../interfaces/adminInterface";



export class AdminRepositoryImpl implements AdminRepository{
    async getAllUsersData(){
        return await Freelancer.find()
    }

    async findById(id: string): Promise<Freelancer | null> {
        return await FreelancerModel.findById(id);
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

    

    async addNewCategory(title: string,description:string): Promise<any | undefined>{
        return await Category.create({title: title, description: description})
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
}
   