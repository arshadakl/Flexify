
import { AdminRepository } from "./adminRepository";
const AdminModel = require('../models/Admin').Admin
const FreelancerModel = require('../models/Freelancer').Freelancer
import { Freelancer, FreelancerDetails } from "../models/Freelancer";


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
}
   