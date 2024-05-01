import { IOrder, ISubmissions, ITransaction } from "../interfaces/clientInterface";
// import { ClientDetails } from "../models/Clients";
import { Freelancer } from "../models/Freelancer";
import { ClientRepositoryImpl } from '../repositories/clientsRepository';
import { FreelancerRepository } from "../repositories/freelancerRepository";
import jwt from "jsonwebtoken"
import Stripe from 'stripe';
import { uploadMultipleToCloudinary } from "../utils/Cloudinary";
import fs from 'fs'
import mongoose from "mongoose";
import { IReport } from "../interfaces/chatInterface";


export class ClientService {
    constructor(private readonly clientRepository: ClientRepositoryImpl, private readonly freelancerRepository: FreelancerRepository) { }


    async profileCompletionServ(formData: any): Promise<Freelancer> {
        const response: any = await this.clientRepository.ClientDetailsAdd(formData);

        const clientDs = await this.freelancerRepository.find_ById(response.user)
        console.log(clientDs, "profile completion user");
        if (clientDs) {

            const credentialsResponse = await this.jwtCreation(clientDs);
            return credentialsResponse;
        } else {
            throw new Error("Wrong");
        }
    }

    async jwtCreation(freelancer: Freelancer): Promise<any> {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT secret is not defined in environment variables.");
        }

