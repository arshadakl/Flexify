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
import { Order } from "../models/Clients";

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

    async createOrder(order:IOrder): Promise<any> {
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

}