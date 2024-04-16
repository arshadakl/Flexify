import { IOrder, ITransaction } from "../interfaces/clientInterface";
// import { ClientDetails } from "../models/Clients";
import { Freelancer } from "../models/Freelancer";
import { ClientRepositoryImpl } from '../repositories/clientsRepository';
import { FreelancerRepository } from "../repositories/freelancerRepository";
import jwt from "jsonwebtoken"
import Stripe from 'stripe';

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
    async TransactionCreation(session: string, workId: string,user:string): Promise<any> {
        try {
            console.log("called,", session, workId);
            
            const workDetails = await this.clientRepository.FindWorkById(workId);
            if (!workDetails) throw new Error("workId not found")
            const transactionData = {
                user:user,
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
    async TransactionUpdate(session: string,status:string): Promise<any> {
        try {
            console.log("called,", session);
            
            const workDetails = await this.clientRepository.updateTransaction(session,status);
            if(workDetails){
                return workDetails
            }
        } catch (error) {

        }
    }

    //order creation 
    async createNewOrder(session: string,payment_intent:string): Promise<any> {
        try {
            console.log("called,", session);
            const transactionData =  await this.clientRepository.FindTransactionBySession(session)
            if(!transactionData){
                throw new Error("Could not find transaction")
            }
            const workDetails = await this.clientRepository.FindWorkById(transactionData?.work_id as string)
            if(!workDetails) throw new Error("Could not find work")
            const orderDetails:IOrder ={
                workId: transactionData?.work_id,
                // transactionId: transactionData._id
                amount:workDetails?.amount as number,
                category: workDetails?.categoryNames as string[],
                freelancerId:workDetails?.user as string,
                clientId: transactionData.user,
                payment_intent,
                WorkDetails:workDetails,
                date:Date.now(),
                status: "pending"
            }
            
            const order = await this.clientRepository.createOrder(orderDetails);
            if(order){
                return workDetails
            }
        } catch (error) {

        }
    }

       //used for get all orders of client 
      // ---------------------------------
       async getAllOrders(user: string,): Promise<any> {
        try {
            const orders = await this.clientRepository.getAllordersOfClient(user);
            if(orders){
                return orders
            }
        } catch (error) {

        }
    }
}
