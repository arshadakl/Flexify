import { Request, Response } from "express";
import { AdminServicesimple } from "../services/adminServiceImpl";
import { Category } from "../models/Category";

export class AdminController {
    constructor(private readonly _adminService: AdminServicesimple) { }

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
            
            
            const categories = await this._adminService.getAllCategories()
            console.log(categories,"this is new Data")
            
            return res.status(200).json({ status: 'success', data: categories })
        } catch (error: any) {
            return res.json({ status: false, error: error.message })
        }
    }
    //get all categories
    async allCategoriesPage(req: Request, res: Response): Promise<any> {
        try {
            const page = parseInt((req.query.page as string))
            // console.log(req.headers);
            console.log(page ,"this is page number");
            
            
            const categories = await this._adminService.getAllCategoriesPage(page)
            if(!categories?.data || !categories.totalPages){
                throw new Error("Categories not found")
            }
            console.log(categories,"this is new Data")
            
            return res.status(200).json({ status: 'success', data: categories.data,page:categories.totalPages })
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
            // console.log(categories)
            
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
            
            const isWork = await this._adminService.findWorkById(req.body.id)
            if(!isWork) {
                throw new Error("Work not found")
            }
            const Works = await this._adminService.suspendWork(isWork)
            if(Works){
               const postes = await this._adminService.GetRepotedPost()
               
                const Works = await this._adminService.getAllWorkService()
                res.status(200).json({ status: true, data: Works,flagged: postes})
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
     //get all transactions
    async getallTransaction(req: Request, res: Response): Promise<any> {
        try {
           const transactions = await this._adminService.getAllTransactions()
            res.status(200).json({status:true,data:transactions})
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

     //get all transactions
    async getAllSubmissions(req: Request, res: Response): Promise<any> {
        try {
           const submissions = await this._adminService.getAllSubmissions()
            res.status(200).json({status:true,data:submissions})
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

     //get all Flagged Postes
    async GetRepotedPost(req: Request, res: Response): Promise<any> {
        console.log("called");
        
        try {
           const postes = await this._adminService.GetRepotedPost()
            res.status(200).json({status:true,post:postes})
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

     //get chart data
    async GetDashboardChartData(req: Request, res: Response): Promise<any> {
        try {
           const responseData = await this._adminService.getDashboardChartData()
            res.status(200).json({status:true,chartData:responseData})
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

     //get Top freelancers
    async getTopFreelancers(req: Request, res: Response): Promise<any> {
        try {
           const responseData = await this._adminService.getTopFreelancers()
            res.status(200).json({status:true,list:responseData})
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }

     //get statistics profit..
    async statistics(req: Request, res: Response): Promise<any> {
        try {
           const responseData = await this._adminService.getstatistics()

            res.status(200).json({status:true,statistics:responseData})
        } catch (error: any) {
            res.json({ status: false, error: error.message })
        }
    }



}