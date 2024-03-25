import { Request, Response } from "express";
import { AdminServices } from "../services/adminServices";

export class AdminController{
    constructor(private readonly AdminService: AdminServices){}

    async getAllUsers(req: Request, res: Response):Promise<any>{
        try {
            const users = await this.AdminService.getAllusers()
            if(users){
                res.status(200).json({users,status:true})
            }else{
                throw new Error("No users found")
            }
        } catch (error) {
            res.json({status:false})
        }
    }

    //for block users
    async blockUser(req: Request, res: Response):Promise<any>{
        console.log(req.body.id);
        
        try {
            const users = await this.AdminService.doBlockUser(req.body.id)
            if(users){
                res.status(200).json({users,status:true})
            }else{
                throw new Error("No users found")
            }
        } catch (error) {
            res.json({status:false})
        }
    }
}