        const token = jwt.sign({ id: freelancer.id, email: freelancer.email }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        freelancer.token = token;
        freelancer.password = "";
        const options = {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        const credentials = { token, options, freelancer };
        return credentials;
    }


    // async stripCheckOut(id: string, user: string): Promise<any> {
    //     try {
    //         const workDetails = await this.clientRepository.FindWorkById(id);
    //         if (!process.env.STRIPE_KEY) {
    //             throw new Error('STRIPE_KEY is not defined in the environment variables');
    //         }
    //         // const stripe = new Stripe(process.env.STRIPE_KEY);
    //         const stripe = require('stripe')(process.env.STRIPE_KEY)
    //         if (!workDetails) {
    //             throw new Error('Work details not found');
    //         }


    //         const purchaseDetails = [{
    //             price_data: {
    //                 currency: "usd",
    //                 product_data: {
    //                     name: workDetails.title,
    //                     images: [workDetails.image1],
    //                     work: workDetails._id
    //                 },
    //                 unit_amount: workDetails.amount * 100,
    //             },
    //             quantity: 1
    //         }];


    //         const session = await stripe.checkout.sessions.create({
    //             payment_method_types: ["card"],
    //             line_items: purchaseDetails,
    //             mode: "payment",
    //             success_url: "http://localhost:5173/client/success",
    //             cancel_url: "http://localhost:5173/client/fail",
    //         });

    //         console.log(session.id, " sessio9n ID #############################");
    //         //    const response  = await this.TransactionCreation(transactionData)
    //         return session.id
    //     } catch (error: any) {
    //         throw new Error(error.message)
    //     }
    // }

    async stripCheckOut(id: string, user: string): Promise<any> {
        try {
            const workDetails = await this.clientRepository.FindWorkById(id);
            if (!process.env.STRIPE_KEY) {
                throw new Error('STRIPE_KEY is not defined in the environment variables');
            }
            const stripe = require('stripe')(process.env.STRIPE_KEY);
            if (!workDetails) {
                throw new Error('Work details not found');
            }

            const purchaseDetails = [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: workDetails.title,
                        images: [workDetails.image1],
                        // Removed the 'work' field as it's not supported by Stripe
                    },
                    unit_amount: workDetails.amount * 100,
                },
                quantity: 1
            }];

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: purchaseDetails,
                mode: "payment",
                success_url: "http://localhost:5173/client/success",
                cancel_url: "http://localhost:5173/client/fail",
            });

            console.log(session.id, " session ID #############################");
            return session.id;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }


    //Transaction creation 
    async TransactionCreation(session: string, workId: string, user: string): Promise<any> {
        try {
            console.log("called,", session, workId);

            const workDetails = await this.clientRepository.FindWorkById(workId);
            if (!workDetails) throw new Error("workId not found")
            const transactionData = {
                user: user,
                session_id: session,
                work_id: workDetails._id,
                amount: workDetails.amount,
                purpose: "purchase",
                payment_status: "pending"
            }
            const response = await this.clientRepository.createTransaction(transactionData)
            return response
        } catch (error) {

        }
    }
    //Transaction creation 
    async TransactionUpdate(session: string, status: string): Promise<any> {
        try {
            const workDetails = await this.clientRepository.updateTransaction(session, status);
            if (workDetails) {
                return workDetails
            }
        } catch (error) {

        }
    }


    addDaysToDate(date: Date, days: number): number {
        const newDate = new Date(date.getTime());
        newDate.setDate(newDate.getDate() + days);
        return newDate.getTime();
    }

    //order creation 
    async createNewOrder(session: string, payment_intent: string): Promise<IOrder | undefined> {
        try {
            console.log("called,", session);
            const transactionData = await this.clientRepository.FindTransactionBySession(session)
            if (!transactionData) {
                throw new Error("Could not find transaction")
            }
           
            const workDetails = await this.clientRepository.FindWorkById(transactionData?.work_id as string)
            if (!workDetails) throw new Error("Could not find work")
                const deadlineDate =  this.addDaysToDate(new Date(), workDetails.deliveryPeriod || 0)
            const orderDetails: IOrder = {
                workId: transactionData?.work_id,
                // transactionId: transactionData._id
                amount: workDetails?.amount as number,
                category: workDetails?.categoryNames as string[],
                freelancerId: workDetails?.user as string,
                clientId: transactionData.user,
                payment_intent,
                WorkDetails: workDetails,
                date: Date.now(),
                status: "pending",
                requirementStatus:false,
                deadline: deadlineDate,
                approval:"pending",
            }

            const order = await this.clientRepository.createOrder(orderDetails);
            if (order) {
                return order
            }
        } catch (error) {

        }
    }

    //used for get all orders of client 
    // ---------------------------------
    async getAllOrders(user: string,): Promise<any> {
        try {
            const orders = await this.clientRepository.getAllordersOfClient(user);
            if (orders) {
                return orders
            }
        } catch (error) {

        }
    }
    //get orders Single 
    // ---------------------------------
    async getSingleOrderDetails(id: string,): Promise<IOrder | null> {
        try {
            const orders = await this.clientRepository.getSingleOrder(id);
            if (!orders) throw new Error("No order")
            return orders
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    //submit Requirements 
    // ---------------------------------
    async submitRequirements(formData:any,files:any): Promise<Boolean | undefined> {
        try {
            const filePaths: string[] = [];
            if (files['logo'] && files['logo'].length > 0) filePaths.push(files['logo'][0].path);
            if (files['referenceMaterial'] && files['referenceMaterial'].length > 0) filePaths.push(files['referenceMaterial'][0].path);
            const responseFiles = await this.uploadRequirementFile(filePaths,"requirements")
            console.log(responseFiles);
            
            const data = {
                logo : responseFiles.logo ? responseFiles.logo : "",
                referenceMaterial : responseFiles.referenceMaterial ? responseFiles.referenceMaterial : "",
                ...formData
            }
            console.log(data);
            
            const response = await this.clientRepository.addRequirements(data)
            if(response){
                const requirementsStatusReponse = await this.clientRepository.changeRequirementStatus(data.orderId,true)
                return true
            }   
            
        } catch (error:any) {
            throw new Error(error.message)
        }
    }


    
    async uploadRequirementFile(filePaths: string[], folderName: string):Promise<any> {
        try {

            const cloudinaryResponse = await uploadMultipleToCloudinary(filePaths, folderName);
            if(!cloudinaryResponse){
                throw new Error("Cloud file Upload Failed, please try again")
            }
            const logo: string = cloudinaryResponse[0] ? cloudinaryResponse[0].url : '';
            const referenceMaterial: string = cloudinaryResponse[1] ? cloudinaryResponse[1].url : '';
            console.log(logo);
            
            filePaths.forEach((path)=>{
                fs.unlinkSync(path);
            })

            return { logo,referenceMaterial }


        } catch (error) {

        }
    }


    async getLatestTransaction(clientId: string): Promise<ITransaction | undefined>{
        try {
            const latestTransaction = await this.clientRepository.getLatestTransaction(clientId)
            if(latestTransaction){
                return latestTransaction[0]
            }
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    async updateOrderIdTotransaction(sessionId:string,orderId: string): Promise<any>{
        try {
            const response = await this.clientRepository.addOrderIdToTransaction(sessionId,orderId)
            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    async getDeliverdWorkServ(orderId:string): Promise<ISubmissions | null>{
        try {
            console.log(orderId);
            
            const response = await this.clientRepository.getDeliverdWork(orderId)
            console.log(response);
            
            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    
    async getDeliverdWorkFile(submitionId:string): Promise<any | null>{
        try {
            const response = await this.clientRepository.getDeliverdWorkFile(submitionId)
            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }


    async manageWorkApproval(submisionId:string,status:string,orderId:string): Promise<any | null>{
        try {
            const response = await this.clientRepository.changeSubmissionStatus(submisionId,status)
            if(status=="approved"){
                const statusChange = await this.clientRepository.changeOrderStatus(orderId,"submited")
            }
            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

        
    async getfreelancerData(id:string): Promise<any | null>{
        try {
            const response = await this.clientRepository.getFreelancerData(id)
            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

        
    async submitPostReportServ(formData:IReport): Promise<IReport | null>{
        try {
            const isAlreadyRepoted = await this.clientRepository.findReportByIDs(formData.reported_post_id as string ,formData.reporter_id as string)
            if(isAlreadyRepoted) throw new Error("you already Repoted this Post")
            const response = await this.clientRepository.submitPostReport(formData)
            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
        
    //addRating service
    async addRatingServ(workId: string, userId: string, ratingValue: number): Promise<void>{
        try {
            const response = await this.clientRepository.addRating(workId,userId,ratingValue)            
            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

     
}
