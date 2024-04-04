import { Request, Response } from "express";
import { AdminServices } from "../services/adminServices";

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

    //get all categories
    async allCategories(req: Request, res: Response): Promise<any> {
        try {
            const categories = await this.AdminService.getAllCategories()
            console.log(categories)
            
            res.status(200).json({ status: 'success', data: categories })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
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




}