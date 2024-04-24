
import { AdminRepository } from "./adminRepository";
const AdminModel = require('../models/Admin').Admin
const FreelancerModel = require('../models/Freelancer').Freelancer

import { Freelancer, FreelancerDetails, Submissions } from "../models/Freelancer";
import { Category, Subcategory } from "../models/Category";
import { promises } from "dns";
import { AdminInter, DeleteResult, ICategory, ISubcategory } from "../interfaces/adminInterface";
import { WorkModel } from "../models/Works";
import { IWork } from "../interfaces/freelancerInterface";
import { UpdateWriteOpResult } from "mongoose";
import { IOrder, ISubmissions, ITransaction } from "../interfaces/clientInterface";
import { Order } from "../models/Clients";
import { TransactionModel } from "../models/Transaction";
// import { AdminInter } from "../interfaces/adminInterface";



export class AdminRepositoryImpl implements AdminRepository {
    async getAllUsersData(): Promise<Freelancer[] | null> {
        return await Freelancer.find()
    }

    async findById(id: string): Promise<Freelancer | null> {
        return await FreelancerModel.findById(id);
    }

    async findAdminById(id: string): Promise<AdminInter | null> {
        return await AdminModel.findById(id);
    }

    async blockUser(id: string, action: any): Promise<UpdateWriteOpResult> {
        return await FreelancerModel.updateOne({ _id: id }, { isBlocked: action });
    }

    async findAdminByName(adminId: string): Promise<AdminInter | undefined> {
        return await AdminModel.findOne({ adminId: adminId })
    }
    //main category
    async findCategoryByName(name: string): Promise<ICategory | null> {
        return await Category.findOne({ title: name })
    }

    async findCategoryById(id: string): Promise<ICategory | null> {
        return await Category.findOne({ _id: id })
    }


    //category
    async addNewCategory(title: string, description: string): Promise<ICategory | undefined> {
        return await Category.create({ title: title, description: description })
    }

    async editCategory(title: string, description: string, _id: string): Promise<UpdateWriteOpResult> {
        return await Category.updateOne(
            { _id: _id },
            {
                $set: { title: title, description: description },
                $currentDate: { updatedAt: true },
            }
        )
    }

    async getAllCategories(): Promise<any> {
        try {
            const data = await Category.find({})
            if(!data) throw new Error("No category")
            return data

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getAllCategoriesPagenation(page: number): Promise<any> {
        try {
            let limit = 5
            let skip = (page - 1) * limit
            let count = await Category.find({}).countDocuments()
            let totalPages = Math.floor(count / limit)
            const data = await Category.find({}).skip(skip).limit(limit)
            if(!data) throw new Error("No category")
            return { data, totalPages }

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getOneCategorie(id: string): Promise<ICategory | undefined | null> {
        return await Category.findOne({ _id: id })
    }

    async deleteCategory(id: string): Promise<any> {
        return await Category.deleteOne({ _id: id })
    }

    //sucatecory 
    async findSubCategoryByName(name: string): Promise<ISubcategory | null> {
        return await Subcategory.findOne({ name: name })
    }


    async findSubCategoryById(id: string): Promise<ISubcategory | null> {
        return await Subcategory.findOne({ _id: id })
    }

    async addNewSubCategory(name: string, description: string, category: string): Promise<any | undefined> {
        return await Subcategory.create({ name: name, description: description, category: category })
    }

    async getAllSubCategories(): Promise<ISubcategory[] | undefined> {
        return await Subcategory.find({})
    }

    async getOneSubCategorie(id: string): Promise<ISubcategory | undefined | null> {
        return await Subcategory.findOne({ _id: id })
    }

    async deleteSubCategory(id: string): Promise<any> {
        return await Subcategory.deleteOne({ _id: id })
    }

    async deleteSubCategoryByMain(category: string): Promise<DeleteResult> {
        return await Subcategory.deleteMany({ category: category })
    }

    async editSubCategory(name: string, description: string, _id: string): Promise<UpdateWriteOpResult | undefined> {
        return await Subcategory.updateOne(
            { _id: _id },
            {
                $set: { name: name, description: description },
                $currentDate: { updatedAt: true },
            }
        )
    }

    async getAllWorks(): Promise<IWork[] | null> {
        return await WorkModel.find()
    }

    async findWorkById(id: string): Promise<IWork | null> {
        return await WorkModel.findOne({ _id: id });
    }

    async suspendWork(id: string, action: any): Promise<UpdateWriteOpResult> {
        return await WorkModel.updateOne({ _id: id }, { isActive: action });
    }

    async getAllOrders(): Promise<IOrder[] | null> {
        try {
            return await Order.find();
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getAllTransaction(): Promise<ITransaction[] | null> {
        try {
            // const response = await TransactionModel.find();
            const response = await TransactionModel.aggregate([
                {
                    $lookup: {
                        from: "freelancers",
                        localField: "user",
                        foreignField: "_id",
                        as: "user"
                    }
                },{
                    $sort: {
                        date: -1 // Sort by date in descending order (reverse order)
                    }
                }
            ]);
            if(!response) throw new Error("No transaction found")
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }


    async getAllSubmissions(): Promise<ISubmissions[] | null> {
        try {
            // const response = await TransactionModel.find();
            const response = await Submissions.aggregate([
                {
                    $lookup: {
                        from: "freelancers",
                        localField: "freelancerId",
                        foreignField: "_id",
                        as: "freelancer"
                    }
                },
                {
                    $lookup: {
                        from: "freelancers",
                        localField: "clientId",
                        foreignField: "_id",
                        as: "client"
                    }
                },
                {
                    $lookup: {
                        from: "workmodels",
                        localField: "workId",
                        foreignField: "_id",
                        as: "workDetails"
                    }
                },{
                    $sort: {
                        date: -1 
                    }
                }
            ]);
            if(!response) throw new Error("No transaction found")
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
