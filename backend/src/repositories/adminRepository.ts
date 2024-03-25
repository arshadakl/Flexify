import { promises } from "dns";
import { Freelancer } from "../models/Freelancer";

export interface AdminRepository {
    getAllUsersData():void
    findById(id: string): Promise<Freelancer | null>
    blockUser(id:string,action:any):Promise<any>
}

