import { Request, Response } from "express";
import { AdminServices } from "../services/adminServices";
import { Category } from "../models/Category";

export class AdminController {
    constructor(private readonly _adminService: AdminServices) { }

    //admin login
    async login(req: Request, res: Response): Promise<any> {
        const { adminId, password } = req.body
        try {
            const AdminResponse = await this._adminService.Login({ adminId, password })
            res.status(200).json({ status: true, admin: AdminResponse })
        } catch (error: any) {
            res.json({ status: false, message: error.message })
        }
    }


    async getAllUsers(req: Request, res: Response): Promise<any> {
        try {
            const users = await this._adminService.getAllusers()
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
            const users = await this._adminService.doBlockUser(req.body.id)
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
            const categorie = await this._adminService.addCategoryServ(title, description)
            if (categorie) {
                const updatedData = await this._adminService.getAllCategories()
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
            const categorie = await this._adminService.editCategoryServ(title, description,_id)
            if (categorie) {
                const updatedData = await this._adminService.getAllCategories()
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
            
            const categories = await this._adminService.getAllCategories()
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
            const categories = await this._adminService.deleteCategoryServ(id)
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
            const categorie = await this._adminService.addSubCategoryServ(name, description,category)
            if (categorie) {
                const updatedData = await this._adminService.getAllSubCategories()
                res.status(200).json({ status: 'success', data: updatedData })
            }
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }


    
    //get all Subcategories
    async allSubCategories(req: Request, res: Response): Promise<any> {
        try {
            const categories = await this._adminService.getAllSubCategories()
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
            const categories = await this._adminService.deleteSubCategoryServ(id)
            res.status(200).json({ status: 'success', data: categories })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }


    async editSubCategory(req: Request, res: Response): Promise<any> {
        const { name, description, _id,category } = req.body
        console.log(name, description,_id,category);
        try {
            const categorie = await this._adminService.editSubCategoryServ(name, description,_id,category)
            if (categorie) {
                const updatedData = await this._adminService.getAllSubCategories()
                res.status(200).json({ status: 'success', data: updatedData })
            }
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }


     //get all works
    async getAllWorks(req: Request, res: Response): Promise<any> {
        try {
            
            const Works = await this._adminService.getAllWorkService()
            console.log(Works)
            
            res.status(200).json({ status: true, data: Works })
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }
    
     //suspend request to over work 
    async suspendWork(req: Request, res: Response): Promise<any> {
        try {
            console.log("Called");
            
            const isWork = await this._adminService.findWorkById(req.body.id)
            if(!isWork) {
                throw new Error("Work not found")
            }
            const Works = await this._adminService.suspendWork(isWork)
            if(Works){
                const Works = await this._adminService.getAllWorkService()
                res.status(200).json({ status: true, data: Works })
            }
            
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }
    
     //suspend request to over work 
    async getallOrders(req: Request, res: Response): Promise<any> {
        try {
           const OrderData = await this._adminService.getAllOrders()
            res.status(200).json({status:true,orders:OrderData})
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }



}