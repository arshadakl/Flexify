import { Request, Response } from "express";
import { AdminServices } from "../services/adminServices";
import { Category } from "../models/Category";

export class AdminController {
    constructor(private readonly AdminService: AdminServices) { }

    //admin login
    async login(req: Request, res: Response): Promise<any> {
        const { adminId, password } = req.body
        try {
            const AdminResponse = await this.AdminService.Login({ adminId, password })
            res.status(200).json({ status: true, admin: AdminResponse })
        } catch (error: any) {
            res.json({ status: false, message: error.message })
        }
    }


    async getAllUsers(req: Request, res: Response): Promise<any> {
        try {
            const users = await this.AdminService.getAllusers()
            if (users) {
                res.status(200).json({ users, status: true })
            } else {
                throw new Error("No users found")
            }
        } catch (error) {
            res.json({ status: false })
        }
    }

    //for block users
    async blockUser(req: Request, res: Response): Promise<any> {
        console.log(req.body.id);

        try {
            const users = await this.AdminService.doBlockUser(req.body.id)
            if (users) {
                res.status(200).json({ users, status: true })
            } else {
                throw new Error("No users found")
            }
        } catch (error) {
            res.json({ status: false })
        }
    }

    //for add new categories
    async addCategory(req: Request, res: Response): Promise<any> {
        const { title, description } = req.body
        console.log(title, description);
        try {
            const categorie = await this.AdminService.addCategoryServ(title, description)
            if (categorie) {
                const updatedData = await this.AdminService.getAllCategories()
                res.status(200).json({ status: 'success', data: updatedData })
            }
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    async editCategory(req: Request, res: Response): Promise<any> {
        const { title, description, _id } = req.body
        console.log(title, description,_id);
        try {
            const categorie = await this.AdminService.editCategoryServ(title, description,_id)
            if (categorie) {
                const updatedData = await this.AdminService.getAllCategories()
                res.status(200).json({ status: 'success', data: updatedData })
            }
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    

    //get all categories
    async allCategories(req: Request, res: Response): Promise<any> {
        try {
            console.log(req.headers);
            
            const categories = await this.AdminService.getAllCategories()
            console.log(categories)
            
            return res.status(200).json({ status: 'success', data: categories })
        } catch (error: any) {
            return res.json({ status: false, error: error.message })
        }
    }

    //delete categorie
    async deleteCategory(req: Request, res: Response): Promise<any> {
        try {
            const id: string = req.query.id as string;
            console.log(id);
            
            if(!id){
                throw new Error("id is missing")
            }
            const categories = await this.AdminService.deleteCategoryServ(id)
            res.status(200).json({ status: 'success', data: categories })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    //for add new Sub categories
    async addSubCategory(req: Request, res: Response): Promise<any> {
        const { name, description,category } = req.body
        console.log(req.body);
        
        console.log(name, description);
        try {
            const categorie = await this.AdminService.addSubCategoryServ(name, description,category)
            if (categorie) {
                const updatedData = await this.AdminService.getAllSubCategories()
                res.status(200).json({ status: 'success', data: updatedData })
            }
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }


    
    //get all Subcategories
    async allSubCategories(req: Request, res: Response): Promise<any> {
        try {
            const categories = await this.AdminService.getAllSubCategories()
            console.log(categories)
            
            res.status(200).json({ status: 'success', data: categories })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

    //delete Subcategorie
    async deleteSubCategory(req: Request, res: Response): Promise<any> {
        try {
            const id: string = req.query.id as string;
            console.log(id);
            
            if(!id){
                throw new Error("id is missing")
            }
            const categories = await this.AdminService.deleteSubCategoryServ(id)
            res.status(200).json({ status: 'success', data: categories })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }


    async editSubCategory(req: Request, res: Response): Promise<any> {
        const { name, description, _id,category } = req.body
        console.log(name, description,_id,category);
        try {
            const categorie = await this.AdminService.editSubCategoryServ(name, description,_id,category)
            if (categorie) {
                const updatedData = await this.AdminService.getAllSubCategories()
                res.status(200).json({ status: 'success', data: updatedData })
            }
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }




}