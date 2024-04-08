// freelancerRepositoryImpl.ts
import { error } from "console";
import { Freelancer, FreelancerDetails } from "../models/Freelancer";
import { FreelancerRepository } from "./freelancerRepository";
// import {FreelancerModel} from "../models/Freelancer";
const FreelancerModel = require('../models/Freelancer').Freelancer
const FreelancerDetailsModel = require('../models/Freelancer').FreelancerDetails
import bcrypt from "bcrypt"
import { Category, Subcategory } from "../models/Category";
import {WorkModel} from "../models/Works";
import { ICategory, ISubcategory } from "../interfaces/adminInterface";
import { IWork } from "../interfaces/freelancerInterface";

export class FreelancerRepositoryImpl implements FreelancerRepository {
    async findByUsername(username: string): Promise<Freelancer | null> {
        return await FreelancerModel.findOne({ username });
    }

    async findByEmail(email: string): Promise<Freelancer | null> {
        return await FreelancerModel.findOne({ email });
    }

    
    async find_ById(id: string): Promise<Freelancer | undefined> {
        console.log(id, "in implements FreelancerRepository");
        
        const res =  await FreelancerModel.findById(id);
        console.log(res,"imp");
        
        return res
    }
    
    async create(freelancer: Freelancer): Promise<void> {
        await FreelancerModel.create(freelancer);
    }


    async checkPassword(username: string, password: string): Promise<boolean> {
        const freelancer = await FreelancerModel.findOne({ username });
        if (!freelancer) {
            return false; // User not found
        }
        const isPasswordValid = await bcrypt.compare(password, freelancer.password);
        return isPasswordValid;
        // return false; 
    }

   


    async clearOTP(email:string){
        await FreelancerModel.updateOne({email,OTP:-1})
    }

    async FreelancerDetailsAdd(formData:any){
       return await FreelancerDetailsModel.create(formData)
    }



    async FreelancerDetailsupdate(formData: any) {
        try {
            console.log('Updating freelancer details for user:', formData.user);
            console.log('New data:', formData);
    
            const result = await FreelancerDetailsModel.updateOne(
                { user: formData.user },
                {
                    $set: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        Country: formData.Country,
                        language: formData.language,
                        skillsList: formData.skillsList, 
                        bio: formData.bio
                    }
                }
            );
    
            console.log('Update result:', result);
            return result;
        } catch (error) {
            console.error('Error updating freelancer details:', error);
            throw error;
        }
    }

    

    async doVerification(id:String){
        return await FreelancerModel.updateOne({id,isVerified:1})
    }

    async setNewOTP(email:string,otp:number){ 
        return await Freelancer.updateOne({email:email},
            {
                $set:{OTP:otp},
                
            }
            )
        
    }
    async cleanOTP(email:string){
        return await Freelancer.updateOne({email:email},{$set:{OTP:0}})
    }

    // async updatePassword(id:string, password:string):Promise<any>{
    //     return await Freelancer.updateOne({_id:id},{$set:{password:password}})
    // }

    async updatePassword(id: string, password: string): Promise<any> {
        return await Freelancer.updateOne(
          { _id: id },
          {
            $set: { password: password },
            $currentDate: { updatedAt: true }, // Update the updatedAt field with the current timestamp
          }
        );
      }


    async findDetailsById(id: string): Promise<FreelancerDetails | null> {
        console.log("implement id",id);
        return await FreelancerDetailsModel.findOne({user:id});
    }

    async updateProfileImage(id:string,filepath:string):Promise<Freelancer | null> {
         const response = await Freelancer.updateOne({id,profile:filepath})
         if(response){
            console.log(id);
            const data = await Freelancer.findById(id);
            if(data){
                console.log(data,"updated profile image data");
                return data
            }else{
                throw new Error("data not found");
            }
         }else{
            throw new Error("Failed to update profile image")
         }

    }


    async getAllCategories():Promise<ICategory[] | undefined>{
        return await Category.find({})
    }

    async getAllSubCategories():Promise<ISubcategory[] | undefined>{
        return await Subcategory.find({})
    }

    async findCategoriesById(id:string):Promise<ICategory | null>{
        return await Category.findOne({_id:id})
    }

    async findSubCategoriesById(id:string):Promise<ISubcategory | null>{
        return await Subcategory.findOne({_id:id})
    }

    async createWorkPost(workData:IWork):Promise<any>{
        return await WorkModel.create(workData)
    }

    async getAllWorkOfUser(id:string):Promise<any>{
        return await WorkModel.find({user:id})
    }

    
}
