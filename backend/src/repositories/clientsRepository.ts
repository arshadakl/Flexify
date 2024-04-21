// import { ClientDetails } from "../models/Clients";
import { ClientRepository } from "./clientsRepositoryImpl";
const ClientDetailsModel = require('../models/Clients').ClientDetails
import { Category, Subcategory } from "../models/Category";
import { WorkModel } from "../models/Works";
import { DeleteResult, ICategory, ISubcategory } from "../interfaces/adminInterface";
import { IWork, MyError, SingleWorkDetails } from "../interfaces/freelancerInterface";
import { TransactionModel } from "../models/Transaction";
import { IOrder, ITransaction } from "../interfaces/clientInterface";
import { UpdateWriteOpResult } from "mongoose";
import { Order, Requirement } from "../models/Clients";

export class ClientRepositoryImpl implements ClientRepository {


    async ClientDetailsAdd(formData: any) {
        return await ClientDetailsModel.create(formData)
    }

    async FindWorkById(id: string): Promise<IWork | null> {
        try {
            return await WorkModel.findOne({ _id: id })
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async createTransaction(data:ITransaction): Promise<any> {
        try {
            return await TransactionModel.create(data)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async FindTransactionBySession(id:string): Promise<ITransaction | null> {
        try {
            return await TransactionModel.findOne({session_id:id})
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async updateTransaction(session:string,status:string): Promise<UpdateWriteOpResult> {
        try {
            return await TransactionModel.updateOne({session_id:session},
                {
                    $set:{payment_status:status}
                }
            )
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async createOrder(order:IOrder): Promise<IOrder> {
        try {
            return await Order.create(order)
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getAllordersOfClient(client:string): Promise<IOrder[] | null> {
        try {
            return await Order.find({clientId:client})
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async getSingleOrder(id:string): Promise<IOrder | null> {
        try {
            return await Order.findOne({_id:id})
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
    async addOrderIdToTransaction(sessionId:string,orderId:string):Promise<UpdateWriteOpResult> {
        try {
            return await TransactionModel.updateOne({session_id:sessionId},{$addToSet:{orderId:orderId}})
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async addRequirements(data:any):Promise<any> {
        try {
            const response = await Requirement.create(data)
            return response
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async changeRequirementStatus(orderId:string,status:Boolean):Promise<any>{
        try {
            console.log(orderId,status," this is the arguments");
            
            const response = await Order.updateOne({_id:orderId}, {
                $set:{requirementStatus:status}
            })
            console.log(response);
            
            return response
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    async getLatestTransaction(clientId:string):Promise<ITransaction[] | null>{
        try {
            const latestTransaction = await TransactionModel.find({user:clientId}).sort({date: -1}).limit(1)
            if(!latestTransaction) throw new Error("Couldn't find latest transaction")
            return latestTransaction
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

}